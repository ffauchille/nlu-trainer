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
  let found = findIndex(arr, predicate);
  return doRemove(arr, found);
}

export function findAllAndUpdate<T>(
  arr: T[],
  predicate: (k: T) => boolean,
  updateFn: ((t: T) => T)
): T[] {
  var indexes: number[] = [];
  for (var i = 0; i < arr.length; i++) {
    if (predicate(arr[i])) {
      indexes.push(i);
    }
  }
  if (indexes.length > 0) {
    return indexes.reduce((copy, idx) => {
      copy[idx] = updateFn(arr[idx]);
      return copy;
    }, arr.slice(0));
  }

  return arr;
}

export function startPolling(
  url: string,
  ticInMillis: number = 2000
): Observable<RASAAppsStatus> {
  return timer(0, ticInMillis).pipe(switchMap(_ => api.get(url)));
}

export const normalize = (str: string): string =>
  str.toLowerCase().replace(" ", "_");

export const strStartsWith = (str: string, starter: string): boolean => {
  let res = false;
  if (str.length >= starter.length) {
    res = str.slice(0, starter.length) === starter;
  }
  return res;
};

/** Same as findIndex of ES6.
 * return index of the element matching `predicate` in `arr` 
 *
 * ex: 
 * // arr = [ {n: 1, s: "toto"}, {n:2, s: "tata"}]
 * findIndex<{n: number, s: string}>(e => e.n === 1) // returns 0
 * 
 * findIndex<{n: number, s: string}>(e => e.s === "titi") // returns -1
 * 
 */
export function findIndex<T>(arr: T[], predicate: (e: T) => boolean): number {
  let notFound = -1;
  for(var i = 0; i < arr.length; i++) {
      if (predicate(arr[i])) {
          return i;
      }
  }
  return notFound;
}