<template>
  <div ref="inputGroup" class="input-group">
    <autocomplete
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
    </autocomplete>
    <div class="input-symbol d-icon icon-quick-add right-input-side"></div>
  </div>
</template>
<style lang="scss">
.input-container {
  width: 210px !important;
  padding: 0px !important;
  border: none !important;
  img {
    width: 0px !important;
  }
  div {
    padding: 0px !important;
    border: none !important;
  }
  ul {
    width: calc(100% + 29px);
  }
  input {
    background: url("../../assets/Icon/arrow-down-line.png");
    background-repeat: no-repeat;
    background-position-x: calc(100% - 5px);
    background-position-y: 50%;
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
  flex-direction: row;
  input {
    width: 189px;
  }
  .input-symbol {
    height: 22px;
    background-color: #f5f5f5;
    border: 1px solid #c3c3c3;
    background-position: center;
    width: 137px;
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

export default {
  components: {
    Autocomplete,
  },
  methods: {
    something() {
      console.log("??");
    },
  },
  mounted: function() {},
};
</script>
