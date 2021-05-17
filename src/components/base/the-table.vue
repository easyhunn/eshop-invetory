<template>
  <div class="h-table" ref="Table">
    <div class="h-table-header">
      <div class="h-cell flex-center" style="min-width:38px; max-width:38px;">
        <input type="checkbox" v-on:change="selectAllItem" ref="SelectAll"/>
      </div>

      <div class="cell-contain" style="min-width:100px; max-width:100px;">
        <div class="h-cell">
          <div class="title">
            Mã SKU
          </div>
          <div class="filter">
            <a
              class="filter-type-selected"
              v-on:click="showFilterType.SKUCode = true"
            >
              {{ selectedFilter.SKUCodeType }}
            </a>
            <input type="text" class="filter-content" 
              v-model="selectedFilter.SKUCode"
              @keyup.enter="updateFilterType"
              @keyup.tab="updateFilterType"
            />
            <div
              class="mask"
              v-on:click="showFilterType.SKUCode = false"
              v-if="showFilterType.SKUCodeType"
            ></div>
          </div>
        </div>
        <ul class="filter-combo" v-if="showFilterType.SKUCode">
          <li class="filter-type" v-on:click="changeFilterType('*', 1)">
            * : Chứa
          </li>
          <li class="filter-type" v-on:click="changeFilterType('=', 1)">
            = : Bằng
          </li>
          <li class="filter-type" v-on:click="changeFilterType('+', 1)">
            + : Bắt đầu bằng
          </li>
          <li class="filter-type" v-on:click="changeFilterType('-', 1)">
            - : Kết thúc bằng
          </li>
          <li class="filter-type" v-on:click="changeFilterType('!', 1)">
            ! : Không chứa
          </li>
        </ul>
      </div>
      <div
        class="cell-contain"
        style="min-width:230px; width:calc(100vw - 956px);"
      >
        <div class="h-cell">
          <div class="title">
            Tên hàng hoá
          </div>
          <div class="filter">
            <a
              class="filter-type-selected"
              v-on:click="showFilterType.InventoryName = true"
            >
              {{ selectedFilter.InventoryNameType }}
            </a>
            <input type="text" class="filter-content" 
              v-model="selectedFilter.InventoryName"
              @keyup.enter="updateFilterType"
              @keyup.tab="updateFilterType"/>
          </div>
        </div>
        <ul class="filter-combo" v-if="showFilterType.InventoryName">
          <li class="filter-type" v-on:click="changeFilterType('*', 2)">
            * : Chứa
          </li>
          <li class="filter-type" v-on:click="changeFilterType('=', 2)">
            = : Bằng
          </li>
          <li class="filter-type" v-on:click="changeFilterType('+', 2)">
            + : Bắt đầu bằng
          </li>
          <li class="filter-type" v-on:click="changeFilterType('-', 2)">
            - : Kết thúc bằng
          </li>
          <li class="filter-type" v-on:click="changeFilterType('!', 2)">
            ! : Không chứa
          </li>
        </ul>
      </div>
      <div
        class="mask"
        v-on:click="showFilterType.InventoryName = false"
        v-if="showFilterType.InventoryName"
      ></div>
      <div class="cell-contain" style="min-width:130px; max-width:130px;">
        <div class="h-cell">
          <div class="title">
            Nhóm hàng hoá
          </div>
          <div class="filter">
            <a
              class="filter-type-selected"
              v-on:click="showFilterType.InventoryGroup = true"
            >
              {{ selectedFilter.InventoryGroupType }}
            </a>

            <input type="text" class="filter-content" 
            @keyup.enter="updateFilterType"
            @keyup.tab="updateFilterType"
            v-model="selectedFilter.InventoryGroup"/>
          </div>
        </div>
        <ul class="filter-combo" v-if="showFilterType.InventoryGroup">
          <li class="filter-type" v-on:click="changeFilterType('*', 3)">
            * : Chứa
          </li>
          <li class="filter-type" v-on:click="changeFilterType('=', 3)">
            = : Bằng
          </li>
          <li class="filter-type" v-on:click="changeFilterType('+', 3)">
            + : Bắt đầu bằng
          </li>
          <li class="filter-type" v-on:click="changeFilterType('-', 3)">
            - : Kết thúc bằng
          </li>
          <li class="filter-type" v-on:click="changeFilterType('!', 3)">
            ! : Không chứa
          </li>
        </ul>
      </div>
      <div
        class="mask"
        v-on:click="showFilterType.InventoryGroup = false"
        v-if="showFilterType.InventoryGroup"
      ></div>

      <div class="cell-contain" style="min-width:100px; max-width:100px;">
        <div class="h-cell">
          <div class="title">
            Đơn vị tính
          </div>
          <div class="filter">
            <a
              class="filter-type-selected"
              v-on:click="showFilterType.Unit = true"
            >
              {{ selectedFilter.UnitType }}
            </a>

            <input type="text" class="filter-content" 
            @keyup.enter="updateFilterType"
            @keyup.tab="updateFilterType"
            v-model="selectedFilter.Unit"/>
          </div>
        </div>
        <ul class="filter-combo" v-if="showFilterType.Unit">
          <li class="filter-type" v-on:click="changeFilterType('*', 4)">
            * : Chứa
          </li>
          <li class="filter-type" v-on:click="changeFilterType('=', 4)">
            = : Bằng
          </li>
          <li class="filter-type" v-on:click="changeFilterType('+', 4)">
            + : Bắt đầu bằng
          </li>
          <li class="filter-type" v-on:click="changeFilterType('-', 4)">
            - : Kết thúc bằng
          </li>
          <li class="filter-type" v-on:click="changeFilterType('!', 4)">
            ! : Không chứa
          </li>
        </ul>
        <div
          class="mask"
          v-on:click="showFilterType.Unit = false"
          v-if="showFilterType.Unit"
        ></div>
      </div>
      <div class="cell-contain" style="min-width:105px; max-width:105px;">
        <div class="h-cell">
          <div class="title">
            Giá bán TB
          </div>
          <div class="filter">
            <a
              class="filter-type-selected"
              v-on:click="showFilterType.AveragePrice = true"
            >
              {{ selectedFilter.SalePriceType }}
            </a>
            <CurrencyInput type="text" class="filter-content"
              @onKeyup="setFilterPrice"
              @onKeyupEnter="updateFilterType"
              @onKeyupTab="updateFilterType"
            />
            <!-- <input type="text" class="filter-content" 
            @keyup.enter="updateFilterType"
            @keyup.tab="updateFilterType"
            v-model="selectedFilter.SalePrice"/> -->
          </div>
        </div>
        <ul
          class="filter-combo"
          style="width: 157px"
          v-if="showFilterType.AveragePrice"
        >
          <li class="filter-type" v-on:click="changeFilterType('=', 5)">
            = : Bằng
          </li>
          <li class="filter-type" v-on:click="changeFilterType('<', 5)">
            &lt; : Nhỏ hơn
          </li>
          <li class="filter-type" v-on:click="changeFilterType('≤ ', 5)">
            ≤ : Nhỏ hơn hoặc bằng
          </li>
          <li class="filter-type" v-on:click="changeFilterType('>', 5)">
            &gt; : Lớn hơn
          </li>
          <li class="filter-type" v-on:click="changeFilterType('≥', 5)">
            ≥ : Lớn hơn hoặc bằng
          </li>
        </ul>
        <div
          class="mask"
          v-on:click="showFilterType.AveragePrice = false"
          v-if="showFilterType.AveragePrice"
        ></div>
      </div>

      <div class="h-cell" style="min-width:174px; max-width:174px;">
        <div class="title">
          Hiển thị trên MH bán hàng
        </div>
        <div class="filter">
          <select
            v-model="selectedFilter.Display"
            @change="updateFilterType"
            name=""
            id=""
            class="filter-content"
          >
            <option value=-1>Tất cả</option>
            <option value="1">Có</option>
            <option value="0">Không</option>
          </select>
        </div>
      </div>
      <div class="h-cell" style="min-width:119px; max-width:119px;">
        <div class="title">
          Loại hàng hoá
        </div>
        <div class="filter">
          <select
            name=""
            id=""
            class="filter-content"
          >
            <option value="3">Tất cả</option>
            <option value="1">Hàng hoá</option>
            <option value="0">Combo</option>
            <option value="2">Dịch vụ</option>

          </select>
        </div>
      </div>
      <div class="h-cell" style="min-width:119px; max-width:119px;">
        <div class="title">
          Quản lý theo
        </div>
        <div class="filter">
          <select
            class="filter-content"
          >
            <option value="-1">Tất cả</option>
            <option value="1">Lô/Hạn sử dụng</option>
            <option value="0">Khách</option>
          </select>
        </div>
      </div>
      <div class="h-cell" style="min-width:134px; max-width:134px;">
        <div class="title">
          Trạng thái
        </div>
        <div class="filter">
          <select
            v-model="selectedFilter.Status"
            @change="updateFilterType"
            name=""
            id=""
            class="filter-content"
          >
            <option value="-1">Tất cả</option>
            <option value="1">Đang hoạt đông</option>
            <option value="0">Ngừng hoạt động</option>
          </select>
        </div>
      </div>
    </div>
    <div class="h-table-body">
      <div ref="noContent" class="no-content">Không có dữ liệu</div>
      <table ref="Table">
        <tbody ref="Tbody">
          <tr class="h-row" v-for="(inventory, i) in inventories" :key="i" 
                                    v-on:click="onRowSelect(inventory.InventoryId, inventory.InventoryName)"
                                    v-on:dblclick="onRowDblClick(inventory.InventoryId)" 
                                    name="Bánh đậu xanh" :id="inventory.InventoryId">
            <td class="flex-center" style="min-width:18px; max-width:18px; margin-left: -1px">
              <input type="checkbox"
                v-on:change="checkBoxSelected(inventory.InventoryId, 'bánh đậu xanh', $event.target.checked)"
                :value="inventory.InventoryId"
              />
            </td>
            <td style="min-width:79px; max-width:79px;">{{inventory.SKUCode}}</td>
            <td
              v-on:click="onRowDblClick(inventory.InventoryId)"
              style="min-width:209px; 
                      flex-basis:calc(100vw - 1158px); 
                      flex-grow: 0; 
                      flex-shrink: 0;
                      cursor:pointer;"
            >
              <a style="color:#636dde">
                {{inventory.InventoryName}}
              </a>
            </td>
            <td style="min-width:109px; max-width:109px;">
              {{inventory.InventoryGroup}}
            </td>
            <td style="min-width:79px; max-width:79px;">
              {{inventory.Unit}}
            </td>
            <td class="text-align-right" style="min-width:84px; max-width:84px;" :title="inventory.SalePrice | formatMoney">
              {{inventory.SalePrice | formatMoney}}
            </td>
            <td style="min-width:154px; max-width:154px;">
              {{inventory.Display == 1 ? "có" : "không"}}
            </td>
            <td style="min-width:99px; max-width:99px;">
              Hàng hoá
            </td>
            <td style="min-width:99px; max-width:99px;">
              Khác
            </td>
            <td style="min-width:112px; max-width:112px;">
              {{inventory.Status == 1 ? "Đang hoạt động" : "Ngừng hoạt động"}}
            </td>
          </tr>
          <!-- <tr class="h-row"  v-on:click="onRowSelect('2', 'bánh đậu đỏ')" name="Bánh đậu xanh" id="2">
            <td class="flex-center" style="min-width:18px; max-width:18px; margin-left: -1px">
              <input type="checkbox" 
                :checked="false"
                
                v-on:change="checkBoxSelected('2', 'bánh đậu đỏ', $event.target.checked)"/>
            </td>
            <td style="min-width:79px; max-width:79px;"></td>
            <td
              style="min-width:209px; flex-basis:calc(100vw - 1158px); flex-grow: 0; flex-shrink: 0"
            >
              Bánh đậu đỏ
            </td>
            <td style="min-width:109px; max-width:109px;">
              something 1
            </td>
            <td style="min-width:79px; max-width:79px;">
              something 2
            </td>
            <td style="min-width:84px; max-width:84px;">
              something 3
            </td>
            <td style="min-width:154px; max-width:154px;"></td>
            <td style="min-width:99px; max-width:99px;"></td>
            <td style="min-width:99px; max-width:99px;"></td>
            <td style="min-width:112px; max-width:112px;"></td>
          </tr> -->
        </tbody>
      </table>
      <ALertWarning 
      style="z-index: 20;"
      :SKUCode="errorMsg"
      v-show="showAlertWarning" 
      :closeAlert="hideAlertWarning"/>
    </div>
  </div>
