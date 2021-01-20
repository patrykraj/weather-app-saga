import * as actions from '../constants';

export const fetchWeatherStart = () => ({
  type: actions.GET_WEATHER_START,
});

export const fetchWeatherSuccess = (data) => ({
  type: actions.GET_WEATHER_SUCCESS,
  payload: data,
});

export const fetchWeatherFailure = (err) => ({
  type: actions.GET_WEATHER_FAILURE,
  payload: err,
});

export const fetchCoordsSuccess = (data, coords) => ({
  type: actions.GET_COORDS_SUCCESS,
  payload: {
    data,
    coords,
  },
});

export const setError = (err) => ({
  type: actions.SET_ERROR,
  payload: err,
});

export const fetchForecastSuccess = (data) => ({
  type: actions.GET_FORECAST_SUCCESS,
  payload: data,
});

export const fetchForecastFailure = (err) => ({
  type: actions.GET_WEATHER_FAILURE,
  payload: err,
});

export const fetchSearchListStart = () => ({
  type: actions.GET_SEARCH_LIST_START,
});

export const fetchSearchListSuccess = (data) => ({
  type: actions.GET_SEARCH_LIST_SUCCESS,
  payload: data,
});

export const fetchSearchListFailure = () => ({
  type: actions.GET_SEARCH_LIST_FAILURE,
});

export const resetSearchList = () => ({
  type: actions.GET_SEARCH_LIST_FAILURE,
});

export const setActiveSearchListElement = (val) => ({
  type: actions.SET_ACTIVE_SEARCH_LIST_ELEMENT,
  payload: val,
});

export const setActiveSearchListElementByMouseover = (val) => ({
  type: actions.SET_ACTIVE_SEARCH_LIST_ELEMENT_BY_MOUSEOVER,
  payload: val,
});

export const fetchHourlyByNameSuccess = (data) => ({
  type: actions.GET_HOURLY_BY_NAME_SUCCESS,
  payload: data,
});

export const fetchHourlyByNameFailure = (err) => ({
  type: actions.GET_HOURLY_BY_NAME_FAILURE,
  payload: err,
});
