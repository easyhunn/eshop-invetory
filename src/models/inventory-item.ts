export default interface Inventory {
  InventoryId?: string;
  InventoryName: string;
  InventoryGroup?: string;
  SKUCode?: string;
  PurchasePrice?: number;
  SalePrice?: number;
  Status?: number; 
  Unit?: string;
  Display?:  number;
  Suffix?: string;
  Color?: string,
  ParentId?: string
}
