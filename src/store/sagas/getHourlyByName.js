import {
  call, put, takeEvery,
} from 'redux-saga/effects';
import * as actions from '../constants';

function fetchHourlyByName({ name, forecastKey, weatherKey }) {
  return fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${name}&key=${forecastKey}`)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then((res) => {
      if (res.lat) {
        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${res.lat}&lon=${res.lon}&exclude=current,minutely,daily&appid=${weatherKey}&units=metric`)
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            }
            return null;
          })
          .then((data) => ({
            ...data,
            cityName: res.city_name,
            countryCode: res.country_code,
          }))
          .catch(() => (null));
      } else {
        return null;
      }
    })
    .catch(() => (null));
}

function* watchFetchHourlyByName(action) {
  yield put({ type: actions.GET_WEATHER_START });

  try {
    const payload = yield call(fetchHourlyByName, action.payload);
    if (payload) {
      yield put({ type: actions.GET_HOURLY_BY_NAME_SUCCESS, payload });
    } else {
      yield put({ type: actions.GET_HOURLY_BY_NAME_FAILURE, payload: 'City not found' });
    }
  } catch (e) {
    yield put({ type: actions.GET_HOURLY_BY_NAME_FAILURE, payload: e.message });
  }
}

function* fetchHourlyByNameSaga() {
  yield takeEvery(actions.GET_HOURLY_BY_NAME, watchFetchHourlyByName);
}

export default fetchHourlyByNameSaga;
