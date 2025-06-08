<template>
    <n-message-provider>
      <router-view />
  </n-message-provider>
</template>

<script setup>
// import NavBar from './components/NavBar.vue';
import { NMessageProvider } from 'naive-ui'
import { onMounted } from 'vue'
import { useTaskStore } from '@/stores/taskStore'

onMounted(() => {
  const taskStore = useTaskStore()
  taskStore.init()
})
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
