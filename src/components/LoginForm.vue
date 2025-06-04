<template>
  <n-card title="Авторизация" style="max-width: 400px; margin: auto;">
    <n-form :model="form" :rules="rules" ref="formRef">
      <n-form-item label="login" path="login">
        <n-input v-model:value="form.login" placeholder="Введите username или email" />
      </n-form-item>

      <n-form-item label="Пароль" path="password">
        <n-input
          v-model:value="form.password"
          type="password"
          placeholder="Введите пароль"
          show-password-on="click"
        />
      </n-form-item>

      <n-form-item>
        <n-button type="primary" @click="handleLogin" :loading="loading">
          Войти
        </n-button>
      </n-form-item>
    </n-form>
  </n-card>
</template>

<script setup>
import { ref } from 'vue'
import { useMessage } from 'naive-ui'

const message = useMessage()
const form = ref({ login: '', password: '' })
const formRef = ref(null)
const loading = ref(false)

const rules = {
  login: [
    { required: true, message: 'Введите email', trigger: 'blur' },
    { type: 'email', message: 'Неверный формат', trigger: ['blur', 'input'] }
  ],
  password: [
    { required: true, message: 'Введите пароль', trigger: 'blur' },
    { min: 6, message: 'Минимум 6 символов', trigger: 'blur' }
  ]
}

const handleLogin = async () => {
  await formRef.value?.validate(async (errors) => {
    if (!errors) {
      loading.value = true
      try {
        const res = await fetch('http://localhost:4000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user: form.value })
        })

        const data = await res.json()

        if (!res.ok) {
          message.error(data.error || 'Ошибка авторизации')
        } else {
          message.success('Вы успешно вошли')
          console.log(data.user) // здесь можно сохранить данные пользователя
        }
      } catch (err) {
        message.error('Ошибка соединения с сервером')
      } finally {
        loading.value = false
      }
    }
  })
}
</script>