</template>
<style scoped lang="scss">
.h-table {
  width: calc(100% + 1px);
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}
.no-content {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 30px;
  color: #dddd;
}
.mask {
  position: fixed;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
}
.h-table-header {
  width: 100%;
  height: 64px;
  display: flex;
  background-color: #eaeff4;
}
.h-table-header .h-cell {
  display: flex;
  flex-direction: column;
  border-left: 1px solid #e1e1e1;
  background: #f0f0f0;
}
.h-table-header .h-cell:hover {
  background-color: transparent;
}
.h-cell .title {
  font-family: Roboto-bold;
  padding: 7px 10px 6px;
  white-space: nowrap;
  color: #212121;
  font-weight: 700;
  text-align: center;
}
.h-cell .filter {
  display: flex;
  background-color: white;
}

.filter .filter-type-selected {
  background-color: white;
  padding: 7px 13px;
  cursor: pointer;
  border: 1px solid #e1e1e1;
  text-align: center;
  margin-left: 2px;
}

.filter-combo {
  position: relative;
  left: 0;
  top: 0;
  z-index: 3;
  width: 122px;
  box-shadow: 2px 2px 8px 3px #ccc;
  padding: 0px;
}
.filter-combo .filter-type {
  list-style-type: none;
  background-color: white;
  height: 32px;
  line-height: 32px;
  padding-left: 20px;
  cursor: pointer;
}
.filter-combo .filter-type:hover {
  background-color: #6b6f9d;
}
.filter .filter-content {
  border: 1px solid #e1e1e1;
  outline: none;
  margin-right: 2px;
  margin-left: 1px;
  width: 100%;
  padding: 5px 10px;
}
.filter select {
  height: 33px;
}
.h-table-body {
  margin-left: 1px;
  background-color: white;
  width: calc(100vw - 168px);
  min-width: 1253px;
  height: calc(100% - 64px);
  overflow-y: auto;
  overflow-x: hidden;
}
.h-table-body .h-row {
  display: flex;

  /* background-color: #e5e6eb; */
}
.h-table-body tr {
  width: calc(100vw - 150px);
  height: 32px;
}
</style>
<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import {InventoryFilter} from "../../store/inventory-filter";
import {InventoryStore} from "../../store/inventory";
import CurrencyInput from "./currency-input.vue";
import ALertWarning from "./alert-warning.vue";
import MISA_CODE from "../../core/consts/misa-code";

