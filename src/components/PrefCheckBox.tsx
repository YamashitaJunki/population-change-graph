import { Dispatch, SetStateAction } from "react";
import styles from "../styles/Home.module.css";

type PrefCheckBoxIn = {
  prefNameList: Array<string>;
  prefList: never[];
  selectedPref: Dispatch<SetStateAction<never[]>>;
};
type PrefCheckBoxOut = JSX.Element;

export const PrefCheckBox = ({
  prefNameList,
  prefList,
  selectedPref,
}: PrefCheckBoxIn): PrefCheckBoxOut => {
  return (
    <div>
      {prefNameList.map((pref) => {
        const selectedPrefList = [...prefList, pref] as SetStateAction<never[]>;
        return (
          <label className={styles.box} key={pref}>
            <input
              type="checkbox"
              onClick={() => selectedPref(selectedPrefList)}
            />
            {pref}
          </label>
        );
      })}
    </div>
  );
};
