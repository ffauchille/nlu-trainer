import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { Observable } from '../../../node_modules/rxjs/internal/Observable';

const headers = {
    "Content-Type": "application/json"
}

const withHost = (route: string) => process.env.NLU_TRAINER_API + (route.startsWith("/") ? route : "/" + route)

export function get<T>(route: string): Observable<T> { return ajax.getJSON<T>(withHost(route), headers) }