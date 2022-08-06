import { createAction, props } from "@ngrx/store";
import { Appstate } from "./appstate";

export class AppAction {
}

export const setAPIStatus = createAction(
  '[API] success or failure status',

  props<{apiStatus : Appstate}>()
);
