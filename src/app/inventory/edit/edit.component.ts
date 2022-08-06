import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Inventory } from '../store/inventory';
import { invokeUpdateInventoryAPI } from '../store/inventory.action';
import { selectPartById } from '../store/inventory.selector';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<Appstate>
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

  ngOnInit(): void {
    // Get Id from route/URL
    let fetchData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        var id = Number(params.get('id'));
        return this.store.pipe(select(selectPartById(id)));
      })
    );
    // Fetch all stored form data for selected ID
    fetchData$.subscribe((data) => {
      if (data) {
        this.partForm = { ...data };
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  // Update part information
  updatePart() {
    // Dispatch action
    this.store.dispatch(
      invokeUpdateInventoryAPI({ updatePart: { ...this.partForm } })
    );
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    // Reset API status
    apiStatus$.subscribe((appState) => {
      if (appState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        this.router.navigate(['/']);
      }
    });
  }
}
