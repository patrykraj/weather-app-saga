import {
  call, put, takeEvery,
} from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../constants';

function fetchWeatherByName({ forecast, url }) {
  return axios
    .get(url)
    .then((city) => {
      if (city.statusText !== 'No Content') {
        if (forecast) {
          const newurl = `${window.location.protocol}//${window.location.host}/forecast/${city.data.city_name}`;
          window.history.pushState({ path: newurl }, '', newurl);
        }

        return city.data;
      } return null;
    })
    .catch((err) => (err.response ? err.response.data.message : err.message));
}

function* watchFetchWeatherByName(action) {
  yield put({ type: actions.GET_WEATHER_START });

  try {
    const payload = yield call(fetchWeatherByName, action.payload);
    if (action.payload.forecast) {
      return yield put({ type: actions.GET_FORECAST_SUCCESS, payload });
    }

    if (!action.payload) {
      return yield put({ type: actions.GET_WEATHER_FAILURE, payload: `Cannot find ${action.payload.name}` });
    }

    return yield put({ type: actions.GET_WEATHER_SUCCESS, payload });
  } catch (e) {
    return yield put({ type: actions.GET_WEATHER_FAILURE, payload: e.message });
  }
}

export default function* fetchWeatherByNameSaga() {
  yield takeEvery(actions.GET_WEATHER_BY_NAME, watchFetchWeatherByName);
}
