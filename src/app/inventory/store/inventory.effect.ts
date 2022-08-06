import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, pipe, throwError } from 'rxjs';
import {
  withLatestFrom,
  map,
  mergeMap,
  switchMap,
  catchError,
} from 'rxjs/operators';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Appstate } from 'src/app/shared/store/appstate';
import { InventoryService } from '../inventory.service';
import {
  consumePartAPISuccess,
  inventoryFetchAPISuccess,
  invokeConsumePartAPI,
  invokeInventoryAPI,
  invokeReceivePartAPI,
  invokeSaveNewPartAPI,
  invokeUpdateInventoryAPI,
  receivePartAPISuccess,
  saveNewPartAPISucess,
  updateNewPartAPIScuccess,
} from './inventory.action';
import { selectInventory } from './inventory.selector';

@Injectable()
export class InventoryEffect {
  constructor(
    private actions$: Actions,
    private inventoryService: InventoryService,
    private store: Store,
    private appStore: Store<Appstate>
  ) {}

  // Load all parts
  loadAllParts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeInventoryAPI),
      withLatestFrom(this.store.pipe(select(selectInventory))),
      mergeMap(([, inventoryFromStore]) => {
        if (inventoryFromStore.length > 0) {
          return EMPTY;
        }
        return this.inventoryService
          .getInventory()
          .pipe(map((data) => inventoryFetchAPISuccess({ allParts: data })));
      }),
      catchError((err) => {
        return throwError(err);
      })
    )
  );

  // Save new Part
  saveNewPart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeSaveNewPartAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.inventoryService.createPart(action.newPart).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveNewPartAPISucess({ newPart: data });
          })
        );
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  });

  // Update existing part
  updatePart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeUpdateInventoryAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.inventoryService.updatePart(action.updatePart).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return updateNewPartAPIScuccess({ updatePart: data });
          })
        );
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  });

  // Receive a part
  receivePart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeReceivePartAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.inventoryService
          .receivePart(action.quantity, action.id)
          .pipe(
            map((data) => {
              this.appStore.dispatch(
                setAPIStatus({
                  apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
                })
              );
              return receivePartAPISuccess({ receivePart: data });
            })
          );
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  });

  // Consume a part
  consumePart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeConsumePartAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.inventoryService
          .consumePart(action.quantity, action.id)
          .pipe(
            map((data) => {
              this.appStore.dispatch(
                setAPIStatus({
                  apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
                })
              );
              return consumePartAPISuccess({ consumePart: data });
            })
          );
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  });
}
