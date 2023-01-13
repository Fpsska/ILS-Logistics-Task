import { call, put, takeEvery } from 'redux-saga/effects';

import { fetchRequestsData } from '../api/fetchRequestsData';
import {
    setRequestsData,
    switchReqLoadingStatus
} from '../slices/requestSlice';

// /. imports

function* fetchRequestsWorker(): any {
    // business logic
    const { requestsData } = yield call(fetchRequestsData);
    yield put(setRequestsData(requestsData));
}

export function* fetchRequestsWatcher(): any {
    // watching for AC of slice
    yield takeEvery(switchReqLoadingStatus.type, fetchRequestsWorker);
}

// export function* rootSaga(): any {
//     // run watchers
//     yield fetchRequestsWatcher();
// }
