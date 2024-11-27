import React,{ useState } from "react";
import classNames from "classnames";
import SelectAlphabet from "./SelectAlphabet";
import SelectKorean from "./SelectKorean";
import dummyData from '../DummyData/dummyData.json';
import SelectedCharacter from './SelectedCharacter';

const SelectLanguage = () => {
    const [currentTab, activeTab] = useState(0);
    const languageArr = [
        {idx:'0', name:'가나다'},
        {idx:'1', name:'ABC'},
    ];
    const selectedTab = (idx) =>{
        activeTab(idx);
    };

    return (
        <>
            <div className="box__select-language">
                {languageArr.map((el, idx)=>(
                    <button type="button" key={idx} className={classNames("button__select-language", idx === currentTab ? 'button__select--active':'')}
                    onClick={()=> {selectedTab(idx)}}>{el.name}</button>
                ))}
            </div>
            <SelectedCharacter currentTab={currentTab} />
        </>
    );
}
export default SelectLanguage;