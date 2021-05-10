<template>
  <div class="dialog">
    <div class="dialog-header">
      <button class="button-default btn-1">
        <div class="d-icon icon-save"></div>
        <div class="d-text">Lưu</div>
      </button>
      <button class="button-default btn-2">
        <div class="d-icon icon-duplicate-black"></div>
        <div class="d-text">Lưu và nhân bản</div>
      </button>
      <button class="button-default btn-2">
        <div class="d-icon icon-plus"></div>
        <div class="d-text">Lưu và thêm mới</div>
      </button>
      <button type="button" class="button-default btn-3" v-on:click="hideDialog">
        <div class="d-icon icon-x"></div>
        <div class="d-text">Hủy bỏ</div>
      </button>
    </div>
    <div class="dialog-container">
      <div class="contain-header">
        THÔNG TIN CƠ BẢN
      </div>
      <div class="dialog-row">
        <label for=""> Trạng thái Kinh doanh</label>
        <span class="group-radio">
          <input type="radio" name="status" v-model="InventoryItem.Status"/>
          <label for="tt">Đang kinh doanh</label>
        </span>
        <span class="group-radio">
          <input type="radio" name="status" v-model="InventoryItem.Status"/>
          <label for="tt">Ngừng hoạt động</label>
          
        </span>
      </div>
      <div class="dialog-row">
        <label for=""> Tên hàng hoá <span class="text-red">*</span> </label>
        <div class="input-group">
          <input ref="InventoryItemName" type="text" 
            v-model="InventoryItem.InventoryItemName" 
            v-on:blur="itemNameBlur">
          <div  ref="InventoryNameError" class="d-icon icon-exclamation"></div>
          <span class="input-required">
              {{InventoryError.InventoryName}}
          </span>
        </div>
      </div>
      <div class="dialog-row">
        <label for="">
          Nhóm hàng hoá
        </label>
        <AutocompleteInput style="z-index:11;" 
          :value="InventoryItem.InventoryItemGroup" 
          :suggestions="InventoryItemGroups"
          @input="(e) => InventoryItem.InventoryItemGroup = e"/>
      </div>
      <div class="dialog-row">
        <label for="">
          Mã SKU
        </label>
        <input type="text" placeholder="Hệ thống tự sinh khi bỏ trống" 
          v-model="InventoryItem.InventoryItemCode"
          v-on:blur="generateInvetoryItemCode"
          />
      </div>
      <div class="dialog-row">
        <label for="">
          Giá mua <span class="d-icon icon-question"></span>
        </label>
        <input type="text" v-model="InventoryItem.PurchasePrice" @keydown="inputPurchase"/>
      </div>
      <div class="dialog-row">
        <label for="">
          Giá bán
        </label>
        <input type="text" v-model="InventoryItem.SalePrice"/>
      </div>
      <div class="dialog-row">
        <label for="">
          Đơn vị tính 
        </label>
        <AutocompleteInput 
          :value="InventoryItem.Unit" 
          :suggestions="Units"
          @input="(e) => InventoryItem.Unit = e"/>
      </div>

      <div class="dialog-row">
        <input type="checkbox" />
        <span
          >Hiển thị trên màn hình bán hàng
          <span class="d-icon icon-question"></span
        ></span>
      </div>
      <div class="contain-header">
        THÔNG TIN THUỘC TÍNH
      </div>
      <div class="dialog-row">
        <label for="">
          Thuộc tính
        </label>
        <InputTag />
        <!-- <div class="input-group">
          
          
          <input style="min-width: 283px;" type="text" class="right-input-side" />
        </div> -->
      </div>
      <div class="dialog-row" v-show="showSubtable" style="max-height: 250px;">
        <label for="">
          Chi tiết thuộc tính
        </label>
         <SubTable :InventoryItem="InventoryItem" />
      </div>
      <div class="contain-header">
        THÔNG BỔ SUNG
      </div>
      <div class="dialog-row" style="max-height: 100px !important;">
        <label for="">
          Mô tả
        </label>
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </div>
      <div class="dialog-row">
        <label for="">
          Ảnh hàng hoá
        </label>
        <div class="img-aria">
          <div class="img-aria-left">
            <div class="symbol">Chưa có biểu tượng vui lòng quay lại sau...</div>
            <button class="button-edit">
              <div class="d-icon icon-pencil"></div>
              <div class="d-text">Biểu tượng</div>
            </button>
            <div class="d-icon icon-product"></div>
            <button class="load-img" v-on:click="chooseImg()">...</button>
            <input type="file" id="img" name="img" accept="image/*" style="display:none;">
          </div>
          <div class="img-aria-right">
            - Lựa chọn biểu tượng để thay thế nếu không có ảnh
            <br >
            - Định dạng ảnh (.jpg, .jpeg, .png, .gif) và dung lượng &lt; 5MB
          </div>
        </div>
      </div>
    </div>
    <div class="dialog-footer">
      <button class="button-default btn-1">
        <div class="d-icon icon-save"></div>
        <div class="d-text">Lưu</div>
      </button>
      <button class="button-default btn-2">
        <div class="d-icon icon-duplicate-black"></div>
        <div class="d-text">Lưu và nhân bản</div>
      </button>
      <button class="button-default btn-2">
        <div class="d-icon icon-plus"></div>
        <div class="d-text">Lưu và thêm mới</div>
      </button>
      <button type="button" class="button-default btn-3" v-on:click="hideDialog" v-on:keydown="reFocus">
        <div class="d-icon icon-x"></div>
        <div class="d-text">Hủy bỏ</div>
      </button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.img-aria {
  display: flex;
 
  .img-aria-left {
    position: relative;
    width: 198px;
    height: 178px;
    border: 1px dashed #636dde;
    margin-right: 10px;
    .symbol {
      width: 500px;
      height: 200px;
      position: absolute;
      background-color: white;
      box-shadow: 2px 2px 8px 3px #ccc;
      top: -210px;
      left: 100%;
      display: none;
    }
    .button-edit {
      position: absolute;
      right: 0px;
      height: 24px;
      padding: 7px;
      margin: 0 0 0 8px;
      outline: none !important;
      border: 1px solid #ebebeb;
      display: flex;
      border-radius: 3px;
      background-color: #fff;
      color: #aaa;
      cursor: pointer;
      align-items: center;
    }
    .icon-product {
      width: 50%;
      height: 50%;
      background-position: center;
      background-size: contain;
      position: absolute;

      top: 25%;
      left: 25%;
    }
    .load-img {
      position: absolute;
      width: 40px;
      height: 24px;
      padding: 7px;
      background-color: #2b3173;
      color: #fff;
      border-radius: 3px;
      outline: none !important;
      border: none ;
      font-weight: 600;
      font-size: 13px;
      top: calc(100% - 28px);
      left: 80px;
    }
  }
  .img-aria-right {
    color: #9e9e9e;
    font-style: italic;
  }
}
.dialog {
  position: fixed;
  z-index: 5;
  width: calc(100vw - 168px);
  height: calc(100vh - 73px);
  background-color: white;
  top: 60px;
  display: flex;
  flex-direction: column;
}
.dialog {
  .dialog-header {
    display: flex;
    width: 100%;
    padding: 8px;
  }
  .dialog-container {
    width: calc(100% - 18px);
    height: calc(100% - 102px);
    border-top: 1px solid #e5e6eb;
    border-bottom: 1px solid #e5e6eb;
    overflow-y: auto;
    padding: 8px 8px 0;

    .contain-header {
      font-weight: 600;
      font-size: 15px;
      color: #757575;
      padding: 10px 0px 5px 0px;
    }
    .dialog-row {
      display: flex;
      margin: 10px 16px;
      max-height: 34px;
      label {
        padding: 8px 5px 0 0;
        min-width: 155px;
        min-height: 27px;
        display: block;
        color: #212121;
        font-weight: 300;
        .d-icon {
          display: inline-block;
          position: relative;
          top: 3px;
        }
        
      }
      .group-radio {
          display: flex;
          align-items: center;
          input[type="radio"] {
            position: relative;
            top: -3px;
          }
      }
      .input-group {
        display: flex;
        flex-direction: row;
        max-width: 234px;
        input {
          width: 100%;
        }
        .input-required {
          position: relative;
          top: 34px;
          display: none;
        }
        .icon-exclamation {
            position: relative;
            left: 3px;
            top: 10px;
            min-width: 16px;
            display: none;
            
        }
        .icon-exclamation:hover {
          &+.input-required {
            display: block;
          }
        }
      }
      input[type="text"] {
        height: 22px;
        border-radius: 3px;
        border: 1px solid #d2d2d2;
        padding: 5px 10px;
        font-size: 13px;
        
        width: 216px;
        min-width: 194px;
      }
      input {
        outline: none !important;
      }
      input:focus {
        border-color: #636dde;
      }
      
      textarea {
        width: 438px;
        height: 80px;
        border: 1px solid #d2d2d2;
        padding: 5px 10px 4px;
        resize: none;
        border-radius: 5px;
        outline: none !important;
      }
      textarea:focus {
        border-color: #636dde;
      }
      
    }
  }
  .dialog-footer {
    width: 100%;
    padding: 8px;
    display: flex;
  }
}
</style>
<script lang="ts">
import Vue from 'vue'
import SubTable from "./SubTable.vue";
import AutocompleteInput from './AutocompleteInput.vue';
import InputTag from "./InputTag.vue";
import CommonFuncion from "../../services/common";
import InventoryItem from "../../models/InventoryItem";

