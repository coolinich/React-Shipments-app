import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAll, get, update, create } from '../services/ShipmentService';

const REDUCER_NAME = 'shipment2';

const initialState = {
    shipmentsList: [],
    currentItem: null,
    generalError: ''
}

export const getShipmentsList = createAsyncThunk(
    `${REDUCER_NAME}/getShipmentsList`,
    async () => await getAll()
);

export const getShipmentById = createAsyncThunk(
    `${REDUCER_NAME}/getShipmentById`,
    async ({id}) => await get(id)
);

export const createShipmentItem = createAsyncThunk(
    `${REDUCER_NAME}/createShipmentItem`,
    async ({values}) => await create(values)
)

export const updateShipmentById = createAsyncThunk(
    `${REDUCER_NAME}/updateShipmentById`,
    async ({id, values}) => await update(id, values)
);

export const shipmentSlice = createSlice({
    name: REDUCER_NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getShipmentsList.fulfilled, (state, { payload }) => {
                state.shipmentsList = payload.data;
                if (state.shipmentsList && state.generalError) {
                    state.generalError = '';
                }
            })
            .addCase(getShipmentsList.rejected, (state, response) => {
                state.generalError = response.error.message;
            })
            .addCase(getShipmentById.fulfilled, (state, { payload }) => {
                let shipmentDate = (new Date(payload.date)).toISOString().split('T')[0];
                state.currentItem = {...payload, date: shipmentDate};
            })
            .addCase(createShipmentItem.fulfilled, (state, { payload }) => {
                state.currentItem = payload;
                console.log(payload);
            })
            .addCase(updateShipmentById.fulfilled, (state, { payload }) => {
                state.currentItem = payload;
                console.log(payload);
            })
    }
})

export const selectShipmentList = (store) => store.shipment2.shipmentsList;
export const selectCurrentItem = (store) => store.shipment2.currentItem;
export const selectGeneralError = (store) => store.shipment2.generalError;