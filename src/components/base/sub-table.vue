<template>
  <div class="table">
    <div class="t-header">
      <div
        style="max-width:calc(100% - 605px); min-width:364px; border-left:none"
      >
        Tên hàng hoá
      </div>
      <div style="max-width:128px; min-width:128px">Mã SKU</div>
      <div style="max-width:128px; min-width:128px">Mã vạch</div>
      <div style="max-width:78px; min-width:78px">Giá mua</div>
      <div style="max-width:118px; min-width:118px">Giá bán</div>
      <div style="max-width:28px; min-width:28px"></div>
    </div>
    <div class="t-body">
      <table>
        <tr v-for="(Inventory, i) in inventoriesDetail" :key="i">
          <td
            class="edit-able"
            style="min-width:363px; flex-basis:calc(100% - 605px); flex-grow: 0; flex-shrink: 0"
          >
            {{ Inventory.InventoryName }}
            <input
              type="text"
              v-model="Inventory.InventoryName"
              class="hidden-input d-input"
            />
          </td>
          <td class="edit-able" style="max-width:128px; min-width:128px">
            {{ Inventory.SKUCode }}
            <input
              type="text"
              v-model="Inventory.SKUCode"
              class="hidden-input d-input"
            />
          </td>
          <td class="edit-able" style="max-width:128px; min-width:128px">
            1234
          </td>
          <td class="edit-able" style="max-width:78px; min-width:78px">
            {{ Inventory.PurchasePrice }}
            <input
              type="number"
              v-model="Inventory.PurchasePrice"
              class="hidden-input d-input"
            />
          </td>
          <td class="edit-able" style="max-width:118px; min-width:118px">
            {{ Inventory.SalePrice }}
            <input
              type="number"
              v-model="Inventory.SalePrice"
              class="hidden-input d-input"
            />
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
      background-color: #e2e4ef;
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
import Vue from "vue";
import { mapGetters } from "vuex";
import Table from "./the-table.vue";
import InventoryItem from "../../models/inventory-item";
import CommonFuncion from "../../services/common";
export default Vue.extend({
  data: function() {
    return {
      InventoryItems: [] as Array<InventoryItem>,
    };
  },
  props: {
    ParentInventoryItem: { type: Object as () => InventoryItem },
    formType: {type: Number}
  },
  components: { Table },
  methods: {
    createInventoryByColor(color:string) {
      let colorEnglish = CommonFuncion.removeVietnameseTones(color);
        let prefix = CommonFuncion.getFirstLetter(colorEnglish).toUpperCase();
        if (prefix.length < 2) {
          prefix += CommonFuncion.getFirstLetter(
            colorEnglish.substring(1)
          ).toUpperCase();
        }
        // Tạo mới 1 thông tin hàng hoá
        let InventoryItemWithProperty: InventoryItem = {
          InventoryName: "",
        };
        Object.assign(InventoryItemWithProperty, this.ParentInventoryItem);
        InventoryItemWithProperty.InventoryId = "00000000-0000-0000-0000-000000000000";
        InventoryItemWithProperty.InventoryName += " (" + color + ")";
        InventoryItemWithProperty.SKUCode += "-" + prefix;
        InventoryItemWithProperty.Prefix = prefix;
        InventoryItemWithProperty.Color = color;
        return InventoryItemWithProperty;
    }
  },
 
  created: function() {
    // Lấy thông tin hàng hoá chi tiết có sẵn
    
    //Khi thông tin thuộc tính màu sắc nhập vào thay đổi
    //Created By: VM Hùng (04/09/2021)
    this.$root.$on("newColorInput", (e: Array<string>) => {
      this.InventoryItems = [];
      // Nếu thêm mới
      if (e.length > this.$store.state.inventoriesDetail.length) {
          let color = e[e.length - 1];  
          let inventoryItem = this.createInventoryByColor(color);
          this.$store.commit("insertInventoryDetail", inventoryItem);
      } else {
        // Xoá màu
        this.$store.dispatch("DeleteInventoryDetailByColor", e);
      }
      // create list sub invetory item with properti
      e.forEach((color, i) => {
        // Lấy tiền tố của màu sắc
        let inventoryItem = this.createInventoryByColor(color);
        this.InventoryItems.push(inventoryItem);
        
      });
    });
  },
  
  computed:{
    ...mapGetters({
      inventoriesDetail: "inventoriesDetail",
    }),
  },

  watch: {
    "InventoryItem.InventoryName"() {
      console.log("calling")
      this.$store.dispatch("UpdateInventoriesDetailName", this.ParentInventoryItem.InventoryName)
    },
    "InventoryItem.InventoryItemCode"() {
      this.InventoryItems.forEach((e) => {
        e.SKUCode =
          this.ParentInventoryItem.SKUCode + "-" + e.Prefix;
      });
    },
    
  },
});
</script>
