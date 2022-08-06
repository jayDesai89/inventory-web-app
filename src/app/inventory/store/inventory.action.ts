import { createAction, props } from "@ngrx/store";
import { Inventory } from "./inventory";

// Get Data
export const invokeInventoryAPI = createAction(
  '[Parts API] Invoke Inventory Fetch API'
)

export const inventoryFetchAPISuccess = createAction(
  '[Parts API] Fetch API Success',
  props<{ allParts: Inventory[] }>()
)

// Save new Data
export const invokeSaveNewPartAPI = createAction(
  '[Parts API] Invoke save new part api',
  props<{ newPart: Inventory }>()
)

export const saveNewPartAPISucess = createAction(
  '[Parts API] Save new parts api success',
  props<{ newPart : Inventory }>()
)

// Update Existing Data
export const invokeUpdateInventoryAPI = createAction(
  '[Parts API] Invoke update new part api',
  props<{ updatePart: Inventory }>()
)

export const updateNewPartAPIScuccess = createAction(
  '[Parts API] update new parts api success',
  props<{ updatePart: Inventory }>()
)

// Receive New part
export const invokeReceivePartAPI = createAction(
  '[Part API] Invoke receive new part api',
  props< { quantity: number, id:number }>()
)

export const receivePartAPISuccess = createAction(
  '[Part API] receive new part api success',
  props< { receivePart: Inventory }>()
)

//Consume part
export const invokeConsumePartAPI = createAction(
  '[Part API] Invoke consume new part api',
  props< { quantity: number, id:number }>()
)

export const consumePartAPISuccess = createAction(
  '[Part API] consume new part api success',
  props< { consumePart: Inventory }>()
)

export class InventoryAction {
}
