
export default interface InventoryFilter {
  InventoryName: string;
  InventoryNameType?: string;
  InventoryGroup?: string;
  InventoryGroupType?: string;
  SKUCode?: string;
  SKUCodeType?: string;
  PurchasePrice?: number;
  PurchasePriceType?: number;
  SalePrice?: number;
  SalePriceType?: string;
  Status?: number;
  Unit?: string;
  UnitType?: string;
  Display?:number;
}