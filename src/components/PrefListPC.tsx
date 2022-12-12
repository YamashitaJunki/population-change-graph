import styles from "../styles/PrefListPC.module.css";
import CheckboxStyle from "../styles/PrefList.module.scss";
import { PrefCheckBox } from "./PrefCheckBox";
import { Dispatch, SetStateAction } from "react";

type PrefListPCIn = {
  prefNameList: Array<string>;
  prefList: never[];
  selectedPref: Dispatch<SetStateAction<never[]>>;
};
type PrefListPCOut = JSX.Element;

export const PrefListPC = ({
  prefNameList,
  prefList,
  selectedPref,
}: PrefListPCIn): PrefListPCOut => {
  return (
    <div className={`${styles.ckeck} ${CheckboxStyle.pc}`}>
      <h1 className={styles["pref-button"]}>都道府県</h1>
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

export default PrefListPC;
