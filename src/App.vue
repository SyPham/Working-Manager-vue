<template>
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-base/styles/bootstrap.css";
@import "../node_modules/@syncfusion/ej2-buttons/styles/bootstrap.css";
@import "../node_modules/@syncfusion/ej2-calendars/styles/bootstrap.css";
@import "../node_modules/@syncfusion/ej2-dropdowns/styles/bootstrap.css";
@import "../node_modules/@syncfusion/ej2-inputs/styles/bootstrap.css";
@import "../node_modules/@syncfusion/ej2-navigations/styles/bootstrap.css";
@import "../node_modules/@syncfusion/ej2-popups/styles/bootstrap.css";
@import "../node_modules/@syncfusion/ej2-splitbuttons/styles/bootstrap.css";
@import "../node_modules/@syncfusion/ej2-grids/styles/bootstrap.css";
@import "../node_modules/@syncfusion/ej2-treegrid/styles/bootstrap.css";
.page-enter-active,
.page-leave-active {
  transition: opacity 1s, transform 1s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>
