<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <n-button type="primary" size="small" @click="showAddCategoryModal = true">
        Добавить категорию
      </n-button>
      <AddCategoryModal v-model:show="showAddCategoryModal" />
      <EditCategoryModal
        v-if="editCategory"
        v-model:show="showEditCategoryModal"
        :category="editCategory"
      />
    </div>

    <n-divider />
    <div
      class="all-tasks-item"
      :class="{ active: store.selectedCategoryId === null }"
      @click="store.selectCategory(null)"
    >
      <span>Все задачи</span>
    </div>
    <n-divider />

    <div class="category-list">
      <div
        v-for="category in store.categories"
        :key="category.id"
        :class="['category-item', { active: store.selectedCategoryId === category.id }]"
      >
        <div class="category-label" @click="store.selectCategory(category.id)">
          <span>{{ category.name }}</span>
          <n-dropdown
            trigger="click"
            :options="[
              { label: 'Переименовать', key: 'rename' },
              { label: 'Удалить', key: 'delete' },
            ]"
            @select="(key) => handleCategoryAction(key, category)"
          >
            <n-button text @click.stop>
              <n-icon size="18">
                <DotsVertical />
              </n-icon>
            </n-button>
          </n-dropdown>
        </div>
      </div>
    </div>

    <div class="sidebar-footer">
      <n-divider />
      <div class="bottom-action">
        <n-button circle type="primary" size="large" @click="showChat = true"> Чат </n-button>
        <ChatDrawer v-model:show="showChat" />
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { NButton, NDivider, NDropdown, NIcon, useMessage } from 'naive-ui'
import { useTaskStore } from '@/stores/taskStore'
import { DotsVertical } from '@vicons/tabler'
import AddCategoryModal from './AddCategoryModal.vue'
import EditCategoryModal from './EditCategoryModal.vue'
import ChatDrawer from './ChatDrawer.vue'
const showChat = ref(false)


const store = useTaskStore()
const message = useMessage()

const showAddCategoryModal = ref(false)
const showEditCategoryModal = ref(false)
const editCategory = ref(null)

const handleCategoryAction = async (key, category) => {
  if (key === 'rename') {
    editCategory.value = category
    showEditCategoryModal.value = true
  } else if (key === 'delete') {
    try {
      const res = await fetch(`http://localhost:4000/api/categories/${category.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      if (!res.ok) {
        const data = await res.json()
        message.error(data.error || 'Ошибка при удалении категории')
      } else {
        store.deleteCategory(category.id) // должен быть реализован в Pinia store
        message.success('Категория удалена')
      }
    } catch {
      message.error('Ошибка подключения к серверу')
    }
  }
}
</script>

<style scoped>
.sidebar {
  flex: 0 1 220px;
  min-width: 160px;
  max-width: 220px;
  padding: 16px;
  border-right: 1px solid #e0e0e0;
  background-color: #f9f9f9;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  margin-bottom: 8px;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.category-item {
  align-items: center;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition:
    background-color 0.2s,
    box-shadow 0.2s;
}

/* Подсветка при наведении — зелёное мягкое свечение */
.category-item:hover {
  background-color: #f0fdf4; /* очень светло-зелёный */
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2); /* зелёный soft glow */
}

/* Активная категория — как в n-menu success */
.category-item.active {
  background-color: #d1fae5; /* зелёный фон */
  color: #065f46; /* тёмно-зелёный текст */
  font-weight: 500;
}

.category-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.all-tasks-item {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  margin-bottom: -10px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition:
    background-color 0.2s,
    box-shadow 0.2s;
  color: #333;
}

.all-tasks-item:hover {
  background-color: #f0fdf4; /* очень светло-зелёный */
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2); /* зелёный soft glow */
}

.all-tasks-item.active {
  background-color: #d1fae5; /* зелёный фон */
  color: #065f46; /* тёмно-зелёный текст */
  font-weight: 500;
}

.sidebar-footer {
  margin-top: auto;
  padding-top: 12px;
}

.bottom-action {
  margin-top: auto;
  display: flex;
  justify-content: end;
}
</style>
