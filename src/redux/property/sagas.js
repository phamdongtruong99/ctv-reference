import { takeEvery, put } from "redux-saga/effects";
import {
  PropertyTypes,
  getListPropertySuccessAction,
  getListPropertyFailureAction,
} from "./actions";
import {data} from './tempData'

function * getListProperty () {
  try {
    localStorage.setItem("propertys", JSON.stringify(data));
    yield put(getListPropertySuccessAction(data));
  } catch (error) {
    yield put(getListPropertyFailureAction(error));
  }
}

export default [
  takeEvery(PropertyTypes.GET_LIST_PROPERTY, getListProperty),
];
