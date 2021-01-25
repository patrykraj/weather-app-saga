import {
  call, put, takeEvery,
} from 'redux-saga/effects';
import * as actions from '../constants';

function fetchWeatherByName({ forecast, url }) {
  return fetch(url)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then((city) => {
      if (!city) {
        return null;
      } else {
        if (forecast) {
          const newurl = `${window.location.protocol}//${window.location.host}/forecast/${city.city_name}`;
          window.history.pushState({ path: newurl }, '', newurl);
        }

        return city;
      }
    })
    .catch(() => null);
}

function* watchFetchWeatherByName(action) {
  yield put({ type: actions.GET_WEATHER_START });

  try {
    const payload = yield call(fetchWeatherByName, action.payload);
    if (!payload) {
      return yield put({ type: actions.GET_WEATHER_FAILURE, payload: 'City not found' });
    } else if (action.payload.forecast) {
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
