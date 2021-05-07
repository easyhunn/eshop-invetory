<template>
  <div class="h-table" ref="Table">
    <div class="h-table-header">
      <div class="h-cell flex-center" style="min-width:38px; max-width:38px;">
        <input type="checkbox" />
      </div>

      <div class="cell-contain" style="min-width:100px; max-width:100px;">
        <div class="h-cell">
          <div class="title">
            Mã SKU
          </div>
          <div class="filter">
            <a
              class="filter-type-selected"
              v-on:click="showFilterType.InvetoryItemCode = true"
            >
              {{ selectedFilterType.InvetoryItemCode }}
            </a>
            <input type="text" class="filter-content" />
            <div
              class="mask"
              v-on:click="showFilterType.InvetoryItemCode = false"
              v-if="showFilterType.InvetoryItemCode"
            ></div>
          </div>
        </div>
        <ul class="filter-combo" v-if="showFilterType.InvetoryItemCode">
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
              v-on:click="showFilterType.IventoryItemName = true"
            >
              {{ selectedFilterType.IventoryItemName }}
            </a>
            <input type="text" class="filter-content" />
          </div>
        </div>
        <ul class="filter-combo" v-if="showFilterType.IventoryItemName">
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
        v-on:click="showFilterType.IventoryItemName = false"
        v-if="showFilterType.IventoryItemName"
      ></div>
      <div class="cell-contain" style="min-width:130px; max-width:130px;">
        <div class="h-cell">
          <div class="title">
            Nhóm hàng hoá
          </div>
          <div class="filter">
            <a
              class="filter-type-selected"
              v-on:click="showFilterType.IventoryItemGroup = true"
            >
              {{ selectedFilterType.IventoryItemGroup }}
            </a>

            <input type="text" class="filter-content" />
          </div>
        </div>
        <ul class="filter-combo" v-if="showFilterType.IventoryItemGroup">
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
        v-on:click="showFilterType.IventoryItemGroup = false"
        v-if="showFilterType.IventoryItemGroup"
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
              {{ selectedFilterType.Unit }}
            </a>

            <input type="text" class="filter-content" />
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
              {{ selectedFilterType.AveragePrice }}
            </a>

            <input type="text" class="filter-content" />
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
            v-model="filterCategories.status"
            name=""
            id=""
            class="filter-content"
          >
            <option value="3">Tất cả</option>
            <option value="1">Đang hoạt đông</option>
            <option value="0">Ngừng hoạt động</option>
          </select>
        </div>
      </div>
      <div class="h-cell" style="min-width:119px; max-width:119px;">
        <div class="title">
          Loại hàng hoá
        </div>
        <div class="filter">
          <select
            v-model="filterCategories.status"
            name=""
            id=""
            class="filter-content"
          >
            <option value="3">Tất cả</option>
            <option value="1">Đang hoạt đông</option>
            <option value="0">Ngừng hoạt động</option>
          </select>
        </div>
      </div>
      <div class="h-cell" style="min-width:119px; max-width:119px;">
        <div class="title">
          Quản lý theo
        </div>
        <div class="filter">
          <select
            v-model="filterCategories.status"
            name=""
            id=""
            class="filter-content"
          >
            <option value="3">Tất cả</option>
            <option value="1">Đang hoạt đông</option>
            <option value="0">Ngừng hoạt động</option>
          </select>
        </div>
      </div>
      <div class="h-cell" style="min-width:134px; max-width:134px;">
        <div class="title">
          Trạng thái
        </div>
        <div class="filter">
          <select
            v-model="filterCategories.status"
            name=""
            id=""
            class="filter-content"
          >
            <option value="3">Tất cả</option>
            <option value="1">Đang hoạt đông</option>
            <option value="0">Ngừng hoạt động</option>
          </select>
        </div>
      </div>
    </div>
    <div class="h-table-body">
      <div ref="noContent" class="no-content">Không có dữ liệu</div>
      <table>
        <tbody ref="tbody">
          <tr class="h-row">
            <td class="flex-center" style="min-width:18px; max-width:18px; margin-left: -1px">
              <input type="checkbox" />
            </td>
            <td style="min-width:79px; max-width:79px;"></td>
            <td
              style="min-width:209px; flex-basis:calc(100vw - 1158px); flex-grow: 0; flex-shrink: 0"
            >
              Bánh đậu xanh
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
          </tr>
          <tr class="h-row">
            <td class="flex-center" style="min-width:18px; max-width:18px; margin-left: -1px">
              <input type="checkbox" />
            </td>
            <td style="min-width:79px; max-width:79px;"></td>
            <td
              style="min-width:209px; flex-basis:calc(100vw - 1158px); flex-grow: 0; flex-shrink: 0"
            >
              Bánh đậu xanh
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
          </tr>
        </tbody>
      </table>
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

Vue.directive("click-outside", {
  bind: function(el: any, binding, vnode: any) {
    el.clickOutsideEvent = function(event: any) {
      // here I check that click was outside the el and his children
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unbind: function(el: any) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
});
export default Vue.extend({
  name: "Table",
  data: () => {
    return {
      stores: [],
      filterCategories: {
        storeCode: "",
        storeName: "",
        address: "",
        phoneNumber: "",
        status: "3",
      },
      selectedFilterType: {
        InvetoryItemCode: "*",
        IventoryItemName: "*",
        IventoryItemGroup: "*",
        Unit: "*",
        AveragePrice: "<",
      },
      showFilterType: {
        InvetoryItemCode: false,
        IventoryItemName: false,
        IventoryItemGroup: false,
        Unit: false,
        AveragePrice: false,
      },
      startPosition: 0,
      pageSize: 15,
      pageIndex: 1,
      totalPage: 0,
      totalRecord: 0,
    };
  },
  methods: {
    //Thay đổi kiểu lọc
    //<param>
    // type: kiểu lọc
    // order: vị trí phần từ cần lọc trong đối tượng
    //</param>
    changeFilterType(type: string, order: number) {
      switch (order) {
        case 1:
          this.showFilterType.InvetoryItemCode = false;
          this.selectedFilterType.InvetoryItemCode = type;
          break;
        case 2:
          this.showFilterType.IventoryItemName = false;
          this.selectedFilterType.IventoryItemName = type;
          break;
        case 3:
          this.showFilterType.IventoryItemGroup = false;
          this.selectedFilterType.IventoryItemGroup = type;
          break;
        case 4:
          this.showFilterType.Unit = false;
          this.selectedFilterType.Unit = type;
          break;
        case 5:
          this.showFilterType.AveragePrice = false;
          this.selectedFilterType.AveragePrice = type;
          break;
      }
    },
  },
});
</script>
