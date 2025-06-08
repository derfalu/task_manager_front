<template>
  <n-modal
    :show="show"
    @update:show="$emit('update:show', $event)"
    title="Переименовать категорию"
    preset="dialog"
  >
    <n-form :model="form" label-placement="top">
      <n-form-item label="Новое название" path="name">
        <n-input v-model:value="form.name" placeholder="Введите новое название" />
      </n-form-item>
    </n-form>

    <template #action>
      <n-button type="primary" @click="submitRename">Сохранить</n-button>
    </template>
  </n-modal>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useMessage } from 'naive-ui'
import { useTaskStore } from '@/stores/taskStore'

const props = defineProps({
  show: Boolean,
  category: Object, // { id, name }
})
const emit = defineEmits(['update:show'])

const store = useTaskStore()
const message = useMessage()

const form = ref({
  name: ''
})

watch(
  () => props.show,
  (val) => {
    if (val && props.category) {
      form.value.name = props.category.name
    }
  }
)

const submitRename = async () => {
  try {
    const res = await fetch(`http://localhost:4000/api/categories/${props.category.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ category: { name: form.value.name } }),
    })

    const data = await res.json()
    if (!res.ok) {
      message.error(data.error || 'Ошибка при переименовании')
    } else {
      store.updateCategory(data) // предполагается, что у тебя есть такой метод
      message.success('Категория переименована')
      emit('update:show', false)
    }
  } catch (err) {
    message.error('Сервер не отвечает')
  }
}
</script>
