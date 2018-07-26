import { combineEpics } from "redux-observable";
import trainerEpics from "../trainer/epics"
import { catchError } from "rxjs/operators";

const epics = [
  ...trainerEpics
]


export default (action$, store, dep) =>
    combineEpics(...epics)(action$, store, dep).pipe(catchError((err, source) => {
  // TODO store.dispatch(ERROR Action)
  return source;
}));
