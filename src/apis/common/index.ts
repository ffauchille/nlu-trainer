import { ajax } from 'rxjs/observable/dom/ajax';

const headers = {
    "Content-Type": "application/json"
}

const withHost = (route: string) => process.env.API_URL || "http://locahost:5000" + (route.startsWith("/") ? route : "/" + route)

export function get<T>(route: string) { return ajax.getJSON(route, headers).map( (r: AjaxResponse) => r as T) }