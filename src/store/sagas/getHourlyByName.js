import {
  call, put, takeEvery,
} from 'redux-saga/effects';
import * as actions from '../constants';

function fetchHourlyByName({ name, forecastKey, weatherKey }) {
  return fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${name}&key=${forecastKey}`)
    .then((response) => {
      if (response.ok && response.status === 200) {
        return response.json();
      }
      throw Error(response.status);
    })
    .then((res) => {
      if (res.lat) {
        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${res.lat}&lon=${res.lon}&exclude=current,minutely,daily&appid=${weatherKey}&units=metric`)
          .then((response) => {
            if (response.ok && response.status === 200) {
              return response.json();
            }
            throw Error(response.status);
          })
          .then((data) => ({
            ...data,
            cityName: res.city_name,
            countryCode: res.country_code,
          }));
      } else {
        throw Error('City not found');
      }
    });
}

function* watchFetchHourlyByName(action) {
  yield put({ type: actions.GET_WEATHER_START });

  try {
    const payload = yield call(fetchHourlyByName, action.payload);
    yield put({ type: actions.GET_HOURLY_BY_NAME_SUCCESS, payload });
  } catch (e) {
    yield put({ type: actions.GET_HOURLY_BY_NAME_FAILURE, payload: e.message });
  }
}

function* fetchHourlyByNameSaga() {
  yield takeEvery(actions.GET_HOURLY_BY_NAME, watchFetchHourlyByName);
}

export default fetchHourlyByNameSaga;
