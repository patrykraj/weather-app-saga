import {
  call, put, takeEvery,
} from 'redux-saga/effects';
import * as actions from '../constants';

function fetchWeatherByCoords({ coords, key }) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${key}&units=metric`)
    .then((response) => {
      if (response.ok && response.status === 200) {
        return response.json();
      }
      throw Error(response.status);
    })
    .then((res) => ({
      data: res,
      coords,
    }));
}

function* getWeatherByCoords(action) {
  yield put({ type: actions.GET_WEATHER_START });

  try {
    const payload = yield call(fetchWeatherByCoords, action.payload);
    yield put({ type: actions.GET_COORDS_SUCCESS, payload });
  } catch (e) {
    yield put({ type: actions.GET_WEATHER_FAILURE, payload: e.message });
  }
}

export default function* fetchWeatherByCoordsSaga() {
  yield takeEvery(actions.GET_WEATHER_BY_COORDS, getWeatherByCoords);
}
