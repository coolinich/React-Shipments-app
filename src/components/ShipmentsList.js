import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
    retrieveShipments,

} from "../actions/shipments"

const ShipmentsList = () => {
    const [currentShipment, setCurrentShipment] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const shipments = useSelector(state => state.shipments);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveShipments());
    }, []);

    const setActiveShipment = (shipment, index) => {
        setCurrentShipment(shipment);
        setCurrentIndex(index);
    };

    return (
        <div className="list row">
            <div className="col-md-6">
                <h4>Shipments List</h4>
                <ul className="list-group">
                    {shipments &&
                        shipments.map((shipment, index) => (
                        <li
                            className={
                            "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActiveShipment(shipment, index)}
                            key={index}
                        >
                            {shipment.orderNo}
                            {shipment.customer}
                        </li>
                    ))}
                </ul>
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