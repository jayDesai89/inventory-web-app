import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, StoreModule } from '@ngrx/store';
import { inventoryReducer } from './store/inventory.reducer';
import { EffectsModule } from '@ngrx/effects';
import { InventoryEffect } from './store/inventory.effect';
import { InventoryRoutingModule } from './inventory-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Router, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';




@NgModule({
  declarations: [DashboardComponent, AddComponent, EditComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    InventoryRoutingModule,
    StoreModule.forFeature('partsInventory', inventoryReducer),
    EffectsModule.forFeature([InventoryEffect])
  ],
  exports: [DashboardComponent]
})
export class InventoryModule { }
