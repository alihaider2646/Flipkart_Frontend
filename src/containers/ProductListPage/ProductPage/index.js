import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductPage } from '../../../actions'
import getParams from '../../../utils/getParams';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Card from '../../../components/UI/Card';


const ProductPage = (props) => {
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const { page } = product;

    useEffect(() => {
        const params = getParams(props.location.search);
        // console.log({ params });
        const payload = {
            params: params
        }
        dispatch(getProductPage(payload));
    }, []);

    return (
        <div style={{ margin: "0 10px" }}>
            <h3>{page.title}</h3>
            <Carousel
                renderThumbs={() => { }}
            >
                {
                    page.banners && page.banners.map((banner, index) =>
                        <a
                            key={index}
                            style={{ display: 'block', cursor: 'pointer' }}
                            href={banner.navigateTo}
                        >
                            <img src={banner.img} alt="" />
                            {/* <p className="legend">Legend 1</p> */}
                        </a>
                    )
                }
            </Carousel>
            {/* {JSON.stringify(product.page)} */}
            <div
                style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {
                    page.products && page.products.map((product, index) =>
                        <Card
                            key={index}
                            style={{
                                width: "400px",
                                height: "200px",
                                margin: "10px 5px",
                                padding: "10px 0"
                            }}
                        >
                            <img
                                style={{ width: "100%", height: "100%", objectFit: 'contain' }} src={product.img} alt="" />
                        </Card>
                    )
                }
            </div>
        </div>
    );
};

export default ProductPage;