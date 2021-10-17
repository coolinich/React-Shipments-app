import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
    createShipment
} from "../actions/shipments"

const AddShipmentItem = () => {
    const initialShipmentState = {
        orderNo: "",
        date: "",
        customer: "",
        trackingNo: "",
        status: "InTransit",
        consignee: ""
    }

    const [shipment, setShipment] = useState(initialShipmentState);
    const [submitted, setSubmitted] = useState(false);

    const dispatch = useDispatch();

    const handleInputChange = event => {
        const { name, value } = event.target;
        setShipment({ ...shipment, [name]: value });
    }

    const saveShipment = () => {
        dispatch(createShipment(shipment))
            .then(data => {
                setShipment({
                    orderNo: shipment.orderNo,
                    date: shipment.date,
                    customer: shipment.customer,
                    trackingNo: shipment.trackingNo,
                    status: shipment.status,
                    consignee: shipment.consignee  
                });
                setSubmitted(true);
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const newShipment = () => {
        setShipment(initialShipmentState);
        setSubmitted(false);
    }

    return (
        <div className="submit-form">
            {submitted ?
                (<div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newShipment}>
                      Add
                    </button>
                  </div>) :
                (
                    <div>
                        <div className="form-group">
                            <label htmlFor="orderNo">orderNo</label>
                            <input
                            type="text"
                            className="form-control"
                            id="orderNo"
                            required
                            value={shipment.orderNo}
                            onChange={handleInputChange}
                            name="orderNo"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="date">date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="date"
                                required
                                value={shipment.date}
                                onChange={handleInputChange}
                                name="date"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="customer">customer</label>
                            <input
                                type="text"
                                className="form-control"
                                id="customer"
                                required
                                value={shipment.customer}
                                onChange={handleInputChange}
                                name="customer"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="trackingNo">trackingNo</label>
                            <input
                                type="text"
                                className="form-control"
                                id="trackingNo"
                                required
                                value={shipment.trackingNo}
                                onChange={handleInputChange}
                                name="trackingNo"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">status</label>
                            <select
                                className="form-select"
                                id="status"
                                required
                                value={shipment.status}
                                onChange={handleInputChange}
                                name="status"
                            >
                                <option>Specify status of shipment</option>
                                <option value="'In Transit'">
                                    In Transit
                                </option>
                                <option value="'Delivered'">
                                    Delivered
                                </option>
                                <option value="'Shipped'">
                                    Shipped
                                </option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="consignee">consignee</label>
                            <input
                            type="text"
                            className="form-control"
                            id="consignee"
                            required
                            value={shipment.consignee}
                            onChange={handleInputChange}
                            name="consignee"
                            />
                        </div>
                        <button onClick={saveShipment} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )
            }
        </div>
    );
}

export default AddShipmentItem;