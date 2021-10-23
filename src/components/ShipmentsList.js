import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getShipmentsList, selectShipmentList, selectGeneralError } from '../reducers/shipments2';

const ShipmentsList = () => {
    const [currentShipment, setCurrentShipment] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const dispatch = useDispatch();
    
    const shipmentsList = useSelector(selectShipmentList);
    const isShipmentsFailed = useSelector(selectGeneralError);

    useEffect(() => {
        dispatch(getShipmentsList());
    }, []);

    const setActiveShipment = (shipment, index) => {
        setCurrentShipment(shipment);
        setCurrentIndex(index);
    };

    return (
        <div className="list row">
            <div className="col-md-6">
                <h4>Shipments List</h4>
                    {
                        shipmentsList.length > 0  ?
                        (
                            <ul className="list-group">
                                {
                                shipmentsList.map((shipment, index) => (
                                    <li
                                        className={
                                        "list-group-item " + (index === currentIndex ? "active" : "")
                                        }
                                        onClick={() => {
                                            setActiveShipment(shipment, index);
                                        }}
                                        key={index}
                                    >
                                        {shipment.orderNo}
                                        {shipment.customer}
                                    </li>
                                
                                ))
                                }
                            </ul>
                        ) :
                        (
                            <div className="col-md-12">
                                {
                                    shipmentsList.length === 0 && !isShipmentsFailed ? (
                                        <div>
                                            <p>No data to be shown, click Add to create new item</p>
                                        </div>
                                    ) : 
                                    (
                                        <div>
                                            <p>Try later...</p>
                                        </div>  
                                    )
                                }
                            </div>
                        )

                    }
            </div>
            <div className="col-md-6">
                {
                    currentShipment ?
                    (
                        <div>
                            <h4>Details about order: {currentShipment.orderNo}</h4>
                            <div>
                                <label>
                                    Delivery date:
                                </label>
                                {" "}{currentShipment.date}
                            </div>
                            <div>
                                <label>
                                    Customer:
                                </label>
                                {" "}{currentShipment.customer}
                            </div>
                            <div>
                                <label>
                                    TrackingNo:
                                </label>
                                {" "}{currentShipment.trackingNo}
                            </div>
                            <div>
                                <label>
                                    Status:
                                </label>
                                {" "}{currentShipment.status}
                            </div>
                            <div>
                                <label>
                                    Consignee:
                                </label>
                                {" "}{currentShipment.consignee}
                            </div>

                            <Link
                                type="button"
                                to={"/shipments/" + currentShipment.orderNo}
                                className="btn btn-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) :
                    (
                        <div>
                            <p>
                                Please, click to Shipment row to see details
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default ShipmentsList;