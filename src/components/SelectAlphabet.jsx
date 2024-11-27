import React, { useState } from "react";
import classNames from "classnames";

const SelectedAlphabetBrandList =({ selectedItem }) => {
    const brandList = ['ck', 'apple', 'belkin', 'gap', 'guess', 'nike', 'nepa', 'daks', 'northface', 'elephants', 'fire', 'queen', 'animal'];
    const [isChecked, setIsChecked] = useState(false);
    const [checkedList, setCheckedList] = useState([]);
    const checkedItemHandler = (val, isChecked) => {
        if(isChecked){
            setCheckedList((prev) => [...prev, val]);
            return;
        }
        if(!isChecked && checkedList.includes(val)){
            setCheckedList(checkedList.filter((item) => item !== val));
            return;
        }
        return;
    };
    const checkHandler = (e, item) => {
        setIsChecked(!isChecked);
        checkedItemHandler(item, e.target.checked);
        checkedList.includes(item);
    };
    const handelSelectedBrand = (idx, item) => {
        console.log(idx, item, "splice!");
    };
    function filteringAlphabet(brandList, selectedItem) {
        return brandList.filter(item => item[0].toLowerCase() === selectedItem[0].toLowerCase());
    }
    const filteredArray = filteringAlphabet(brandList, selectedItem);
    return (
        <>
            <div className="box__brand-info">
                <ul className="list__brand">
                    {filteredArray.map((item, idx) => (
                        <li className="list-item" key={idx}>
                            <input type="checkbox" id={`checkbox-${idx}`} className="form__checkbox" onChange={(e)=>checkHandler(e, item)}/>
                            <label htmlFor={`checkbox-${idx}`} className="form__label">{item}</label>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="box__filtered-wrap">
                {
                    checkedList.length>0 &&(
                        <div className="box__selected-brand">
                            <ul className='list__selected-brands'>
                                {checkedList.map((item, idx) => {
                                    return(
                                        <li className='list-item' key={idx}>
                                            <span className="text__brand">{item}</span>
                                            <button type="button" className='button__cancel' onClick={(e)=> handelSelectedBrand(idx, item)}><span className="for-a11y">삭제</span></button>
                                        </li>
                                    )
                                })}
                            </ul>
                            <div className="box__reset">
                                <button type='button' className='button__reset' onClick={(e)=>setCheckedList('')}><span className="for-a11y">선택 초기화</span></button>
                            </div>
                        </div>
                    )
                }
                <div className='box__filtered-footer'>
                    <button type="button" className='button button__cancel'>취소</button>
                    <button type="button" className='button button__confirm'>적용</button>
                </div>
            </div>
        </>
    )
}

const SelectAlphabet = () => {
    const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
    const [isActive, setActive] = useState(0);
    const [selectedItem, setSelectedItem] = useState('a');
    const handleActive = (idx, item) => {
        setActive(idx);
        setSelectedItem(item);
    };
    return (
        <>
            <div className="box__characters-wrap">
                <ul className="list__characters">
                {alphabet.map((item, idx) => (
                    <li className="list-item">
                        <button key={idx} type="button"
                        className={classNames('button__character', idx === isActive? ' button__character--active':'')}
                        onClick={() => handleActive(idx, item)}>{item}</button>
                    </li>
                ))}
                </ul>
            </div>
            <SelectedAlphabetBrandList selectedItem={selectedItem}/>
        </>
    );
};

export default SelectAlphabet;