<template>
  <!-- <NavBar />
    <div class="main">
      <router-view></router-view>
    </div> -->
    <n-message-provider>
    <div class="main-container">
      <router-view />
    </div>
  </n-message-provider>
</template>

<script setup>
// import NavBar from './components/NavBar.vue';
import { NMessageProvider } from 'naive-ui'
</script>

<style scoped>
.main {
  padding-top: 50px;
}

.register-form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
</style>
