import * as mongo from "mongodb";
/**
 * 
 *  TODO: Use restify error handling
 *  @see http://restify.com/docs/home/#error%20handling
 * 
 * 
 */
type ErrorType = "RASA" | "MONGO" | "API"

export type APIError = Error & {
    type: ErrorType;
    statusCode: number;
}

export const wrongFormatError = (): APIError => ( { type: "API", statusCode: 400, name: "Bad request",message: "payload has wrong format" })
export const missingQP = (queryParam: string[]): APIError => ( { type: "API", name: "Bad Request", statusCode: 400, message: "missing query parameter " + queryParam.reduce((all, p) => `${all}, ${p}`, '') })
export const rasaTrainError = (msg: string): APIError => ( { type: "RASA", statusCode: 500, name: "Training error", message: `error posting training file ${msg}` })
export const rasaParseError = (msg: string, txt: string = ""): APIError => ( { type: "RASA", statusCode: 500, name: "Paring error", message: `error predicting ${txt}: ${msg}` })
export const keyMissingError = (missingKey: string): APIError => ({
  type: "RASA",
  statusCode: 400,
  message: `Bad format, missing ${missingKey}`,
  name: "Bad request"
});
export const mongoError = (err: mongo.MongoError): APIError => {
    console.error("mongo err", err);
    let error = err ? err: { name: "", message: "mongo error" }
    return { type: "MONGO", statusCode: 500, name: "Mongo error", message: `error ${error.name || ""} ${error.code ? "code ( " + error.code + " )" : ""} ${error.message}` }
}

export const onError = (error: APIError) => {
    switch (error.type) {
        case "RASA": {
            console.log("[ RASA ERROR ]: ", error.message)
            break;
        }
        default: {
            console.log("[ API Error ]: ", error.message)
        }
    }
}