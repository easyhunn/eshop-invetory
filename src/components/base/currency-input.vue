<template>
    <input type="text" :value="displayValue" @input="isNumber($event)" maxlength="20">
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
                if (valueNumber)
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
            let number = this.value;
            let str = number.toString();
            str = this.replaceAll(str, ".", '');
            str = this.reverse(str);
            let showValue = str.match(/.{1,3}/g);
            this.displayValue = this.reverse((showValue?.join(".") || ""));
            // if (number) {
                
            // } else {
            //     this.displayValue = ""
            // }
        },
        // Thay thế kí tự find trong chuỗi str bằng kí tự replace 
        //Created By: Vm Hùng (16/05/2021)
        replaceAll(str:string, find:string, replace:string) {
            var escapedFind=find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
            return str.replace(new RegExp(escapedFind, 'g'), replace);
        }

    },
    watch:{
        // Giá trị mặc định truyền vào
        defaultValue() {
            this.value = this.defaultValue;
            this.stringToCurrency();
        }
    },
    mounted() {
        // Cập nhật giá trị component
        this.value = this.defaultValue;
        if (this.value) this.stringToCurrency();
    }  
})
</script>