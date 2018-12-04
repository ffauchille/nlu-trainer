import { Intent } from "../models/intent";
import { AppModel } from "../models/app";
import { Category } from "../models/category";
import { history } from "../app";
import { strEndsWith, serializeName } from "../utils";
import { push, RouterAction } from "connected-react-router";

export const pushTo = (model: Intent | AppModel | Category, typ: "intent" | "app" | "category"): RouterAction => {
    let current = history.location.pathname
    let base = current
    let split = current.split("/").filter(el => el.length > 0)
    switch (typ) {
        case "intent":
            base = split.length > 1 ? `/${split[0]}/${split[1]}/` : "/"
            break;
        case "category":
            base = split.length > 0 ? `/${split[0]}/` : "/";
            break;
        case "app":
        default:
            base = "/"
    }
    
    return push(base + serializeName(model.name));

} 