export default Vue.extend({
  name: "Table",
  data: () => {
    return {
      filterCategories: {
        storeCode: "",
        storeName: "",
        address: "",
        phoneNumber: "",
        status: "3",
      },
      //Kiểu lọc của filter đã chọn
      selectedFilter: {
        SKUCodeType: "*",
        SKUCode: "",
        InventoryNameType: "*",
        InventoryName: "",
        InventoryGroupType: "*",
        InventoryGroup: "",
        UnitType: "*",
        Unit: "",
        SalePriceType: "<",
        SalePrice: -1,
        Display: -1,
        Status: -1
      } ,
      // Hiện danh sách thuộc tính lọc của kiểu chọn 
      showFilterType: {
        SKUCode: false,
        InventoryName: false,
        InventoryGroup: false,
        Unit: false,
        AveragePrice: false,
      },
      showAlertWarning: false,
      startPosition: 0,
      pageSize: 15,
      pageIndex: 1,
      totalPage: 0,
      totalRecord: 0,
      selectedRow: "",
      ItemNameSelected: "",
      listIdSelected: [""],
    };
  },
  components: {
    CurrencyInput,
    ALertWarning
  },
  methods: {
    // Hiện cảnh báo
    //Created By: VM Hùng (17/05/2021)
    displayAlertWaring () {
      this.showAlertWarning = true;
    },
    // Ẩn cảnh báo
    //Created By: VM Hùng (17/05/2021)
    hideAlertWarning () {
      this.showAlertWarning = false;
      this.$store.commit("setSuccessStatus", true);
    },
    onRowDblClick(inventoryId:string) {
      InventoryStore.commit("setInventoryId", inventoryId);
      this.$emit("rowDblClick")
    },
    //Cài lại giá trị lọc của giá TB
    //Created By: VM Hùng (17/05/2021)
    setFilterPrice(value:any) {
      if (!value) this.selectedFilter.SalePrice = -1;
      this.selectedFilter.SalePrice = value;
    },
    //chọn tất cả hàng hoá hiển thị
    // Created By: VM Hùng (16/05/2021)
    selectAllItem() {
      let source = this.$refs.SelectAll as HTMLInputElement;
      var checkboxes = document.querySelectorAll('input[type="checkbox"]') ;
      try {
        for (var i = 1; i < checkboxes.length; i++) {
          let checkbox = checkboxes[i] as HTMLInputElement;
          checkbox.checked = source.checked;
          this.checkBoxSelected(checkbox.value, "", checkbox.checked);
        }
      } catch (e) {
        console.log(e);
      }
    },
    //Thay đổi kiểu lọc
    //<param>
    // type: kiểu lọc
    // order: vị trí phần từ cần lọc trong đối tượng
    //</param>
    //Created By: VM Hùng (14/05/2021)

    changeFilterType(type: string, order: number) {
      switch (order) {
        case 1:
          this.showFilterType.SKUCode = false;
          this.selectedFilter.SKUCodeType = type;
          break;
        case 2:
          this.showFilterType.InventoryName = false;
          this.selectedFilter.InventoryNameType = type;
          break;
        case 3:
          this.showFilterType.InventoryGroup = false;
          this.selectedFilter.InventoryGroupType = type;
          break;
        case 4:
          this.showFilterType.Unit = false;
          this.selectedFilter.UnitType = type;
          break;
        case 5:
          this.showFilterType.AveragePrice = false;
          this.selectedFilter.SalePriceType = type;
          break;
      }
      this.updateFilterType();
    },
    //Cập nhật kiểu lọc 
    //Created By: VM Hùng (14/05/2021)
    updateFilterType() {
      // Chuyển trang cần lọc về 1
      InventoryFilter.commit("setPageIndex", 1);
      InventoryFilter.commit("setFilterProperties", this.selectedFilter);
      this.$store.dispatch("getByPaging");
    },
    //Khi hàng được chọn
    //Created By: VM Hùng (15/05/2021)

    onRowSelect (id:string, name:string) {

      //Kiểm trong list selected
      if (!this.listIdSelected.includes(this.selectedRow)) {
        //Xóa hiệu ứng selected từ hàng cũ
        try {
          if (this.selectedRow) {
            var rowSelected = document.getElementById(this.selectedRow) as HTMLTableRowElement;
            if (rowSelected.rowIndex % 2 == 0)
              rowSelected.style.backgroundColor = "#fff";
            else 
              rowSelected.style.backgroundColor = "#f6f6f6";
          }
        } catch (e) {
          console.log(e);
        }
      }
      //chọn hàng
      this.rowSelect(id, name);
      
    },
     //Sự kiện khi hàng đã được chọn
    // Created By: VM Hùng (14/04/2021)
    rowSelect (id:string, name:string) {
      //selected hàng mới
      
      this.selectedRow = id;
      this.ItemNameSelected = name; 
      var rowSelect = document.getElementById(id);
      if (rowSelect)
        rowSelect.style.backgroundColor = "#E2E4F1";
    },
    // Khi ô check bõ được chọn
    checkBoxSelected (id:string, name:string, source:any) {
      var rowSelect = document.getElementById(id);
      // Nếu ô check box trạng thái chọn
      //đổi màu => thêm vào danh sahcs những id được chọn
      try {
        if (source) {
          //Thêm id vào danh sách các hàng hoá được chọn
          this.listIdSelected.push(id);
          this.$store.commit("addSelectedId", id);
          if (rowSelect) rowSelect.style.backgroundColor = "#E2E4F1";
        } else {
          // xoá hàng hoá khỏi list id được chon
          let index = this.listIdSelected.indexOf(id);
          if (index > -1) {
            this.listIdSelected.splice(index, 1);
          }
          this.$store.commit("removeSelectedId", id);
          var rowSelecte = document.getElementById(id) as HTMLTableRowElement;
          if (rowSelecte.rowIndex % 2 == 0)
            rowSelecte.style.backgroundColor = "#fff";
          else 
            rowSelecte.style.backgroundColor = "#f6f6f6";

        }
      } catch(e) {
        console.log(e);
      }
    },
    //Tải dữ liệu
    //Created By: MV Hùng(15/5/2021)
    async loadData() {
      await this.$store.dispatch("getByPaging");
    }
  },
  updated: function () {
    this.selectedRow = "";
    let tbody = this.$refs.Tbody as HTMLTableElement;
    let firstRow = tbody.children[0] as HTMLElement;
    if (firstRow) {
      firstRow.click();
    }
  },
  created: function () {
      this.loadData();
  },
  computed: {
    ...mapGetters({
      inventories: "inventories",
      success: "success",
      errorMsg: "errorMsg"
    }),
  },
  watch: {
    //Khi hàng được chọn thay đổi
    //Created By: VM Hùng (15/05/2021)
    selectedRow() {
      InventoryStore.commit("setInventoryId", this.selectedRow);
      InventoryStore.commit("setInventoryName", this.ItemNameSelected);

    },
    // Kiểm tra lấy dữ liệu thành công
    //Created By: VM Hùng (15/05/2021)
    success() {
      if (!this.success) {
        if (this.$store.state.errorCode == MISA_CODE.BAD_REQUEST) this.displayAlertWaring();
      }
    },
  }
});
</script>
