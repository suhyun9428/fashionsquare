import React, { useState } from "react";
import ItemCard from "./ItemCard";
import dummyData from '../DummyData/dummyData.json';

const CategoryTab = ({ data }) => {
    return (
        <>
            <div className="box__category-wrap">
                <button type="button" className="button__category">카테고리</button>
                <ul className="list__category">
                    {data.map((item, idx) => (
                        <li key={idx} className="list-item">
                            {/* link__category--active */}
                            <a href="#" className="link__category">
                                <div className="box__category-image">
                                    <img src={item.imgUrl} alt={item.title} className="image"/>
                                </div>
                                <p className="text__title">{item.title}</p>
                                <p className="text__price">
                                    {item.price}
                                </p>
                                
                                {/* {item.delivery.freeDelivery ? (
                                    <p className="text__delivery">무료배송</p>
                                ):(<p className="text__delivery">{item.delivery.payDelivery}</p>)} */}
                                

                            </a>
                            {/* {item.subCategory && <SubCategoryList>} */}
                        </li>
                        )
                    )}
                </ul>
            </div>
            <ItemCard data={dummyData.Items} />
        </>
    )

};

export default CategoryTab;