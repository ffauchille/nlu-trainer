import { Action } from "redux";
import { RASAAppsStatus } from "../../models/rasa";

export type RasaStatusUpdated = Action<string> & {
    status: RASAAppsStatus
}
export const RasaStatusUpdatedAction = "apps#RasaStatusUpdated"
export function rasaStatusUpdated(status: RASAAppsStatus): RasaStatusUpdated {
    return { type: RasaStatusUpdatedAction, status }
}