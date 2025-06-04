<template>
  <!-- <NavBar />
    <div class="main">
      <router-view></router-view>
    </div> -->
  <div class="register-form">
    <n-message-provider>
      <!-- <RegisterForm /> -->
      <LoginForm />
    </n-message-provider>
  </div>
</template>

<script setup>
// import NavBar from './components/NavBar.vue';
import { NMessageProvider } from 'naive-ui'
import RegisterForm from './components/RegisterForm.vue'
import LoginForm from './components/LoginForm.vue'
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
