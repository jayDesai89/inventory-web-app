import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Inventory } from '../store/inventory';
import { invokeSaveNewPartAPI } from '../store/inventory.action';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router
  ) {}

  partForm: Inventory = {
    id: 0,
    cost: 0,
    partNumber: '',
    description: '',
    name: '',
    notes: '',
    inStock: 0,
    image: {},
    isActive: true,
  };

  ngOnInit(): void {}

  // Save part
  savePart() {
    // Dispatch action
    this.store.dispatch(invokeSaveNewPartAPI({ newPart: this.partForm }));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));

    // Reset API status
    apiStatus$.subscribe((appState) => {
      if (appState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        this.router.navigate(['']);
      }
    });
  }
}
