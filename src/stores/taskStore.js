import axios from 'axios'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTaskStore = defineStore('tasks', () => {
  const categories = ref([])
  const selectedCategoryId = ref(null)

  const setCategories = (newCategories) => {
    categories.value = newCategories
  }

  const selectCategory = (categoryId) => {
    selectedCategoryId.value = categoryId
  }

  const selectedTasks = computed(() => {
    const sortOrder = { 'new': 0, 'in-progress': 1, 'completed': 2 }

    const sortTasks = (tasks) => {
      return [...tasks].sort((a, b) => {
        return (sortOrder[a.status] ?? 99) - (sortOrder[b.status] ?? 99)
      })
    }

    if (selectedCategoryId.value === null) {
      // Все задачи из всех категорий, отсортированные
      return sortTasks(categories.value.flatMap((c) => c.tasks))
    }

    const category = categories.value.find((c) => c.id === selectedCategoryId.value)
    return category ? sortTasks(category.tasks) : []
  })

  const addTask = (task) => {
    const category = categories.value.find((c) => c.id === task.category_id)
    if (category) {
      category.tasks = [task, ...category.tasks]
    }
  }

  const updateTask = (updatedTask) => {
    const cat = categories.value.find((c) => c.id === updatedTask.category_id)
    if (cat) {
      const index = cat.tasks.findIndex((t) => t.id === updatedTask.id)
      if (index !== -1) {
        cat.tasks.splice(index, 1, updatedTask)
      }
    }
  }

  const deleteTask = (taskId) => {
    for (const cat of categories.value) {
      cat.tasks = cat.tasks.filter((t) => t.id !== taskId)
    }
  }

  const addCategory = (category) => {
    categories.value.push({ ...category, tasks: [] })
  }

  const updateCategory = (updatedCat) => {
    const idx = categories.value.findIndex((c) => c.id === updatedCat.id)
    if (idx !== -1) {
      categories.value[idx].name = updatedCat.name
    }
  }

  const deleteCategory = (id) => {
    categories.value = categories.value.filter((c) => c.id !== id)
    if (selectedCategoryId.value === id) selectedCategoryId.value = null
  }

  const init = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/tasks', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      const data = await res.json()

      if (!res.ok) {
        console.error(data.error || 'Ошибка при получении данных')
        return
      }

      setCategories(data.categories)
      if (data.categories.length > 0) {
        selectedCategoryId.value = data.categories[0].id
      }
    } catch (err) {
      console.error('Сервер не отвечает')
    }
  }

  return {
    categories,
    selectedCategoryId,
    selectedTasks,
    setCategories,
    selectCategory,
    addTask,
    updateTask,
    deleteTask,
    addCategory,
    updateCategory,
    deleteCategory,
    init,
  }
})
