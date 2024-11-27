import React, { useState } from "react";

const ItemCard = ({ data }) => {
    const {title, brand, price, delivery, rates, bought, lmo} = data || null;
    return (
        <>
            <div className="box__items-wrap">
                <ul className="list__items">
                    {data.map((item, idx) => (
                        <li key={idx} className="list-item">
                            <a href="#" className="link__category">
                                <div className="box__category-image">
                                    <img src={item.imgUrl} alt={item.title} className="image"/>
                                </div>
                                <div className="box__item-description">
                                    {item.brand && <>
                                    <span className="text__fashionsquare">
                                        <img src="//script.gmarket.co.kr/build/mobile/image/single/fashionsquare/component/itemcard/logo_fashionsquare_3x.png" alt="패션스퀘어" className="image__tag"/>
                                    </span>
                                    <span className="text__brand">{item.brand}</span></>}
                                    <p className="text__title">{item.title}</p>
                                </div> 
                            </a>
                        </li>
                        )
                    )}
                </ul>
            </div>
        </>
    )

};

export default ItemCard;