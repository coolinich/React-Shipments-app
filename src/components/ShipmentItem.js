import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateShipment, deleteShipment } from "../actions/shipments";
import ShipmentService from "../services/ShipmentService";

const ShipmentItem = (props) => {
    const initialShipmentState = {
        orderNo: "",
        date: "",
        customer: "",
        trackingNo: "",
        status: "'InTransit'",
        consignee: ""
    }

    const [currentShipment, setCurrentShipment] = useState(initialShipmentState);
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const getShipment = orderNo => {
        ShipmentService.get(orderNo)
            .then(response => {
                setCurrentShipment(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        getShipment(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentShipment({...currentShipment, [name]: value});
    };

    const updateShipmentData = () => {
        dispatch(updateShipment(currentShipment.orderNo, currentShipment))
            .then(response => {
                console.log(response);
                setMessage("Shipment was updated successfully!");
            })
            .catch(error => {
                console.log(error);
                setMessage("Shipment hasn't been updated!");
            })
    };

    const deleteShipmentData = () => {
        dispatch(deleteShipment(currentShipment.orderNo))
            .then(() => {
                // props.history.push("/shipments");
            })
            .catch(error => {
                console.log(error)
                setMessage("Shipment hasn't been deleted!");;
            })
    };

    return (
        <div>
            {
                currentShipment ?
                (
                    <div className="edit-form">
                        <form>
                            <div className="form-group">
                                <label htmlFor="orderNo">orderNo</label>
                                <input
                                type="text"
                                className="form-control"
                                id="orderNo"
                                required
                                value={currentShipment.orderNo}
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
                                value={new Date(currentShipment.date)}
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
                                value={currentShipment.customer}
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
                                value={currentShipment.trackingNo}
                                onChange={handleInputChange}
                                name="trackingNo"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">status</label>
                                {/* <input
                                type="text"
                                className="form-control"
                                id="status"
                                required
                                value={currentShipment.status}
                                onChange={handleInputChange}
                                name="status"
                                /> */}
                                <select
                                className="form-select"
                                id="status"
                                required
                                value={currentShipment.status}
                                onChange={handleInputChange}
                                name="status"
                            >
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
                                value={currentShipment.consignee}
                                onChange={handleInputChange}
                                name="consignee"
                                />
                            </div>
                        </form>
                        <button
                            type="submit"
                            className="btn btn-primary mr-2"
                            onClick={updateShipmentData}
                        >
                            Update
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={deleteShipmentData}
                        >
                            Delete
                        </button>
                        <p>{ message }</p>
                    </div>
                ) :
                (
                    <div>
                        <p>
                            Please, click on Shipment row
                        </p>
                    </div>
                )
            }
        </div>
    );
}

export default ShipmentItem;