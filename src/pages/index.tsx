import { GetServerSideProps } from "next";
import styles from "../styles/Home.module.css";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale, ChartData, ScatterDataPoint } from "chart.js";
import { HomeController, Datasets } from "../lib/HomeController";
import { PrefCheckBox } from "../components/PrefCheckBox";
import { useState } from "react";
import Head from "next/head";

Chart.register(CategoryScale);

type GetServerSidePropsOut = {
  props: {
    list: Datasets;
  };
};
type PopulationChangeGraphHomeIn = {
  list: Datasets;
};
type Label = Array<{
  label: string;
}>;

type PopulationChangeGraphHomeOut = JSX.Element;
type filterToOddNumberOfClicksListIn = never[];
type filterToOddNumberOfClicksListOut = Array<string>;
type ClickedPrefList = {
  [key: string]: number;
};
type filterDatasetsFirstIn = Label;
type filterDatasetsSecondIn = Array<string>;
type filterDatasetsOut = Label;

const PopulationChangeGraph = ({
  list,
}: PopulationChangeGraphHomeIn): PopulationChangeGraphHomeOut => {
  const [prefList, selectedPref] = useState([]);
  const filteredSelectedPrefList = _filterToOddNumberOfClicksList(prefList);
  const filteredDatasets = _filterDatasets(
    list.unfilteredDatasets,
    filteredSelectedPrefList
  );
  const data = {
    labels: [
      1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015,
      2020, 2025, 2030, 2035, 2040, 2045,
    ],
    datasets: filteredDatasets,
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>都道府県別 総人口推移グラフ</title>
      </Head>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <div>都道府県別</div>
          <div>総人口推移グラフ</div>
        </h1>
      </header>
      <main className={styles.main}>
        <h1>都道府県</h1>
        <PrefCheckBox
          prefNameList={list.prefNameList}
          prefList={prefList}
          selectedPref={selectedPref}
        ></PrefCheckBox>
        <h1>人口推移</h1>
        <div className={styles.graph}>
          <Line
            data={
              data as ChartData<
                "line",
                (number | ScatterDataPoint | null)[],
                number
              >
            }
            options={list.options}
          />
        </div>
      </main>
    </div>
  );
};

export default PopulationChangeGraph;

export const getServerSideProps: GetServerSideProps =
  async (): Promise<GetServerSidePropsOut> => {
    const list = await HomeController.execute();
    return {
      props: {
        list: list,
      },
    };
  };

/**
 * 奇数回クリックされた都道府県のみのリストに作り替える
 */
const _filterToOddNumberOfClicksList = (
  prefList: filterToOddNumberOfClicksListIn
): filterToOddNumberOfClicksListOut => {
  const clickedPrefList: ClickedPrefList = {};
  prefList.forEach((pref) => {
    clickedPrefList[pref] = (clickedPrefList[pref] || 0) + 1;
  });
  const OddNumberOfClickedLists = Object.entries(clickedPrefList).filter(
    (pref) => {
      return Number(pref[1]) % 2 !== 0;
    }
  );
  const filteredPreList = OddNumberOfClickedLists.map((pref) => {
    return pref[0];
  });
  return filteredPreList;
};

/**
 * チェックボックスで選択されている都道府県分のみのdatasetsに作り替える
 */
const _filterDatasets = (
  unfilteredDatasets: filterDatasetsFirstIn,
  filteredSelectedPrefList: filterDatasetsSecondIn
): filterDatasetsOut => {
  const filteredDatasets = unfilteredDatasets.filter((pref) => {
    const filterData = filteredSelectedPrefList.some((selectedPref) => {
      return pref.label === selectedPref;
    });
    return filterData;
  });
  return filteredDatasets;
};
