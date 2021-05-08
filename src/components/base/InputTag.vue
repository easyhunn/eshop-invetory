<template>
    <div class="input-tag-container">
        <div style="min-width: 137px;" class="input-symbol left-input-side ">Màu sắc</div>
        <InputTag class="input-content" @input="onInput"/>
    </div>
</template>
<style lang="scss">
.input-tag {
    background-color: rgb(43, 49, 115) !important;
    margin-left: 5px !important;
    border-radius: 3px !important;
    height: 22px !important;
    margin-top: 3px !important;
    .remove {
        padding: 3px !important;
        color: white !important;    
    }
}

.input-content {
    padding: 0 !important;
    height: 32px !important;
    input {
        width: 189px;
        height: 30px !important;
        padding: 0px 5px !important;
    }
    span {  
        background-color: rgb(43, 49, 115) !important;
        color: #fff !important;
        padding: 1px !important;
    }
}
</style>
<style scoped lang="scss">
    .input-tag-container {
        display: flex;
        flex-direction: row;
        
        .input-symbol {
          max-height: 22px;
          background-color: #f5f5f5;
          border: 1px solid #c3c3c3;
          background-position: center;
          width: 137px;
          padding: 5px 10px;
        }
        .d-icon {
          width: 7px;
        }
        .left-input-side {
          border-radius: 3px 0 0 3px;
          border-right: none !important;
        }
        .right-input-side {
          border-radius: 0px 3px 3px 0px;

        }
      }
</style>
<script>
import InputTag from 'vue-input-tag'
export default {
    components:{
        InputTag
    },
    methods: {
        onInput(e) {
            this.$root.$emit("newColorInput", e);
        }
    }
}
</script>