<template>
    <div class="table">
        <div class="t-header">
            <div style="max-width:calc(100% - 605px); min-width:364px; border-left:none">Tên hàng hoá</div>
            <div style="max-width:128px; min-width:128px">Mã SKU</div>
            <div style="max-width:128px; min-width:128px">Mã vạch</div>
            <div style="max-width:78px; min-width:78px">Giá mua</div>
            <div style="max-width:118px; min-width:118px">Giá bán</div>
            <div style="max-width:28px; min-width:28px"></div>
        </div>
        <div class="t-body">
            <table>
                <tr v-for="(Inventory,i) in InventoryItems" :key="i">
                    <td class="edit-able" style="min-width:363px; flex-basis:calc(100% - 605px); flex-grow: 0; flex-shrink: 0">
                        {{Inventory.InventoryItemName}}
                        <input type="text" 
                            v-model="Inventory.InventoryItemName" 
                            class="hidden-input d-input">
                    </td>
                    <td class="edit-able" style="max-width:128px; min-width:128px">
                        {{Inventory.InventoryItemCode}}
                        <input type="text" 
                            v-model="Inventory.InventoryItemCode" 
                            class="hidden-input d-input">
                    </td>
                    <td class="edit-able" style="max-width:128px; min-width:128px">1234</td>
                    <td class="edit-able" style="max-width:78px; min-width:78px">
                        {{Inventory.PurchasePrice}}
                        <input type="number" 
                            v-model="Inventory.PurchasePrice" 
                            class="hidden-input d-input">
                    </td>
                    <td class="edit-able" style="max-width:118px; min-width:118px">
                        {{Inventory.SalePrice}}
                        <input type="number" 
                            v-model="Inventory.SalePrice" 
                            class="hidden-input d-input">
                    </td>
                    <td class="edit-able" style="max-width:28px; min-width:28px">
                        <button class="d-icon icon-delete-red"></button>
                    </td>
                </tr>
                
            </table>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .table {
        width: 100%;
        min-height: 230px;
        max-height: 230px;
        overflow-x: auto;
        display: flex;
        flex-direction: column;
        border: 1px solid #d0d0d0;

    }
    .table {
        .t-header {
            display: flex;
            flex-direction: row;
            div {
                font-weight: 700;
                border-bottom: 1px solid #d0d0d0;
                border-left: 1px solid #d0d0d0;
                text-align: center;
                padding: 7px 10px 6px;
                background-color: #E2E4EF;
            }
        }
        td.edit-able {
            position: relative;
            .hidden-input {
                position: absolute;
                top: 0;
                left: 0;
                width: calc(100% - 22px);
                height: calc(100% - 12px);
                opacity: 0;
            }
            .hidden-input:focus {
                opacity: 1;
            }
        }
        td.edit-able:active {
            .hidden-input {
                display: block;
            }
        }
    }
</style>

<script lang="ts">
import Vue from 'vue'
import Table from './Table.vue'
import InventoryItem from "../../models/InventoryItem";
import CommonFuncion from "../../services/common";
export default Vue.extend({
    data: function () {
        return {
            InventoryItems: [] as Array<InventoryItem>
        }
    },
    props: {
        InventoryItem: {type: Object as () => InventoryItem}
    },
    components: { Table },
    watch: {
        "InventoryItem.InventoryItemName"() {
            this.InventoryItems.forEach(e => {
                e.InventoryItemName = this.InventoryItem.InventoryItemName + " (" + e.Color + ")";  
            })
        },
        "InventoryItem.InventoryItemCode"() {
            this.InventoryItems.forEach(e => {
                e.InventoryItemCode = this.InventoryItem.InventoryItemCode + "-" + e.Prefix;  
            })
        }
    },
    created: function () {
        //Khi thông tin thuộc tính màu sắc nhập vào thay đổi
        //Created By: VM Hùng (04/09/2021)
        this.$root.$on("newColorInput", (e:Array<string>) => {
            this.InventoryItems = [];
            // create list sub invetory item with properti
            e.forEach((color, i) => {
                let colorEnglish = CommonFuncion.removeVietnameseTones(color);
                let prefix = CommonFuncion.getFirstLetter(colorEnglish).toUpperCase();
                if (prefix.length < 2) {
                    prefix += CommonFuncion.getFirstLetter(colorEnglish.substring(1)).toUpperCase(); 
                }
                let InventoryItemWithProperty:InventoryItem = {InventoryItemName: ""};
                Object.assign(InventoryItemWithProperty, this.InventoryItem)
                InventoryItemWithProperty.InventoryItemName += " (" + color +")";
                InventoryItemWithProperty.InventoryItemCode += "-"+ prefix;
                InventoryItemWithProperty.Prefix = prefix;
                InventoryItemWithProperty.Color = color;
                this.InventoryItems.push(InventoryItemWithProperty);
            });
        })
    }
})
</script>