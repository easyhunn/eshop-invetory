// Chuyển số điện thoại sang dạng chữ
//Created By: VM Hùng (16/04/2021)
function phoneNumberToString (phone) {
    let first = phone.substring(0,3);
    let middle = phone.substring(3,6);
    let last = phone.substring(6)
    return "(" + first + ") " + middle+ "-" + last;
}
// Chuyển số điện thoại sang dạng số
//Created By: VM Hùng (16/04/2021)
function phoneNumberToNumber (PhoneNumber) {
    let first = PhoneNumber.substring(1,4);
    let middle = PhoneNumber.substring(6,9);
    let last = PhoneNumber.substring(10);
    return first + middle + last;
}
export default {phoneNumberToNumber, phoneNumberToString};

