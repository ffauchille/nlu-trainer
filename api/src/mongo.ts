import * as mongo from "mongodb";
import * as restify from "restify";
import { map, flatMap, catchError } from "rxjs/operators";
import { Observable, from, empty, Subscriber, Subscription } from "rxjs";
import { mongoError } from "./error";
import { join } from "path";

export const INTENT_COLLECTION = "intents";
export const EXAMPLE_COLLECTION = "examples";
export const APPS_COLLECTION = "apps";

export const MONGO_ID_RGXP = /[a-z0-9]{24}/;

export function withId(json: any) {
    delete json.id
    return { _id: Collection.generateId(), ...json }
}

export class Collection {

    private uri: string = process.env.MONGO_URI
    private dbName: string = process.env.MONGO_DB_NAME;
    private colName: string
    private client$: mongo.MongoClient = null;

    public static generateId(): string {
        return new mongo.ObjectID().toHexString()
    }

    constructor(colName: string) {
        this.colName = colName
    }

    private withDB() {
        return new Observable<mongo.Db>(subscriber => {
            mongo.MongoClient.connect(this.uri, { useNewUrlParser: true }, ((error: mongo.MongoError, result) => {
                if (error) {
                    subscriber.error(mongoError(error))          
                } else {
                    subscriber.next(result.db(this.dbName))
                }
            }))
        })
    }

    private observableResult<T>(err: mongo.MongoError, response: T): Observable<T> {
        return new Observable(subscriber => {
            if (err) {
                subscriber.error(mongoError(err))
            } else {
                subscriber.next(response)
            }
        })
    }

    run<T>(queryCb: (col: mongo.Collection<T>) => Promise<T>): Observable<T> {
        return this.withDB()
                .pipe(flatMap( col => from(queryCb(col.collection(this.colName, this.observableResult)))))
    }

    quickRun<T>(response: restify.Response, queryCb: ( col: mongo.Collection<any> ) => Promise<T>): Observable<T> {
        return this.withDB()
            .pipe(flatMap(col => 
                from(queryCb(col.collection(this.colName, (err, res) => this.observableResult(err, res)))
            )))
            .pipe(map(d => response.send(200, d)))
            .pipe(catchError(err => response.send(500, mongoError(err))))
    }

    close(force?: boolean): Observable<void> {
        var obs: Observable<void> = empty()
        if (this.client$) {
            obs = from(this.client$.close(force))
        }
        return obs
    }
    
}

export function quickCmd<T>(response: restify.Response, colName: string, queryCb: ( col: mongo.Collection<any> ) => Promise<T>): Subscription {
    let col = new Collection(colName)
    let sub = col.quickRun(response, queryCb).subscribe()
    col.close();
    return sub;
}