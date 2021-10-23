import { combineReducers } from "redux";
import shipments from "./shipments";
import { shipmentSlice } from "./shipments2";

export default combineReducers({
    shipments,
    shipment2: shipmentSlice.reducer
});