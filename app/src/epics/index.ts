import { combineEpics, Epic } from "redux-observable";
import { catchError } from "rxjs/operators";

import appsEpics from "../apps/epics";
import intentsEpics from "../intents/epics";
import examplesEpics from "../examples/epics";
import testboxEpics from "../testbox/epics";

const epics: any[] = [
  ...appsEpics,
  ...intentsEpics,
  ...examplesEpics,
  ...testboxEpics
]


export default (action$, store, dep) =>
    combineEpics(...epics)(action$, store, dep).pipe(catchError((err, source) => {
  // TODO store.dispatch(ERROR Action)
  console.error("epics error", err)
  return source;
}));
