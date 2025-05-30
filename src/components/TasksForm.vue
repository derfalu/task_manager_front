<template>
  <div class="task-list">
    <h1>Менеджер задач</h1>
    <button class="add-button" @click="addTask">Добавить</button>
    <div class="task" v-for="task in tasks" :key="task.id">
      <div class="task-info">
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
      </div>
      <div class="task-status">
        <span :class="'status ' + task.status">{{ statusLabels[task.status] }}</span>
      </div>
      <button @click="editTask(task.id)" class="edit-button">Изменить</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Список задач
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

// Словарь для отображения статусов
const statusLabels = {
  new: "Новая",
  "in-progress": "В работе",
  completed: "Завершена",
};

// Методы для добавления и редактирования задач
const addTask = () => {
  // Пример: Добавление пустой задачи
  tasks.value.push({
    id: tasks.value.length + 1,
    title: "Новая задача",
    description: "Описание задачи",
    status: "new",
  });
};

const editTask = (taskId) => {
  alert(`Редактирование задачи с ID ${taskId}`);
};
</script>

<style scoped>
.task-list {
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.add-button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #0056b3;
}

.task {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid #ddd;
}

.task-info {
  flex-grow: 1;
}

h3 {
  margin: 0;
  font-size: 18px;
}

p {
  margin: 5px 0 0;
  color: #555;
}

.task-status {
  margin-right: 15px;
}

.status {
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.status.new {
  background-color: #f8d7da;
  color: #721c24;
}

.status.in-progress {
  background-color: #fff3cd;
  color: #856404;
}

.status.completed {
  background-color: #d4edda;
  color: #155724;
}

.edit-button {
  background-color: #6c757d;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

.edit-button:hover {
  background-color: #5a6268;
}
</style>
