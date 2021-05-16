<template>
    <input type="text" :value="displayValue" @keyup="isNumber($event)" maxlength="20">
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "CurrencyInput",
    data: function() {
        return {
            displayValue: "",
            value: 0
        }
    },
    props: [
        "defaultValue"
    ],
    methods: {
        //Kiểm tra dữ liệu nhập vào là số
        //Created By: Vm Hùng (16/05/2021)
        isNumber: function(e:any) {
            e = (e) ? e : window.event;
            var charCode = (e.which) ? e.which : e.keyCode;
            
            if (charCode == 9) this.$emit("onKeyupTab");
            if (charCode == 13) this.$emit("onKeyupEnter");
            
            if (charCode != 8 && (charCode < 48 || charCode > 57)) {
                e.preventDefault();;
            } else {
                this.value = e.target.value;
                // Đẩy ra ngoài giá trị ô input hiện tại
                let valueNumber = this.replaceAll(this.value.toString(), ".", '')
                this.$emit("onKeyup", parseInt(valueNumber));
                this.stringToCurrency();
                return true;
            }
        },
        //Đảo ngược kí tự trong chuỗi
        //Created By: Vm Hùng (16/05/2021)
        reverse(s:string){
            return s.split("").reverse().join("");
        },
        //Chuyển Giá trị ô input về dạng tiền
        //Created By: Vm Hùng (16/05/2021)
        stringToCurrency() {
            let number = this.value ;
            if (number) {
                let str = number.toString();
                str = this.replaceAll(str, ".", '');
                str = this.reverse(str);
                let showValue = str.match(/.{1,3}/g);
                this.displayValue = this.reverse((showValue?.join(".") || ""));
            } else {
                this.displayValue = ""
            }
        },
        replaceAll(str:string, find:string, replace:string) {
            var escapedFind=find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
            return str.replace(new RegExp(escapedFind, 'g'), replace);
        }

    },
    watch:{
        defaultValue() {
            this.value = this.defaultValue;
            this.stringToCurrency();
        }
    }  
})
</script>