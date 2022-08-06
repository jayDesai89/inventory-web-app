import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Inventory } from "./inventory";


export const selectInventory = createFeatureSelector<Inventory[]>('partsInventory')

// Select a part with ID
export const selectPartById = (partId: number) =>
createSelector(selectInventory, (parts: Inventory[]) => {
  var partbyId = parts.filter((_) => _.id == partId);
  if(partbyId.length == 0) {
    return null;
  }
  return partbyId[0]
})
