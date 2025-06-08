<template>
  <n-modal
    :show="show"
    @update:show="$emit('update:show', $event)"
    title="Новая задача"
    preset="dialog"
  >
    <n-form :model="taskForm" label-placement="top">
      <n-form-item label="Название задачи" path="title">
        <n-input v-model:value="taskForm.title" placeholder="Введите название" />
      </n-form-item>
      <n-form-item label="Описание задачи" path="description">
        <n-input
          v-model:value="taskForm.description"
          type="textarea"
          placeholder="Введите описание"
        />
      </n-form-item>
      <n-form-item label="Категория">
        <n-select
          v-model:value="taskForm.category_id"
          :options="categoryOptions"
          placeholder="Выберите категорию"
        />
      </n-form-item>
    </n-form>

    <template #action>
      <n-button type="primary" @click="submitTask">Сохранить</n-button>
    </template>
  </n-modal>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import { useMessage } from 'naive-ui'

const props = defineProps({ show: Boolean })
const emit = defineEmits(['update:show'])

const store = useTaskStore()
const message = useMessage()

const taskForm = ref({
  title: '',
  description: '',
  category_id: null,
})

// Автоматически подставляем выбранную категорию при открытии
watch(
  () => props.show,
  (val) => {
    if (val) {
      taskForm.value.category_id = store.selectedCategoryId
    }
  },
)

const categoryOptions = computed(() =>
  store.categories.map((c) => ({
    label: c.name,
    value: c.id,
  })),
)

const submitTask = async () => {
  try {
    const res = await fetch('http://localhost:4000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        task: {
          title: taskForm.value.title,
          description: taskForm.value.description,
          category_id: taskForm.value.category_id,
        },
      }),
    })

    const data = await res.json()
    console.log('Ответ сервера:', data)

    if (!res.ok) {
      message.error(data.error || 'Ошибка при добавлении')
    } else {
      message.success('Задача добавлена')

      // Обновим реактивно категорию с новой задачей
      store.addTask(data)
      console.log('Текущая выбранная категория:', store.selectedCategoryId)

      // Закрываем модалку и сбрасываем форму
      emit('update:show', false)
      taskForm.value.title = ''
      taskForm.value.description = ''
      taskForm.value.category_id = null
    }
  } catch (err) {
    message.error('Сервер не отвечает')
  }
}
</script>
