// import './style.css';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getProductBySlug } from '../../../actions';
// import { generatePublicUrl } from '../../../urlConfig';
// import { Link } from 'react-router-dom'
// import Card from '../../../components/UI/Card';


// const ProductStore = (props) => {
//     const [priceRange, setPriceRange] = useState({
//         under5k: 5000,
//         under10k: 10000,
//         under15k: 15000,
//         under20k: 20000,
//         under30k: 30000,
//     });
//     const product = useSelector(state => state.product);
//     const dispatch = useDispatch();
//     console.log(props);

//     useEffect(() => {
//         const { match } = props;
//         dispatch(getProductBySlug(match.params.slug));
//     }, []);

//     return (
//         <>
//             {
//                 Object.keys(product.productsByPrice).map((key, index) => {
//                     return (
//                         <Card
//                             headerLeft={`${props.match.params.slug} mobile under ${priceRange[key]}`}
//                             headerRight={<button>view all</button>}
//                             style={{
//                                 width: 'calc(100% - 40px)',
//                                 margin: '20px'
//                             }} >
//                             <div style={{ display: 'flex' }}>
//                                 {
//                                     product.productsByPrice[key].map(product =>
//                                         <Link
//                                             to={`/${product.slug}/${product._id}/p`}
//                                             style={{ display: "block" }}
//                                             className="productContainer">
//                                             <div className="productImgContainer">
//                                                 {/* <img src={product.productPictures[0].img} alt="" /> */}
//                                                 <img src={generatePublicUrl(product.productPictures[0].img)} alt="" />
//                                             </div>
//                                             <div className="productInfo">
//                                                 <div style={{ margin: '10px 0' }}>{product.name}</div>
//                                                 <div>
//                                                     <span>4.3</span>
//                                             &nbsp;&nbsp;
//                                             <span>3334</span>
//                                                 </div>
//                                                 <div className="productPrice">{product.price}</div>
//                                             </div>
//                                         </Link>)
//                                 }

//                             </div>
//                         </Card>
//                     )
//                 })
//             }
//         </>
//     );
// };

// export default ProductStore;


import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductBySlug } from '../../../actions';
import { generatePublicUrl } from '../../../urlConfig';
import { Link } from 'react-router-dom';
import Card from '../../../components/UI/Card';
import { MaterialButton } from "../../../components/MaterialUI";
import Rating from "../../../components/UI/Rating";
import Price from "../../../components/UI/Price";

const ProductStore = (props) => {

    const product = useSelector(state => state.product);
    // const [priceRange, setPriceRange] = useState({
    //     under5k: 5000,
    //     under10k: 10000,
    //     under15k: 15000,
    //     under20k: 20000,
    //     under30: 30000
    // });
    const priceRange = product.priceRange;
    console.log("Price Range : ", priceRange);
    const dispatch = useDispatch();

    useEffect(() => {
        const { match } = props;
        dispatch(getProductBySlug(match.params.slug));
    }, []);

    console.log("Props Slug : ", props.match.params.slug);

    const getCategoryNameFromParams = (query) => {
        if (query) {
            // const queryString = query.split("?")[0];
            const queryString = query.split("-")[0];
            return queryString;
        }
        return {};
    }

    return (
        <>
            {
                Object.keys(product.productsByPrice).map((key, index) => {
                    return (
                        <Card
                            // headerLeft={`${props.match.params.slug} mobile under ${priceRange[key]}`}
                            headerLeft={`${getCategoryNameFromParams(props.match.params.slug)} mobile under ${priceRange[key]}`}
                            headerRight={<MaterialButton
                                title={"VIEW ALL"}
                                style={{ width: "96px" }} bgColor="#2874f0" fontSize="12px"
                            />}
                            style={{
                                width: 'calc(100% - 40px)',
                                margin: '20px'
                            }}
                        >
                            <div style={{ display: 'flex' }}>
                                {
                                    product.productsByPrice[key].map(product =>
                                        <Link
                                            to={`/${product.slug}/${product._id}/p`}
                                            style={{
                                                display: 'block', textDecoration: "none", color: "#000"
                                            }} className="productContainer">
                                            <div className="productImgContainer">
                                                <img src={generatePublicUrl(product.productPictures[0].img)} alt="" />
                                            </div>
                                            <div className="productInfo">
                                                <div style={{ margin: '5px 0' }}>{product.name}</div>
                                                <div>
                                                    <Rating value="4.3" />
                                                    &nbsp;&nbsp;
                                                    <span style={{ color: "#777", fontWeight: "500", fontSize: '12px' }}>3353</span>
                                                </div>
                                                <Price value={product.price} />
                                            </div>
                                        </Link>
                                    )
                                }
                            </div>
                        </Card>
                    );
                })
            }
        </>
    )

}

export default ProductStore