export default Vue.extend({
  
data: function () {
    return {
        InventoryItem: {
          InventoryItemCode: ""
        } as InventoryItem,
        items: ["đồ ăn", "đồ uống"],
        showSubtable: false,
        InventoryError: {
          InventoryName: "Trường không được phép để trống"
        },
        InventoryItemGroups: [
          {
            data: [
              { name: "Bánh kẹo"},
              {name: "Trái cây" },
              { name: "Đồ dùng" },
              { name: "Thực phẩm" },
              { name: "Rau sạch" },
              
            ]
          }
        ],
        Units: [
          {
            data: [
              { name: "Chiếc"},
              {name: "Cái" },
              { name: "cuộn" },
              { name: "lần" },
              { name: "thùng" },
              { name: "tá" },
              { name: "mét" },
              { name: "chục" },
              { name: "bộ" },
              { name: "KG" },
              { name: "dây" },
              { name: "hộp" },

            ]
          }
        ]
    }
},
props: {
  hideDialog: Function
},
components: {
  SubTable,
  AutocompleteInput,
  InputTag
},
methods: {
  //Chọn ảnh từ máy
  //Created By: VM Hùng (07/5/2021)

  chooseImg() {
    try {
      let img = document.getElementById("img");
      if (img) img.click();
    } catch (e) {
      
    }
  },
  //Tự sinh mã SKU
  //Created By: VM Hùng (08/5/2021)
  generateInvetoryItemCode () {
      let englishItemName = CommonFuncion.removeVietnameseTones(this.InventoryItem.InventoryItemName);
      this.InventoryItem.InventoryItemCode = CommonFuncion.getFirstLetter(englishItemName).toUpperCase() + "01";
      if(!this.InventoryItem.InventoryItemCode) this.InventoryItem.InventoryItemCode = "";

  },
  // focus ô input đầu tiên dialog
  //Created By: VM Hùng (10/5/2021)
  focusFirstElement () {
    let firstElement = this.$refs.InventoryItemName as HTMLInputElement;
    firstElement.focus();
  },
  // focus lại phần tử đầu tiên của dialog
  //Created By: VM Hùng (10/5/2021)
  reFocus(e:any) {
    if (e.keyCode == 9) {
      e.preventDefault();
      this.focusFirstElement();
    }
  },
  //Hiển thị dialog
  showDialog() {
    this.$nextTick(() => this.focusFirstElement());
  },
  itemNameBlur () {
    let iconError = this.$refs.InventoryNameError as HTMLFormElement;
    let InventoryItemName = this.$refs.InventoryItemName as HTMLFormElement;
    if (!this.InventoryItem.InventoryItemName) {
      iconError.style.display="block";
      InventoryItemName.classList.add("border-red");
    } else {
      this.generateInvetoryItemCode();
      iconError.style.display="none";
      InventoryItemName.classList.remove("border-red");
    }
  },
  reverse(s:string){
        return s.split("").reverse().join("");
  },
  inputPurchase() {
    let number = this.InventoryItem.PurchasePrice ;
    if (number) {
      let str = number.toString();
      str = this.reverse(str);
      let showValue = str.match(/.{1,3}/g);
      
    }
    
  }
},
created: function () {
  this.$root.$on("newColorInput", (e:string) => {
    if (e.length > 0) {
      this.showSubtable = true;
    } else {
      this.showSubtable = false;
    }
  })
}
})
</script>
