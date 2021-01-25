import {
  call, put, takeEvery,
} from 'redux-saga/effects';
import * as actions from '../constants';

function fetchForecastAuto({ name, key }) {
  return fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${name}&key=${key}`)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then((res) => res)
    .catch(() => (null));
}

function* watchFetchForecastAuto(action) {
  yield put({ type: actions.GET_WEATHER_START });

  try {
    const payload = yield call(fetchForecastAuto, action.payload);
    if (payload) {
      yield put({ type: actions.GET_FORECAST_SUCCESS, payload });
    } else {
      yield put({ type: actions.GET_FORECAST_FAILURE, payload: 'City not found' });
    }
  } catch (e) {
    yield put({ type: actions.GET_FORECAST_FAILURE, payload: e.message });
  }
}

export default function* fetchForecastAutoSaga() {
  yield takeEvery(actions.GET_FORECAST_AUTO, watchFetchForecastAuto);
}
