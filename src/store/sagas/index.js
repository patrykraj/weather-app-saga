import {
  fork, all,
} from 'redux-saga/effects';

import getForecast from './getForecast';
import getForecastAuto from './getForecastAuto';
import getHourlyByName from './getHourlyByName';
import getSearchList from './getSearchList';
import getWeatherByCoords from './getWeatherByCoords';
import getWeatherByName from './getWeatherByName';

export default function* rootSaga() {
  yield all([
    fork(getForecast),
    fork(getForecastAuto),
    fork(getHourlyByName),
    fork(getSearchList),
    fork(getWeatherByCoords),
    fork(getWeatherByName),
  ]);
}
