export default interface Iventory {
  InventoryId?: string;
  InventoryName: string;
  InventoryGroup?: string;
  SKUCode?: string;
  PurchasePrice?: number;
  SalePrice?: number;
  Status?: number; 
  Unit?: string;
  Display?:  number;
  Prefix?: string;
  Color?: string,
  ParentId?: string
}
