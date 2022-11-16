import { AppException } from "./AppException";

type YearAndValueList = Array<{
  year: number;
  value: number;
}>;

type PrefNameAndPrefCodeList = Array<{
  prefCode: number;
  prefName: string;
}>;

type GetPrefListAndValueChangeListOut = {
  prefList: PrefNameAndPrefCodeList;
  valueChangeList: Array<YearAndValueList>;
};
type PopulationChangeListJson = {
  result: {
    data: Array<{
      data: YearAndValueList;
    }>;
  };
};

type PrefListJson = {
  result: PrefNameAndPrefCodeList;
};

/**
 * 都道府県名とコード番号が入ったリスト、全都道府県ごとの人口推移リストを取得
 */
export const getPrefListAndValueChangeList =
  async (): Promise<GetPrefListAndValueChangeListOut> => {
    const TOKEN = process.env.RESAS_API_KEY;
    if (!TOKEN) {
      throw new AppException("TOKEN", "環境変数が入っていません");
    }
    const options = {
      method: "GET",
      headers: {
        "X-API-KEY": TOKEN,
      },
    };
    //都道府県名とコード番号が入ったリストを取得
    const prefListURL =
      "https://opendata.resas-portal.go.jp/api/v1/prefectures";
    const prefListRes = await fetch(prefListURL, options);
    if (!prefListRes) {
      throw new AppException(prefListRes, "fetchの結果が空です");
    }
    if (prefListRes.status !== 200) {
      throw new AppException(prefListRes.status, "fetchに失敗しました");
    }
    const prefListJson = (await prefListRes.json()) as PrefListJson;
    const prefList = prefListJson.result;
    if (!prefList) {
      throw new AppException(
        JSON.stringify(prefListJson),
        "都道府県名の一覧は必須です。"
      );
    }
    if (!Array.isArray(prefList)) {
      throw new AppException(
        JSON.stringify(prefList),
        "配列が入っていません。"
      );
    }
    if (prefList.length < 0) {
      throw new AppException(
        Number(prefList.length),
        "配列は1つ以上要素を入れてください。"
      );
    }
    //全都道府県ごとの人口推移リストを取得
    const valueChangeList = await Promise.all(
      prefList.map(async (prefecture) => {
        const valueChangeListURL = `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefecture.prefCode}`;
        const valueChangeListRes = await fetch(valueChangeListURL, options);
        if (!valueChangeListRes) {
          throw new AppException(valueChangeListRes, "fetchの結果が空です");
        }
        if (valueChangeListRes.status !== 200) {
          throw new AppException(
            valueChangeListRes.status,
            "fetchに失敗しました"
          );
        }
        const valueChangeListJson =
          (await valueChangeListRes.json()) as PopulationChangeListJson;
        const list = valueChangeListJson.result?.data[0]?.data;
        if (!list) {
          throw new AppException(
            JSON.stringify(valueChangeListJson),
            "人口推移一覧は必須です。"
          );
        }
        if (!Array.isArray(list)) {
          throw new AppException(
            JSON.stringify(list),
            "配列が入っていません。"
          );
        }
        if (list.length < 0) {
          throw new AppException(
            Number(list.length),
            "配列は1つ以上要素を入れてください。"
          );
        }
        return list;
      })
    );

    return {
      prefList: prefList,
      valueChangeList: valueChangeList,
    };
  };
