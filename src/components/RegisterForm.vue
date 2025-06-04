<template>
  <n-card title="Регистрация" style="max-width: 400px; margin: auto;">
    <n-form :model="form" :rules="rules" ref="formRef">
      <n-form-item label="Имя пользователя" path="username">
        <n-input v-model:value="form.username" placeholder="Введите имя пользователя" />
      </n-form-item>

      <n-form-item label="Email" path="email">
        <n-input v-model:value="form.email" placeholder="Введите email" />
      </n-form-item>

      <n-form-item label="Пароль" path="password">
        <n-input
          v-model:value="form.password"
          type="password"
          show-password-on="click"
          placeholder="Введите пароль"
        />
      </n-form-item>

      <n-form-item>
        <n-button type="primary" @click="handleRegister" :loading="loading">
          Зарегистрироваться
        </n-button>
      </n-form-item>
    </n-form>
  </n-card>
</template>

<script setup>
import { ref } from 'vue'
import { useMessage } from 'naive-ui'

const form = ref({
  username: '',
  email: '',
  password: ''
})

const rules = {
  username: [
    { required: true, message: 'Введите имя пользователя', trigger: 'blur' },
    { min: 3, message: 'Минимум 3 символа', trigger: 'blur' }
  ],
  email: [
    { required: true, message: 'Введите email', trigger: 'blur' },
    {
      type: 'email',
      message: 'Неверный формат email',
      trigger: ['blur', 'input']
    }
  ],
  password: [
    { required: true, message: 'Введите пароль', trigger: 'blur' },
    { min: 6, message: 'Минимум 6 символов', trigger: 'blur' }
  ]
}

const formRef = ref(null)
const loading = ref(false)
const message = useMessage()

const handleRegister = async () => {
  await formRef.value?.validate((errors) => {
    if (!errors) {
      loading.value = true
      fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: form.value })
      })
        .then(async (res) => {
          loading.value = false
          if (!res.ok) {
            const { errors } = await res.json()
            message.error('Ошибка регистрации: ' + JSON.stringify(errors))
          } else {
            console.log(res)
            message.success('Регистрация прошла успешно!')
          }
        })
        .catch(() => {
          loading.value = false
          message.error('Сервер недоступен')
        })
    }
  })
}
</script>
