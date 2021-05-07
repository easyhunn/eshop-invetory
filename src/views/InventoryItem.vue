<template>
  <div class="InventoryItem">
    <Menu />
    <Header />
    <Content /> 
  </div>
</template>
<script>
import Content from "../components/layout/Content";
import Header from "../components/layout/Header";
import Menu from "../components/layout/Menu";
export default {
  name: "InventoryItem",
  components: { Content, Header, Menu },
};
</script>
