import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { remove, update } from "../services/ShipmentService";
import { getShipmentById, selectCurrentItem } from '../reducers/shipments2';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { CAlert } from '@coreui/react'
import '../App.css';


export const ShipmentItem = (props) => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const currentItem = useSelector(selectCurrentItem);
    let history = useHistory();

    useEffect(() => {
        dispatch(getShipmentById({ id: props.match.params.id }));
    }, [props.match.params.id]);
    
    useEffect(() => {
        formik.setValues(currentItem);
    }, [currentItem, formik]);

    const validationSchema = Yup.object().shape({
        orderNo: Yup.string().required("Order number is required"),
        date: Yup.string().required("Date is required"),
        customer: Yup.string().required("Customer data is required"),
        trackingNo: Yup.string().required("TrackingNo is required"),
        status: Yup.string().required("Set current status"),
        consignee: Yup.string().required("Consignee is required")
    });

    const formik = useFormik({
        initialValues: {
            orderNo: "",
            date: "",
            customer: "",
            trackingNo: "",
            status: "InTransit",
            consignee: ""
        },
        validationSchema,
        // validateOnChange: false,
        // validateOnBlur: false,
        onSubmit: async (values) => {
            try {
                const response = await update(values.orderNo, values);
                console.log(response);

            }
            catch (error) {
               setVisible(true);
               setErrorMessage(error);
            }
        },
    }); 

    const deleteShipmentData = async () => {
        try {
            const response = await remove(formik.values.orderNo);
            formik.handleReset();
            history.push("/shipments");
        } catch (error) {
            setVisible(true);
            setErrorMessage(error.message);
        }
        
    }

    return (
        <div>
            {
                formik?.values ?
                (
                    <div className="edit-form">
                        <form onSubmit={formik.handleSubmit} noValidate>
                            <div className="form-group">
                                <label htmlFor="orderNo">orderNo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="orderNo"
                                    disabled
                                    value={formik?.values?.orderNo}
                                    onChange={formik.handleChange}
                                    name="orderNo"
                                />
                                <div className="text-danger validation-message">
                                    {formik.errors.orderNo ? formik.errors.orderNo : null}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="date">date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="date"
                                    required
                                    value={formik.values.date}
                                    onChange={formik.handleChange}
                                    name="date"
                                />
                                <div className="text-danger validation-message">
                                    {formik.errors.date ? formik.errors.date : null}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="customer">customer</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="customer"
                                    required
                                    value={formik.values.customer}
                                    onChange={formik.handleChange}
                                    name="customer"
                                />
                                <div className="text-danger validation-message">
                                    {formik.errors.customer ? formik.errors.customer : null}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="trackingNo">trackingNo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="trackingNo"
                                    required
                                    value={formik.values.trackingNo}
                                    onChange={formik.handleChange}
                                    name="trackingNo"
                                />
                                <div className="text-danger validation-message">
                                    {formik.errors.trackingNo ? formik.errors.trackingNo : null}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">status</label>
                                <select
                                    className="form-select"
                                    id="status"
                                    required
                                    value={formik.values.status}
                                    onChange={formik.handleChange}
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
                                <div className="text-danger validation-message">
                                    {formik.errors.status ? formik.errors.status : null}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="consignee">consignee</label>
                                <input
                                type="text"
                                className="form-control"
                                id="consignee"
                                required
                                value={formik.values.consignee}
                                onChange={formik.handleChange}
                                name="consignee"
                                />
                                <div className="text-danger validation-message">
                                    {formik.errors.consignee ? formik.errors.consignee : null}
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Update
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={deleteShipmentData}
                            >
                                Delete
                            </button>
                            <CAlert
                                color="danger"
                                dismissible
                                visible={visible}
                                onClose={() => setVisible(false)}
                            >
                                {errorMessage}
                            </CAlert>
                        </form>
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
};