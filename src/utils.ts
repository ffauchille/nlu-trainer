import { Observable, timer } from "rxjs";
import { switchMap, map } from "rxjs/operators";
import * as api from "./apis/common";
import { RASAAppsStatus } from "./models/rasa";

export const urlify = (label: string) => label.replace(" ", "-").toLowerCase();

function doRemove<T>(arr: T[], index: number): T[] {
  if (index > -1) {
    var copy = arr.splice(0);
    copy.splice(index, 1);
    return copy;
  } else return arr;
}

export function removeAtIndex<T>(arr: T[], predicate: (k: T) => boolean): T[] {
  let found = arr.findIndex(predicate);
  return doRemove(arr, found);
}

export function findAllAndUpdate<T>(arr: T[], predicate: (k: T) => boolean, updateFn:((t:T) => T)) : T[] {
  var indexes: number[] = []
  for (var i = 0; i < arr.length; i++) {
    if (predicate(arr[i])) {
      indexes.push(i);
    }
  }
  if (indexes.length > 0) {
    return indexes.reduce( (copy,idx) => {
      copy[idx] = updateFn(arr[idx])
      return copy
    }, arr.slice(0))
  }
  
  return arr
}

export function startPolling(
  url: string,
  ticInMillis: number = 2000
): Observable<RASAAppsStatus> {
  return timer(0, ticInMillis).pipe(switchMap(_ => api.get(url)));
}

export const normalize = (str: string): string => str.toLowerCase().replace(" ", "_")