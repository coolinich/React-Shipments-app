import {
    RETRIEVE_SHIPMENTS,
    CREATE_SHIPMENT,
    UPDATE_SHIPMENT,
    DELETE_SHIPMENT,
} from '../actions/types';

const initialState = [];

function shipmentReducer(shipments = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {
        case RETRIEVE_SHIPMENTS:
            return payload;
        case CREATE_SHIPMENT:
            return [...shipments, payload];
        case UPDATE_SHIPMENT:
            return shipments.map((shipment) => {
                if (shipment.id === payload.id) {
                    return {
                        ...shipment,
                        ...payload
                    }
                } else {
                    return shipment;
                }
            });
        case DELETE_SHIPMENT:
            return shipments.filter((shipment) => shipment.id !== payload.id);
        default:
            return shipments;
    }

}

export default shipmentReducer;