<template>
  <n-card size="large" bordered>
    <div class="header">
      <n-button type="primary" size="small" @click="showTaskModal = true">Добавить задачу</n-button>
    </div>
    <AddTaskModal v-model:show="showTaskModal" />
    <EditTaskModal v-model:show="showEditModal" :task="taskToEdit" />

    <n-divider />

    <n-space vertical size="medium" class="task-list" v-if="tasks.length > 0">
      <n-card
        v-for="task in tasks"
        :key="task.id"
        size="small"
        class="task-item"
        hoverable
        bordered
      >
        <n-space align="center" justify="space-between">
          <!-- Левая часть: информация о задаче -->
          <div class="task-info">
            <n-text class="task-title">{{ task.title }}</n-text>
            <n-text class="description">{{ task.description }}</n-text>
          </div>

          <!-- Правая часть: статус и кнопка "Изменить" -->
          <div class="task-actions">
            <n-tag :type="statusColors[task.status]" size="small" class="task-status">
              {{ statusLabels[task.status] }}
            </n-tag>
            <n-button size="small" @click="editTask(task.id)">Изменить</n-button>
          </div>
        </n-space>
      </n-card>
    </n-space>
    <div v-else class="no-tasks">
      <n-empty description="Нет задач в этой категории" />
    </div>
  </n-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import AddTaskModal from './AddTaskModal.vue'
import EditTaskModal from './EditTaskModal.vue'

const store = useTaskStore()
const showTaskModal = ref(false)
const showEditModal = ref(false)
const taskToEdit = ref(null)

const editTask = (id) => {
  const task = store.selectedTasks.find((t) => t.id === id)
  if (task) {
    taskToEdit.value = { ...task } // создаём копию, чтобы не редактировать напрямую
    showEditModal.value = true
  }
}

// Используем задачи выбранной категории
const tasks = computed(() => store.selectedTasks)

const statusLabels = {
  new: 'Новая',
  'in-progress': 'В работе',
  completed: 'Завершена',
}

const statusColors = {
  new: 'error',
  'in-progress': 'warning',
  completed: 'success',
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: end;
  padding-top: 0;
  margin-top: -15px;
  /* padding-bottom: 8px; */
}

.task-list {
  gap: 12px;
}

.task-item {
  display: flex;
  flex-direction: column;
}

.task-title {
  font-size: 1.5rem;
  font-weight: 600;
}


.task-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.task-info .description {
  font-size: 0.85rem; /* Меньший размер шрифта для описания */
  color: var(--n-text-color-secondary); /* Вторичный цвет текста */
}

.task-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.task-status {
  margin-right: 8px; /* Отступ между статусом и кнопкой */
}

.no-tasks {
  padding: 40px 0;
  display: flex;
  justify-content: center;
}
</style>
