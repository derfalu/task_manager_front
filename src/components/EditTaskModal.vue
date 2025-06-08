<template>
  <n-modal
    :show="show"
    @update:show="$emit('update:show', $event)"
    title="Редактировать задачу"
    preset="dialog"
  >
    <n-form :model="form" label-placement="top">
      <n-form-item label="Название задачи" path="title">
        <n-input v-model:value="form.title" placeholder="Введите название" />
      </n-form-item>

      <n-form-item label="Описание" path="description">
        <n-input
          v-model:value="form.description"
          type="textarea"
          placeholder="Введите описание"
        />
      </n-form-item>

      <n-form-item label="Статус">
        <n-select
          v-model:value="form.status"
          :options="statusOptions"
          placeholder="Выберите статус"
        />
      </n-form-item>
    </n-form>

    <template #action>
      <div style="display: flex; justify-content: space-between; width: 100%;">
        <n-button type="error" @click="deleteTask">Удалить</n-button>
        <n-button type="primary" @click="submitEdit">Сохранить</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useMessage } from 'naive-ui'
import { useTaskStore } from '@/stores/taskStore'

const props = defineProps({
  show: Boolean,
  task: Object, // ожидается task.id, title, description, status
})
const emit = defineEmits(['update:show'])

const store = useTaskStore()
const message = useMessage()

const form = ref({
  title: '',
  description: '',
  status: '',
})

const statusOptions = [
  { label: 'Новая', value: 'new' },
  { label: 'В процессе', value: 'in-progress' },
  { label: 'Завершена', value: 'completed' },
]

// При открытии модалки заполняем форму
watch(
  () => props.show,
  (val) => {
    if (val && props.task) {
      form.value = {
        title: props.task.title,
        description: props.task.description,
        status: props.task.status,
      }
    }
  }
)

const submitEdit = async () => {
  try {
    const res = await fetch(`http://localhost:4000/api/tasks/${props.task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ task: form.value }),
    })

    const data = await res.json()
    if (!res.ok) {
      message.error(data.error || 'Ошибка при обновлении')
    } else {
      store.updateTask(data)
      message.success('Задача обновлена')
      emit('update:show', false)
    }
  } catch {
    message.error('Сервер не отвечает')
  }
}

const deleteTask = async () => {
  try {
    const res = await fetch(`http://localhost:4000/api/tasks/${props.task.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    if (!res.ok) {
      const data = await res.json()
      message.error(data.error || 'Ошибка при удалении')
    } else {
      store.deleteTask(props.task.id)
      message.success('Задача удалена')
      emit('update:show', false)
    }
  } catch {
    message.error('Сервер не отвечает')
  }
}
</script>
