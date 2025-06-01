<template>
  <n-card size="large" bordered>
    <div class="header">
      <n-button type="primary" size="small" @click="addTask">Добавить</n-button>
    </div>

    <n-divider />

    <n-space vertical size="medium" class="task-list">
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
            <n-text strong>{{ task.title }}</n-text>
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
  </n-card>
</template>

<script setup>
import { ref } from "vue";
import {
  NButton,
  NCard,
  NSpace,
  NText,
  NTag,
  NDivider,
} from "naive-ui";

// Реактивные данные для задач
const tasks = ref([
  {
    id: 1,
    title: "Купить продукты",
    description: "Не забыть молоко и хлеб",
    status: "new",
  },
  {
    id: 2,
    title: "Сходить в спортзал",
    description: "Занятие в 7 вечера",
    status: "in-progress",
  },
  {
    id: 3,
    title: "Написать отчёт",
    description: "Проверить все данные",
    status: "in-progress",
  },
  {
    id: 4,
    title: "Позвонить клиенту",
    description: "Обсудить детали проекта",
    status: "completed",
  },
  {
    id: 5,
    title: "Убрать на столе",
    description: "Разложить бумаги по папкам",
    status: "completed",
  },
]);

// Метки для статусов
const statusLabels = {
  new: "Новая",
  "in-progress": "В работе",
  completed: "Завершена",
};

// Цвета для статусов
const statusColors = {
  new: "error",
  "in-progress": "warning",
  completed: "success",
};

// Метод для добавления задачи
const addTask = () => {
  tasks.value.push({
    id: tasks.value.length + 1,
    title: "Новая задача",
    description: "Описание задачи",
    status: "new",
  });
};

// Метод для редактирования задачи
const editTask = (id) => {
  console.log("Редактирование задачи с ID:", id);
};
</script>

<style scoped>
.header {
  display: flex;
  padding-bottom: 8px;
}

.task-list {
  gap: 12px;
}

.task-item {
  display: flex;
  flex-direction: column;
}

.task-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.task-info .description {
  font-size: 0.875rem; /* Меньший размер шрифта для описания */
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
</style>
