import { routerReducer, RouterState } from "react-router-redux";

const coreReducer = { router: routerReducer }
type CoreState = { router: RouterState }
export type StoreState = CoreState

/** Aggregate all component's reducers */
export default {
    ...coreReducer
}
