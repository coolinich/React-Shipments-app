import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem } from '@coreui/react';
import { getShipmentsList, selectShipmentList, selectGeneralError } from '../reducers/shipments2';

export const ShipmentsList = () => {
    const [currentShipment, setCurrentShipment] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const dispatch = useDispatch();
    
    const shipmentsList = useSelector(selectShipmentList);
    const isShipmentsFailed = useSelector(selectGeneralError);

    useEffect(() => {
        dispatch(getShipmentsList());
    }, [getShipmentsList]);

    const setActiveShipment = (shipment, index) => {
        setCurrentShipment(shipment);
        setCurrentIndex(index);
    };

    return (
        <div className="row">
            <div className="col-md-12">
                <h4>Shipments List</h4>
                    {
                        shipmentsList.length > 0  ?
                        (
                            <CAccordion>
                                {
                                    shipmentsList.map((shipment, index) => (
                                        <CAccordionItem
                                            onClick={() => {
                                                setActiveShipment(shipment, index);
                                            }}
                                            itemKey={index}
                                            key={index}>
                                            <CAccordionHeader>
                                                <div className="accordion-header_wrapper">
                                                    <div
                                                        className="accordion-header_title"
                                                    >
                                                        {shipment.orderNo}
                                                    </div>
                                                    <div
                                                        className="accordion-header_subtitle"
                                                    >
                                                        {shipment.customer}
                                                    </div>
                                                </div>
                                            </CAccordionHeader>
                                            <CAccordionBody>
                                            {
                                                currentShipment ?
                                                (
                                                    <div>
                                                        <h4>Details about order: {currentShipment.orderNo}</h4>
                                                        <div>
                                                            <label className="shipment-data_label">
                                                                Delivery date:
                                                            </label>
                                                            {" "}{currentShipment.date}
                                                        </div>
                                                        <div>
                                                            <label className="shipment-data_label">
                                                                Customer:
                                                            </label>
                                                            {" "}{currentShipment.customer}
                                                        </div>
                                                        <div>
                                                            <label className="shipment-data_label">
                                                                TrackingNo:
                                                            </label>
                                                            {" "}{currentShipment.trackingNo}
                                                        </div>
                                                        <div>
                                                            <label className="shipment-data_label">
                                                                Status:
                                                            </label>
                                                            {" "}{currentShipment.status}
                                                        </div>
                                                        <div>
                                                            <label className="shipment-data_label">
                                                                Consignee:
                                                            </label>
                                                            {" "}{currentShipment.consignee}
                                                        </div>
                                                        <Link
                                                            type="button"
                                                            to={"/shipments/" + currentShipment.orderNo}
                                                            className="btn btn-warning">
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
                                            </CAccordionBody>
                                        </CAccordionItem>
                                    ))
                                }
                            </CAccordion>
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
        </div>
    );
};