import {
    RETRIEVE_SHIPMENTS,
    CREATE_SHIPMENT,
    UPDATE_SHIPMENT,
    DELETE_SHIPMENT,
} from './types';

import {getAll, create, update, remove} from '../services/ShipmentService';

export const retrieveShipments = () => async (dispatch) => {
    try {
        const res = await getAll();

        dispatch({
          type: RETRIEVE_SHIPMENTS,
          payload: res.data
        });
    } catch (err) {
        console.error(err);
    }
}

export const createShipment = (data) => async (dispatch) => {
    try {
        const res = await create(data);

        dispatch({
          type: CREATE_SHIPMENT,
          payload: res.data
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const updateShipment = (id, data) => async (dispatch) => {
    try {
        const res = await update(id, data);

        dispatch({
          type: UPDATE_SHIPMENT,
          payload: data
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const deleteShipment = (id) => async (dispatch) => {
    try {
        await remove(id);

        dispatch({
          type: DELETE_SHIPMENT,
          payload: { id }
        });
    } catch (err) {
        console.err(err);
    }
}