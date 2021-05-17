<template>
  <div id="app">
    <Menu />
    <Header />
    <router-view/>
  </div>
</template>

<style lang="scss">
</style>
<script lang="ts">
import Vue from 'vue'
import "./css/icon.css";
import "./css/table.css";
import "./css/button.css";
import "./css/common.css";
import "./css/font.css";
import "./css/input.css";
import "./css/main.css";
import "./css/footer.css";
import Header from "./components/layout/Header.vue";
import Menu from "./components/layout/Menu.vue";

export default Vue.extend({
  components: {Header, Menu },
})
</script>