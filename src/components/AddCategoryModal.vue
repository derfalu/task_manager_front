<template>
  <n-modal
    :show="show"
    @update:show="$emit('update:show', $event)"
    title="Добавить категорию"
    preset="dialog"
  >
    <n-form :model="form" label-placement="top">
      <n-form-item label="Название категории" path="name">
        <n-input v-model:value="form.name" placeholder="Введите название" />
      </n-form-item>
    </n-form>

    <template #action>
      <n-button type="primary" @click="submitCategory">Сохранить</n-button>
    </template>
  </n-modal>
</template>

<script setup>
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import { useTaskStore } from '@/stores/taskStore'

const emit = defineEmits(['update:show'])

const form = ref({ name: '' })
const store = useTaskStore()
const message = useMessage()

const submitCategory = async () => {
  try {
    const res = await fetch('http://localhost:4000/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ category: form.value }),
    })

    const data = await res.json()

    if (!res.ok) {
      message.error(data.error || 'Ошибка при добавлении')
    } else {
      store.addCategory(data)
      message.success('Категория добавлена')
      emit('update:show', false)
      form.value.name = ''
    }
  } catch {
    message.error('Сервер не отвечает')
  }
}
</script>
