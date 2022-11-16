import { getPrefListAndValueChangeList } from "./getPrefListAndValueChangeList";
import { colorChartList } from "../lib/colorChartList";
import { AppException } from "../lib/AppException";

export type Datasets = {
  prefNameList: Array<string>;
  unfilteredDatasets: Array<{
    label: string;
    data: Array<number>;
    borderColor: string;
  }>;
};

export type ExecuteOut = Datasets;

export class HomeController {
  static async execute(): Promise<ExecuteOut> {
    const prefAndValueChangeList = await getPrefListAndValueChangeList();
    //都道府県名だけのリストを作る
    const prefNameList = prefAndValueChangeList.prefList.map((pref) => {
      return pref.prefName;
    });
    //[{"prefData":{"prefCode":○,"prefName":"○○県"},"valueData":[{"year":○○,"value":○○},,,]},,,]という形の配列に作り替える
    const joinedPrefAndPopulationChangeList =
      prefAndValueChangeList.prefList.map((pref, index) => {
        const prefData = pref;
        const valueData = prefAndValueChangeList.valueChangeList[index];
        return { prefData: prefData, valueData: valueData };
      });
    if (joinedPrefAndPopulationChangeList.length !== 47) {
      throw new AppException(
        joinedPrefAndPopulationChangeList.length,
        "47都道府県分の配列が必要です。"
      );
    }

    //[{"prefName":"○○県","valueList":[○○,○○,,,]},,,]という形の配列に作り替える
    const prefNameAndPopulationChangeList =
      joinedPrefAndPopulationChangeList.map((pref) => {
        const prefName = pref.prefData.prefName;
        const valueList = pref.valueData.map((yearly) => {
          const value = yearly.value;
          return value;
        });
        const result = { prefName, valueList };
        return result;
      });
    //chart.jsで使うdatasetの形に整形
    //[{"label":"○○県","data":[○○,○○,○○,,,],"borderColor":"#○○"},,,]
    const unfilteredDatasets = prefNameAndPopulationChangeList.map(
      (prefecture, index) => {
        const color = colorChartList();
        const data = {
          label: prefecture.prefName,
          data: prefecture.valueList,
          borderColor: color[index],
        };
        return data;
      }
    );
    return {
      prefNameList: prefNameList,
      unfilteredDatasets: unfilteredDatasets,
    };
  }
}
