import { createReducer, on } from "@ngrx/store";
import { Inventory } from "./inventory";
import { consumePartAPISuccess, inventoryFetchAPISuccess, receivePartAPISuccess, saveNewPartAPISucess, updateNewPartAPIScuccess } from "./inventory.action";


export const initialstate: ReadonlyArray<Inventory> = []

export const inventoryReducer = createReducer(
  initialstate,
  on(inventoryFetchAPISuccess, (state, { allParts }) => {
    return allParts;
  }),

  on(saveNewPartAPISucess, (state, { newPart }) => {
    let newState = [...state];
    newState.unshift(newPart);
    return newState;
  }),

  on(updateNewPartAPIScuccess, (state, { updatePart }) => {
    let newState = state.filter((_) => _.id != updatePart.id);
    newState.unshift(updatePart);
    return newState;
  }),

  on(receivePartAPISuccess, (state, { receivePart }) => {
    let newState = state.filter((_) => _.id != receivePart.id);
    newState.unshift(receivePart);
    return newState;
  }),

  on(consumePartAPISuccess, (state, { consumePart }) => {
    let newState = state.filter((_) => _.id != consumePart.id);
    newState.unshift(consumePart);
    return newState;
  })
);
