import * as restify from "restify";
import { withJSON, withQP } from "./routes";
import { APPS_COLLECTION, withId, quickCmd } from "./mongo";
import { AppModel } from "./models";

export default (server: restify.Server) => {
  server.post(
    "/apps",
    (request: restify.Request, response: restify.Response) => {
      withJSON<AppModel>(request, response, json => {
        let withMeta: AppModel = { ...json }
        quickCmd(response, APPS_COLLECTION, c => c.insertOne(withId(withMeta)));
      });
    }
  );

  server.get("/apps", (_: restify.Request, response: restify.Response) => {
    quickCmd(response, APPS_COLLECTION, c => c.find({}).toArray());
  });

  server.del("/apps", (req: restify.Request, response: restify.Response) => {
    withQP(req, response, [ "app" ], app => quickCmd(response, APPS_COLLECTION, c => c.remove({ _id: app })))
  })
};