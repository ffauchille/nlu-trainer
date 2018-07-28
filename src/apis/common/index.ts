import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { Observable } from '../../../node_modules/rxjs/internal/Observable';

const headers = {
    "Content-Type": "application/json"
}

const withHost = (route: string) => process.env.NLU_TRAINER_API + (route.startsWith("/") ? route : "/" + route)

export function get<T>(route: string): Observable<T> { return ajax.getJSON<T>(withHost(route), headers) }
export function post<B, T>(route: string, body: B): Observable<T> { 
    return ajax.post(withHost(route), body, headers)
               .pipe(map(r => r.response as T))
}