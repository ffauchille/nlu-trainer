import { combineEpics } from "redux-observable";
import trainerEpics from "../trainer/epics"

const epics = [
  ...trainerEpics
]


export default (action$, store) =>
    combineEpics(...epics)(action$, store, {}).catch((err, source) => {
  // TODO store.dispatch(ERROR Action)
  return source;
});
