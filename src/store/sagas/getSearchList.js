import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import * as actions from '../constants';

function fetchSearchList(query) {
  if (query.trim().length > 2) {
    return fetch(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=worldcitiespop&q=${query}&rows=5&sort=population`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((res) => {
        const list = [];

        for (let i = 0; i < res.records.length; i += 1) {
          if (res.records[i].fields.population) list.push(res.records[i]);
        }

        return list;
      })
      .catch(() => null);
  } else {
    return null;
  }
}

function* watchFetchSearchList(action) {
  yield put({ type: actions.GET_SEARCH_LIST_START });

  try {
    const payload = yield call(fetchSearchList, action.payload);

    if (payload.length) {
      yield put({ type: actions.GET_SEARCH_LIST_SUCCESS, payload });
    } else {
      yield put({ type: actions.GET_SEARCH_LIST_FAILURE });
    }
  } catch (e) {
    yield put({ type: actions.GET_SEARCH_LIST_FAILURE });
  }
}

export default function* fetchSearchListSaga() {
  yield takeLatest(actions.GET_SEARCH_LIST, watchFetchSearchList);
}
