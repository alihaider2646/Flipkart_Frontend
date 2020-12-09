import './style.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrder } from '../../actions';
import Layout from '../../components/Layout';
import Card from '../../components/UI/Card';

const OrderDetailsPage = (props) => {
    const dispatch = useDispatch();
    const orderDetails = useSelector(state => state.user.orderDetails);

    useEffect(() => {
        console.log("Order Deatils Props : ", { props });
        const payload = { orderId: props.match.params.orderId }
        dispatch(getOrder(payload));
    }, []);

    if (!(orderDetails && orderDetails.address)) {
        return null;
    }

    return (
        <Layout>
            {/* <h5> {JSON.stringify('orderDetails')}</h5> */}
            <div style={{ width: '1160px', margin: '10px auto' }}>
                <Card>
                    <div className="delAdrContainer">
                        <div className="delAdrDetails">
                            <div className="delTitle">Delivery Address</div>
                            <div className="delName">{orderDetails.address.name}</div>
                            <div className="delAddress">{orderDetails.address.address}</div>
                            <div className="delPhoneNumber">Phone Number : {orderDetails.address.mobileNumber}</div>
                        </div>
                        <div className="delMoreActionContainer">
                            <div className="delTitle">More Actions</div>
                            <div className="delName">Download Invoice</div>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="">
                        <div>Items</div>
                        <div>Order Status</div>
                        <div>Order Status</div>
                    </div>
                </Card>
            </div>
        </Layout>
    );
};

export default OrderDetailsPage;