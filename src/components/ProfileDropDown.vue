<template>
  <div class="navbar">
    <h1 style="margin-left: 10px;">Task Manager</h1>
    <nav style="margin-right: 10px;">
      <!-- Dropdown -->
      <n-dropdown
        v-model:show="isDropdownVisible"
        :options="menuOptions"
        trigger="manual"
        placement="bottom"
      >
        <n-button
          type="default"
          @click="toggleDropdown"
          class="profile-button"
        >
          <div class="profile-content">
            <span>Мой Профиль</span>
            <n-icon>
              <template v-if="isDropdownVisible">
                <ChevronUp />
              </template>
              <template v-else>
                <ChevronDown />
              </template>
            </n-icon>
          </div>
        </n-button>
      </n-dropdown>
    </nav>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { NDropdown, NButton, NIcon } from "naive-ui";
import { ChevronDown, ChevronUp } from "@vicons/fa";

// Состояние для отображения dropdown
const isDropdownVisible = ref(false);

// Опции для dropdown
const menuOptions = [
  {
    label: "Информация о профиле",
    key: "profile",
  },
  {
    label: "Выход",
    key: "logout",
  },
];

// Функция переключения dropdown
const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
};
</script>

<style scoped>
.navbar {
  height: 50px;
  box-shadow: 2px 2px 4px grey;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

.profile-button {
  width: 100%;
  padding: 10px 20px;
}

.profile-content {
  display: flex;
  align-items: center;
  gap: 8px; /* Расстояние между текстом и стрелкой */
}

.n-button {
  display: flex;
  align-items: center;
}
</style>
