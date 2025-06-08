<template>
  <div class="auth-wrapper">
    <n-card title="Авторизация" style="max-width: 400px; margin: auto">
      <n-form :model="form" :rules="rules" ref="formRef">
        <n-form-item label="Логин" path="login">
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
          <n-button type="primary" @click="handleLogin" :loading="loading"> Войти </n-button>
        </n-form-item>
        <n-form-item>
          <span
            >Нет аккаунта?
            <router-link to="/register" class="link-button">Зарегистрироваться</router-link>
          </span>
        </n-form-item>
      </n-form>
    </n-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
import { useTaskStore }  from '@/stores/taskStore'
const message = useMessage()
const form = ref({ login: '', password: '' })
const formRef = ref(null)
const loading = ref(false)
const router = useRouter()
const store = useTaskStore()

const rules = {
  login: [
    { required: true, message: 'Введите email или имя пользователя', trigger: 'blur' },
    { min: 3, message: 'Минимум 3 символа', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Введите пароль', trigger: 'blur' },
    { min: 6, message: 'Минимум 6 символов', trigger: 'blur' },
  ],
}

const handleLogin = async () => {
  await formRef.value?.validate(async (errors) => {
    if (!errors) {
      loading.value = true
      try {
        const res = await fetch('http://localhost:4000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user: form.value }),
        })

        const data = await res.json()

        if (!res.ok) {
          message.error(data.error || 'Ошибка авторизации')
        } else {
          // ✅ Сохраняем токен
          localStorage.setItem('token', data.user.token)
          store.setCategories(data.data.categories)
          console.log("data", data.data)
          message.success('Вы успешно вошли')
          router.push('/tasks')

          // (опционально) Перенаправляем, например, на страницу задач
          // router.push('/tasks')
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
<style scoped>
.link-button {
  color: #409eff; /* или любой другой */
  text-decoration: underline;
  margin-left: 5px;
  font-weight: bold;
  cursor: pointer;
}
</style>
