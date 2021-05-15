export default interface Iventory {
  InventoryName: string;
  InventoryGroup?: string;
  SKUCode?: string;
  PurchasePrice?: number;
  SalePrice?: number;
  Status?: number; 
  Unit?: string;
  Display?:  number;
  Prefix?: string;
  Color?: string
}
