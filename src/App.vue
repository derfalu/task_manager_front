<template>
  <div>
    <NavBar />
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
  import NavBar from './components/NavBar.vue';
</script>

<style scoped>
  .main {
    padding-top: 50px;
  }
</style>
