import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';

import { IrequestSlice, Irequest } from '../../Types/requestSliceTypes';

// /. imports

const initialState: IrequestSlice = {
    requests: [],
    // (lat)itude + (long)itude
    currentRoutesData: [
        {
            id: 1,
            role: 'start',
            label: 'Start Location Name',
            coords: {
                lat: 59.84660399,
                lng: 30.29496392
            }
        },
        {
            id: 2,
            role: 'end',
            label: 'End Location Name',
            coords: {
                lat: 59.82934196,
                lng: 30.42423701
            }
        }
    ],
    isRequestsDataLoading: true,
    requestsFetchError: null
};

// /. state

const requestSlice = createSlice({
    name: 'requestSlice',
    initialState,
    reducers: {
        switchReqLoadingStatus(state, action: PayloadAction<boolean>) {
            state.isRequestsDataLoading = action.payload;
        },
        setRequestsData(state, action: PayloadAction<Irequest[]>) {
            state.requests = action.payload;
        },
        setReqError(state, action: PayloadAction<null | string>) {
            state.requestsFetchError = action.payload;
            state.isRequestsDataLoading = false;
        },
        setCurrentRouteCoords(state, action: PayloadAction<{ id: number }>) {
            const { id } = action.payload;
            // /. payload
            const targetAPIRoute = state.requests.find(
                route => route.id === id
            );
            const targetStartRoute = state.currentRoutesData.find(
                route => route.role === 'start'
            );
            const targetEndRoute = state.currentRoutesData.find(
                route => route.role === 'end'
            );
            if (targetAPIRoute && targetStartRoute && targetEndRoute) {
                targetStartRoute.coords.lat = targetAPIRoute.coords.lat_start;
                targetStartRoute.coords.lng = targetAPIRoute.coords.lng_start;
                //
                targetEndRoute.coords.lat = targetAPIRoute.coords.lat_end;
                targetEndRoute.coords.lng = targetAPIRoute.coords.lng_end;
            }
        },
        triggerRequestsDataFetch() {
            return;
        }
    }
});

export const {
    setRequestsData,
    switchReqLoadingStatus,
    setReqError,
    setCurrentRouteCoords,
    triggerRequestsDataFetch
} = requestSlice.actions;

export default requestSlice.reducer;
