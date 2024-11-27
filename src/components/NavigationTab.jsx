import React, { useState } from "react";
import classNames from "classnames";
import BrandContainer from './BrandContainer';
import CategoryTab from './Category';
import dummyData from '../DummyData/dummyData.json';

function NavigationTab(data) {
    const [currentTab, activeTab] = useState(0);
    const menuArr = [
        {name:'브랜드', content:'box__brand'},
        {name:'카테고리', content:'box__category'},
    ];

    const contentList = [
        {idx :'0', content:<BrandContainer dummyData={dummyData.BrandContainer}/>},
        {idx :'1', content:<CategoryTab data={dummyData.Category}/>},
    ];
    const selectedTab = (idx) =>{
        activeTab(idx);
    };
    return (
        <>
            <div className="box__navigation">
                {menuArr.map((el, idx)=>(
                    <button type="button" key={idx} className={classNames("button__navi", idx === currentTab ? 'button__navi--active':'')}
                    onClick={()=> {selectedTab(idx)}}>{el.name}</button>
                ))}
            </div>
            {contentList[currentTab].content}
        </>
    );

}
export default NavigationTab;