export default interface IventoryItem {
  InventoryItemName: string;
  InventoryItemGroup?: string;
  InventoryItemCode?: string;
  PurchasePrice?: number;
  SalePrice?: number;
  Status?: number; 
  Unit?: string;
  Prefix?: string;
  Color?: string
}
