import { all } from "redux-saga/effects";
import user from "./user/sagas";
import post from "./post/sagas";

export default function* rootSaga() {
  return yield all([user, post]);
}
