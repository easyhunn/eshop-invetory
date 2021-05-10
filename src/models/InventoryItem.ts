export default interface IventoryItem {
  InventoryItemName: string;
  InventoryItemGroup?: string;
  InventoryItemCode?: string;
  PurchasePrice?: number;
  SalePrice?: number;
  Status?: boolean; 
  Unit?: string;
  Prefix?: string;
  Color?: string
}
