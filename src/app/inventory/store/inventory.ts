export interface Inventory {
  id?: number,
  cost: number,
  partNumber: string,
  name: string,
  description: string,
  isActive: boolean,
  image: Object,
  inStock: number,
  _id?: string,
  notes?: string
}
