import { createReducer, on } from "@ngrx/store";
import { setAPIStatus } from "./app.action";
import { Appstate } from "./appstate";

export class AppReducer {
}


export const initialstate: Readonly<Appstate> = {
  apiResponseMessage: '',
  apiStatus: '',
}

export const appReducer = createReducer(
  initialstate,
 on(setAPIStatus, (state , {apiStatus}) => {
  return {
    ...state,
    ...apiStatus
  }
 })
)
