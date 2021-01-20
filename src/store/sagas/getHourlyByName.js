import {
  call, put, takeEvery,
} from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../constants';

function fetchHourlyByName({ name, forecastKey, weatherKey }) {
  return axios
    .get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${name}&key=${forecastKey}`)
    .then((res) => {
      if (res.data.lat) {
        return axios
          .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${res.data.lat}&lon=${res.data.lon}&exclude=current,minutely,daily&appid=${weatherKey}&units=metric`)
          .then((data) => {
            let result = data.data;

            result = {
              ...result,
              city_name: res.data.city_name,
              country_code: res.data.country_code,
            };

            return result;
          })
          .catch(() => ('City not found'));
      } return null;
    })
    .catch((err) => (err.response ? err.response.data.message : err.message));
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
