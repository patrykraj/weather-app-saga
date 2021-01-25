import {
  call, put, takeEvery,
} from 'redux-saga/effects';
import * as actions from '../constants';

function fetchForecast({ name, key }) {
  return fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${name}&key=${key}`)
    .then((response) => {
      if (response.ok && response.status === 200) {
        return response.json();
      }
      throw Error(response.status);
    });
}

function* watchFetchForecast(action) {
  yield put({ type: actions.GET_WEATHER_START });

  try {
    const payload = yield call(fetchForecast, action.payload);
    yield put({ type: actions.GET_FORECAST_SUCCESS, payload });
  } catch (e) {
    yield put({ type: actions.GET_FORECAST_FAILURE, payload: e.message });
  }
}

export default function* fetchForecastSaga() {
  yield takeEvery(actions.GET_FORECAST, watchFetchForecast);
}
