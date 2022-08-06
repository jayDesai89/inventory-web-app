import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Inventory } from '../store/inventory';
import {
  invokeConsumePartAPI,
  invokeInventoryAPI,
  invokeReceivePartAPI,
} from '../store/inventory.action';
import { selectInventory, selectPartById } from '../store/inventory.selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  parts$ = this.store.pipe(select(selectInventory));
  numOfParts: number;
  display: boolean = false;
  inStockQuantity: number;
  isEditing: boolean = false;
  enableEditIndex = null;
  consume: boolean = false;
  receive: boolean = false;
  anything: string = 'Save';

  constructor(private store: Store, private appStore: Store<Appstate>) {}

  partForm: Inventory = {
    id: 0,
    cost: 0,
    partNumber: '',
    description: '',
    name: '',
    notes: '',
    inStock: 20,
    image: {},
    isActive: true,
  };

  ngOnInit(): void {
    this.store.dispatch(invokeInventoryAPI());

    // Get Total number of parts
    this.parts$.subscribe((data) => {
      this.numOfParts = data.reduce(
        (previousValue, currentValue) => previousValue + currentValue.inStock,
        0
      );
    });
  }

  // Toggle form field for individual row of the table
  switchEditMode(i) {
    this.isEditing = true;
    this.enableEditIndex = i;
  }

  // Upon plus(receive) sign button click
  receivePart(id, index) {
    this.receive = true;
    this.anything = 'Receive';
    this.switchEditMode(index);
  }

  // Upon minus(Consuming) sign button click
  consumePart(id, index) {
    this.consume = true;
    this.anything = 'Consume';
    this.switchEditMode(index);
  }

  // Upon close button click
  closeField() {
    this.enableEditIndex = null;
  }

  // Reset all the flags used for UI (Yes, It can be better)
  resetFlags() {
    this.receive = false;
    this.consume = false;
    this.inStockQuantity = null;
    this.enableEditIndex = null;
  }

  // Upon Save button click
  updateInStock(id) {
    // Fetch all stored data of form
    let fetchdata$ = this.store.pipe(select(selectPartById(id)));
    fetchdata$.subscribe((data) => {
      if (data) {
        this.partForm = { ...data };
      }
    });

    // Condition based API call for Receiving and Consuming
    if (this.receive) {
      this.store.dispatch(
        invokeReceivePartAPI({ quantity: this.inStockQuantity, id: id })
      );
    } else if (this.consume) {
      this.store.dispatch(
        invokeConsumePartAPI({ quantity: this.inStockQuantity, id: id })
      );
    }

    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    // Re-set the api status
    apiStatus$.subscribe((appState) => {
      if (appState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
      }
    }),
      catchError((err) => {
        return throwError(err);
      });
    this.resetFlags();
  }
}
