<template>
  <div class="input-group">
    <!-- <autocomplete
      class="input-container"
      :source="[
        { id: 1, name: 'abc' },
        { id: 2, name: 'def' },
      ]"
      input-class="auto-complete-input"
      placeholder="Nhập để tìm kiếm"
      name="abc"
      @nothingSelected="something()"
    >
    </autocomplete> -->
  
    <vue-autosuggest
      class="input-container"
      v-model="query"
      :suggestions="filteredOptions"
      @focus="focusMe"
      @click="clickHandler"
      @input="onInputChange"
      @selected="onSelected"
      @blur="onBlur"
      :render-suggestion="renderSuggestion"
      :get-suggestion-value="getSuggestionValue"
      :input-props="{id:'value', placeholder:'Nhập để tìm kiếm'}">
      <div slot-scope="{suggestion}" style="display: flex; align-items: center;">
        <div style="{ display: 'flex', color: 'navyblue'}">{{suggestion.item.name}}</div>
      </div>
    </vue-autosuggest>

    <div ref="inputSymbol" class="input-symbol d-icon icon-quick-add right-input-side"></div>
    <div ref="InputErrorIcon" class="d-icon icon-exclamation"></div>
    <span class="input-required">
        Giá trị bạn chọn không có trong danh sách
    </span>
  </div>
  
</template>
<style lang="scss">

.input-container {
  width: 205px;
  min-width: 195px;
  input {
    background: url("../../assets/Icon/arrow-down-line.png");
    background-repeat: no-repeat;
    background-position-x: 96%;
    background-position-y: 50%;
    padding: 5px 10px !important;
    border-right: none;
    border-radius: 3px 0 0 3px;
    height: 22px !important;
  }
  input:focus {
    border-right: none !important;
  }
  div.autosuggest__results-container {
    background-color: white !important;
    width: calc(100% + 30px);
    ul {
      margin-top: 5px !important;
      list-style-type: none;
      width: 100%;
      padding: 0 !important;
      max-height: 300px;
      overflow-y: auto;
      li {
        padding: 0 2px;
        cursor: pointer;
      }
      li:hover {
        .list-content {
          background-color: #6b6f9d !important;
          color: #fff;
        }
      }
    }
  }
}
.border-focus {
  border-color: #636dde !important;
}
.auto-complete-input {
  height: 34px !important;
  border-radius: 3px;
  border: 1px solid #d2d2d2 !important;
  padding: 5px 10px;
  font-size: 13px;
  width: 210px !important;
  outline: none !important;
  border-radius: 3px 0 0 3px !important;
  border-right: none !important;
}
.input-group {
  z-index: 10;
  flex-direction: row;
  .icon-exclamation {
    min-width: 16px;
    position: relative;
    left: 3px;
    top: 10px;
  }
  .icon-exclamation:hover {
    &+.input-required {
      display: block;
    }
  }
  .input-required {
    position: relative;
    top: 34px;
    display: none;
  }
  input {
    width: calc(100% - 21px);
  }
  .input-symbol {
    height: 22px;
    background-color: #f5f5f5;
    border: 1px solid #c3c3c3;
    background-position: center;
    padding: 5px 10px;
  }
  .d-icon {
    width: 7px;
  }
  .right-input-side {
    border-radius: 0px 3px 3px 0px;
  }
}
</style>
<script>
import Autocomplete from "vuejs-auto-complete";
import { VueAutosuggest } from 'vue-autosuggest';
export default {
  components: {
    Autocomplete,
    VueAutosuggest
  },
  
  data() {
    return {
      query: "",
      selected: "",
    };
  },
  props: ["value", "suggestions"],
  computed: {
    filteredOptions() {
      return [
        { 
          data: this.suggestions[0].data.filter(option => {
              return option.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
          })
        }
      ];
    }
  },
  methods: {
    clickHandler(item) {
      // event fired when clicking on the input
    },
    // Khi giá trị được chọn
    //Created By: VM Hùng (16/05/2021)
    onSelected(item) {
      this.selected = item.item;
    },
    // khi thay đổi giá trị ô input
    //Created By: VM Hùng (16/05/2021)

    onInputChange(text) {
      if (!this.filteredOptions[0].data.length) {
        this.$refs.InputErrorIcon.style.display="block";
        this.$emit("noSuggestion", true)
      } else {
        this.$refs.InputErrorIcon.style.display="none";

        this.$emit("noSuggestion", false)
      }
      // this.$emit("input", text)
    },
    /**
     * This is what the <input/> value is set to when you are selecting a suggestion.
     */
    getSuggestionValue(suggestion) {
      return suggestion.item.name;
    },
    //focus Input
    //Created By: VM Hùng (16/05/2021)

    focusMe(e) {
      this.$refs.inputSymbol.style.borderColor = "#636dde";
      this.$refs.inputSymbol.style.borderLeftColor= "#d2d2d2";
    },
    // khi blur ô input
    //Created By: VM Hùng (16/05/2021)

    onBlur(){
        this.$refs.inputSymbol.style.borderColor= "#d2d2d2";
        if (this.query != this.selected.name) {
          this.query = "";
          this.$emit("input", "")
        } else {
        this.$emit("input", this.selected.name)

        }
    },
    //Giá trị trả về của list danh sách gợi ý
    //Created By: VM Hùng (16/05/2021)
    renderSuggestion(suggestion) {
        
        return this.$createElement('div', { 'style': {height: '22px', padding: '2px 5px' }, class: "list-content" }, suggestion.item.name);
    },
  },
  watch:{
    value() {
      this.query = this.value;
    }
  }
};
</script>
