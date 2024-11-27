import React, { useState } from 'react';
import classNames from "classnames";

// 한글 초성 유니코드
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

// 초성별 유니코드 범위
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

const SelectKorean = ({ data }) => {
    const [isActive, setActive] = useState(0);
    const [selectedKorean, setSelectedKorean] = useState('\u1100');
    // 체크박스들 상태 관리
    const [checkedList, setCheckedList] = useState([]);

    // 초성 선택 후 필터링
    const filterKoreanItem = selectedKorean ? data.filter(item => {
        if (typeof item.name === 'string') {
            const firstWord = item.name.charCodeAt(0);
            const [start, end] = koreanUniCodeList[selectedKorean] || [];
            return firstWord >= start && firstWord < end;
        }
        return false;
    }) : data;

    // 체크박스 상태 변경 함수
    const handleCheckChange = (item) => {
        // {name: '까나리아', number: 0} 0
        const newCheckedList = checkedList.includes(item.number)
            ? checkedList.filter((checkedItem) => checkedItem !== item.number) 
            : [...checkedList, item.number];
        setCheckedList(newCheckedList);
    };

    // 초성 버튼 클릭 처리
    const handleClick = (idx, item) => {
        setActive(idx);
        setSelectedKorean(item);
        // console.log(item, "?")
    };

    return (
        <>
            <div className="box__characters-wrap">
                <ul className="list__characters">
                    {koreanUnicode.map((item, idx) => (
                        <li className="list-item" key={idx}>
                            <button
                                onClick={() => handleClick(idx, item)}
                                className={classNames(
                                    'button__character',
                                    idx === isActive ? ' button__character--active' : ''
                                )}
                            >
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="box__brand-info">
                {filterKoreanItem.length > 0 ? (
                    <ul className="list__brand">
                        {filterKoreanItem.map((item, idx) => (
                            <li className="list-item" key={item.number}>
                                <input
                                    type="checkbox"
                                    id={`checkbox-${item.number}`}
                                    className="form__checkbox"
                                    checked={checkedList.includes(item.number)}
                                    aria-checked={checkedList.includes(item.number)}
                                    onChange={() => handleCheckChange(item)}
                                />
                                <label htmlFor={`checkbox-${item.number}`} className="form__label">
                                    {item.name}
                                </label>
                            </li>
                        ))}
                    </ul>
                ):(
                    <div className="box__brand-notice">
                        <p className="text">브랜드가 없습니다.</p>
                        <span>다른 브랜드를 선택해주세요.</span>
                    </div>
                )}
            </div>
            <div className="box__filtered-wrap">
                {checkedList.length > 0 && (
                    <div className="box__selected-brand">
                        <ul className="list__selected-brands">
                            {checkedList.map((number, idx) => {
                                // 각자 고유한 number 값으로 체크 여부 확인
                                const selectedItem = data.find(item => item.number === number);
                                return (
                                    <li className="list-item" key={number}>
                                        <span className="text__brand">{selectedItem?.name}</span>
                                        <button
                                            type="button"
                                            className="button__cancel"
                                            onClick={() => setCheckedList(checkedList.filter((id) => id !== number))}
                                        >
                                            <span className="for-a11y">삭제</span>
                                        </button>
                                    </li>
                                );
                            })}
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

export default SelectKorean;
