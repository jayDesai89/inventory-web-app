import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inventory } from './store/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  baseURL = 'http://localhost:9001/parts';

  constructor(private http: HttpClient) { }

  // Get all inventory
  getInventory() {
    return this.http.get<Inventory[]>(`${this.baseURL}`)
  }

  createPart(payload: Inventory) {
    return this.http.post<Inventory>(`${this.baseURL}`, payload)
  }

  updatePart(payload: Inventory) {
    return this.http.put<Inventory>(`${this.baseURL}/${payload.id}`, payload);
  }

  receivePart(quantity: number, id: number){
    return this.http.put<Inventory>(`${this.baseURL}/${id}/receive`,{quantity});
  }

  consumePart(quantity: number, id: number){
    return this.http.put<Inventory>(`${this.baseURL}/${id}/consume`,{quantity});
  }

}
