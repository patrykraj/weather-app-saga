import {
  call, put, takeEvery,
} from 'redux-saga/effects';
import * as actions from '../constants';

function fetchWeatherByName({ forecast, url }) {
  return fetch(url)
    .then((response) => {
      if (response.ok && response.status === 200) {
        return response.json();
      }
      throw Error(response.status);
    })
    .then((city) => {
      if (forecast) {
        const newurl = `${window.location.protocol}//${window.location.host}/forecast/${city.city_name}`;
        window.history.pushState({ path: newurl }, '', newurl);
      }

      return city;
    });
}

function* watchFetchWeatherByName(action) {
  yield put({ type: actions.GET_WEATHER_START });

  try {
    const payload = yield call(fetchWeatherByName, action.payload);
    if (action.payload.forecast) {
      return yield put({ type: actions.GET_FORECAST_SUCCESS, payload });
    } else {
      return yield put({ type: actions.GET_WEATHER_SUCCESS, payload });
    }
  } catch (e) {
    return yield put({ type: actions.GET_WEATHER_FAILURE, payload: e.message });
  }
}

export default function* fetchWeatherByNameSaga() {
  yield takeEvery(actions.GET_WEATHER_BY_NAME, watchFetchWeatherByName);
}
