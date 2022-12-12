import styles from "../styles/PrefListSP.module.css";
import CheckboxStyle from "../styles/PrefList.module.scss";
import { PrefCheckBox } from "./PrefCheckBox";
import { Dispatch, SetStateAction } from "react";

type PrefListSPIn = {
  prefNameList: Array<string>;
  prefList: never[];
  selectedPref: Dispatch<SetStateAction<never[]>>;
};
type PrefListSPOut = JSX.Element;

export const PrefListSP = ({
  prefNameList,
  prefList,
  selectedPref,
}: PrefListSPIn): PrefListSPOut => {
  return (
    <div className={`${styles.check} ${CheckboxStyle.mobile}`}>
      <input className={styles["pref-check"]} type="checkbox"></input>
      <h1 className={styles["pref-button"]}>▷都道府県リスト</h1>
      <div className={styles.pref}>
        <PrefCheckBox
          prefNameList={prefNameList}
          prefList={prefList}
          selectedPref={selectedPref}
        ></PrefCheckBox>
      </div>
    </div>
  );
};

export default PrefListSP;
