import React, { useState, useEffect } from 'react';
import classNames from "classnames";
import dummyData from '../DummyData/dummyData.json';

const koreanUnicode = [
    '\u1100', // ㄱ
    '\u1102', // ㄴ
    '\u1103', // ㄷ
    '\u1105', // ㄹ
    '\u1106', // ㅁ
    '\u1107', // ㅂ
    '\u1109', // ㅅ
    '\u110B', // ㅇ
    '\u110C', // ㅈ
    '\u110E', // ㅊ
    '\u110F', // ㅋ
    '\u1110', // ㅌ
    '\u1111', // ㅍ
    '\u1112', // ㅎ
];

const koreanUniCodeList = {
    '\u1100': [0xAC00, 0xB098],  // '가' ~ '낗'
    '\u1102': [0xB098, 0xB2E4],  // '나' ~ '닣'
    '\u1103': [0xB2E4, 0xB77C],  // '다' ~ '띻'
    '\u1105': [0xB77C, 0xBAA8],  // '라' ~ '맇'
    '\u1106': [0xBAA8, 0xBCF4],  // '마' ~ '밓'
    '\u1107': [0xBCF4, 0xC0AC],  // '바' ~ '빟'
    '\u1109': [0xC0AC, 0xC544],  // '사' ~ '싷'
    '\u110B': [0xC544, 0xC790],  // '아' ~ '잏'
    '\u110C': [0xC790, 0xCC28],  // '자' ~ '짛'
    '\u110E': [0xCC28, 0xCE74],  // '차' ~ '칳'
    '\u110F': [0xCE74, 0xD0C0],  // '카' ~ '킿'
    '\u1110': [0xD0C0, 0xD30C],  // '타' ~ '팋'
    '\u1111': [0xD30C, 0xD558],  // '파' ~ '핗'
    '\u1112': [0xD558, 0xD7A4],  // '하' ~ '힣'
};

const alphabetList = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));

const SelectCharacterFilter = ({currentTab}) => {
    const [selectedCharacter, setSelectedCharacter] = useState(() => {
        return currentTab === 1 ? 'a' : '\u1100';
    });
    const [checkedList, setCheckedList] = useState([]);
    const [filterItems, setFilterItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const data = currentTab === 0 ? dummyData.KoreanBrandList : dummyData.ApbBrandList;
        const filtered = data.filter(item => {
            if (currentTab === 0) {
                const firstChar = item.name.charCodeAt(0);
                const [start, end] = koreanUniCodeList[selectedCharacter] || [];
                return firstChar >= start && firstChar < end;
            }
            if (currentTab === 1) {
                const firstChar = item.name.charAt(0).toUpperCase();
                return firstChar === selectedCharacter.toUpperCase();
            }
            return false;
        });
        setFilterItems(filtered);
    }, [selectedCharacter, currentTab]);

    useEffect(() => {
        const selected = checkedList.map((number) => {
            return dummyData.KoreanBrandList.find(item => item.number === number) || dummyData.ApbBrandList.find(item => item.number === number);
        });
        // console.log(selected,"???");
        setSelectedItems(selected);
    }, [checkedList]);

    const handleCheckChange = (item) => {
        const newCheckedList = checkedList.includes(item.number)
            ? checkedList.filter((checkedItem) => checkedItem !== item.number)
            : [...checkedList, item.number];
        setCheckedList(newCheckedList);
    };

    const handleClick = (char) => {
        setSelectedCharacter(char);
        // console.log(char)
    };

    return (
        <>
            <div className="box__characters-wrap">
                <ul className="list__characters">
                    {(currentTab === 1 ? alphabetList : koreanUnicode).map((item, idx) => (
                        <li className="list-item" key={idx}>
                            <button
                                onClick={() => handleClick(item)}
                                className={classNames('button__character', { 'button__character--active': item === selectedCharacter })}
                            >
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="box__brand-info">
                {filterItems.length > 0 ? (
                    <ul className="list__brand">
                        {filterItems.map((item) => (
                            <li className="list-item" key={item.number}>
                                <input
                                    type="checkbox"
                                    id={`checkbox-${item.number}`}
                                    className="form__checkbox"
                                    checked={checkedList.includes(item.number)}
                                    onChange={() => handleCheckChange(item)}
                                    aria-checked={checkedList.includes(item.number)}
                                />
                                <label htmlFor={`checkbox-${item.number}`} className="form__label">
                                    {item.name}
                                </label>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="box__brand-notice">
                        <p className="text">브랜드가 없습니다.</p>
                        <span>다른 브랜드를 선택해주세요.</span>
                    </div>
                )}
            </div>
            <div className="box__filtered-wrap">
                {selectedItems.length > 0 && (
                    <div className="box__selected-brand">
                        <ul className="list__selected-brands">
                            {selectedItems.map((item, idx) => (
                                <li className="list-item" key={item?.number || idx}>
                                    <span className="text__brand">{item?.name}</span>
                                    <button
                                        type="button"
                                        className="button__cancel"
                                        onClick={() => setCheckedList(checkedList.filter((id) => id !== item.number))}
                                    >
                                        {/* {checkedList.length > 0 && console.log(checkedList, "checkedList")} */}
                                        <span className="for-a11y">삭제</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="box__reset">
                            <button
                                type="button"
                                className="button__reset"
                                onClick={() => setCheckedList([])}
                            >
                                <span className="for-a11y">선택 초기화</span>
                            </button>
                        </div>
                    </div>
                )}
                <div className="box__filtered-footer">
                    <button type="button" className="button button__cancel">
                        취소
                    </button>
                    <button type="button" className="button button__confirm">
                        적용
                    </button>
                </div>
            </div>
        </>
    );
};

export default SelectCharacterFilter;
