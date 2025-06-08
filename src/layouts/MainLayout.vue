<template>
  <div class="layout">
    <Navbar />
    <div class="main-area">
      <SideBar />
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import SideBar from '@/components/SideBar.vue';
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-area {
  display: flex;
  margin-top: 50px; /* Отступ для Navbar */
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.content {
  flex: 1 1 auto;
  padding: 16px;
  overflow: auto;
}
</style>
