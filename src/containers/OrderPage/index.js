import "./style.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { generatePublicUrl } from "../../urlConfig";
import { BiRupee } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { Breed } from "../../components/MaterialUI";
import { Link } from "react-router-dom";

const OrderPage = (props) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrders());
    }, []);

    console.log('Order Id : ', user);


    return (
        <Layout>
            <div style={{ maxWidth: "1160px", margin: "5px auto" }}>
                <Breed
                    breed={[
                        { name: "Home", href: "/" },
                        { name: "My Account", href: "/account" },
                        { name: "My Orders", href: "/account/orders" },
                    ]}
                    breedIcon={<IoIosArrowForward />}
                />
                {user.orders.map((order) => {
                    return order.items.map((item) => (
                        <Card style={{ display: 'block', margin: "5px 0" }}>
                            <Link
                                style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}
                                to={`/order_details/${order._id}`}
                                className="orderItemContainer">
                                <div className="orderImgContainer">
                                    <img className="orderImg"
                                        src={generatePublicUrl(item.productId.productPictures[0].img)}
                                    />
                                </div>
                                <div className="orderRow">
                                    <div className="orderName">{item.productId.name}</div>
                                    <div className="orderPrice">Rs - {item.payablePrice}</div>
                                    <div>{order.paymentStatus}</div>
                                </div>
                            </Link>
                        </Card>
                    ));
                })}
            </div>
        </Layout>
    );
};

export default OrderPage;