import * as restify from "restify";
import { withJSON, withQP } from "./routes";
import { INTENT_COLLECTION, withId, quickCmd, MONGO_ID_RGXP } from "./mongo";
import { keyMissingError } from "./error";

export default (server: restify.Server) => {
  server.post(
    "/intents",
    (request: restify.Request, response: restify.Response) => {
      withJSON(request, response, json => {
        quickCmd(response, INTENT_COLLECTION, c => c.insertOne(withId(json)));
      });
    }
  );

  server.get(
    "/intents",
    (request: restify.Request, response: restify.Response) => {
      var selector = {};
      if (request.query) {
        let appId: string = request.query.appId;
        if (appId) {
          if (appId.match(MONGO_ID_RGXP)) {
            selector = { appId };
          }
        }
      }
      quickCmd(response, INTENT_COLLECTION, c => c.find(selector).toArray());
    }
  );

  server.del(
    "/intents",
    (
      request: restify.Request,
      response: restify.Response,
      next: restify.Next
    ) => {
      withQP(request, response, ["intent"], intentId =>
        quickCmd(response, INTENT_COLLECTION, c => c.remove({ _id: intentId }))
      );
    }
  );
};
