//link api
const ADDRESS = Object.freeze({
  STORE: "https://localhost:44327/api/v1/store/",
  STORE_BY_STORE_CODE: "https://localhost:44327/api/v1/store/StoreCode/",
  COUNTRY: "https://localhost:44327/api/v1/country/",
  PROVINCE: "https://localhost:44327/api/v1/province/",
  DISTRICT: "https://localhost:44327/api/v1/district/",
  WARD: "https://localhost:44327/api/v1/ward/",
});
const DIALOG = Object.freeze({
  TITLE_ADD: "Thêm mới cửa hàng",
  TITLE_UPDATE: "sửa cửa hàng",
});

const SUBMIT_TYPE = Object.freeze({
    UPDATE: "update",
    INSERT: "insert",
    DUPLICATE: "duplicate",

});

const MESSAGE = Object.freeze({
  STORECODE_EXCEED: "Mã khách hàng không được vượt quá 20 kí tự",
  DUPLICATE_STORECODE: "Mã Khách hàng đã tồn tại",
  NOT_ALLOW_BLANK: "Trường không được phép để trống",
  UPDATE_SUCCESS: "Sửa thành công",
  ADDD_SUCCESS: "thêm thành công",
  DELETE_SUCCESS: "Xoá thành công!",
});
export default {
    ADDRESS,
    DIALOG,
    MESSAGE,
    SUBMIT_TYPE
};
