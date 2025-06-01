<template>
  <nav class="navbar">
    <h1 style="margin-left: 10px;">Task Manager</h1>
    <div style="margin-right: 10px;" ref="dropdownContainer">
      <!-- Dropdown -->
      <n-dropdown
        :options="menuOptions"
        v-model:show="isDropdownVisible"
        trigger="manual"
        placement="bottom"
        @select="handleOptionSelect"
      >
        <n-button
          type="default"
          @click="toggleDropdown"
          class="profile-button"
        >
          <div class="profile-content">
            <span>Ваш профиль</span>
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
    </div>
  </nav>
</template>

<script setup>
import { ref, h, onMounted, onUnmounted } from "vue";
import { NDropdown, NButton, NIcon } from "naive-ui";
import { ChevronDown, ChevronUp } from "@vicons/fa";
import {
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
  PersonCircleOutline as UserIcon
} from "@vicons/ionicons5";

// Состояние видимости дропдауна
const isDropdownVisible = ref(false);

const dropdownContainer = ref(null);

// Генерация иконки для меню
function renderIcon(icon) {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
}

const handleClickOutside = (event) => {
  if (
    dropdownContainer.value &&
    !dropdownContainer.value.contains(event.target)
  ) {
    isDropdownVisible.value = false;
  }
};


// Опции для меню
const menuOptions = [
  {
    label: "Мой профиль",
    key: "profile",
    icon: renderIcon(UserIcon),
  },
  {
    label: "Редактировать профиль",
    key: "editProfile",
    icon: renderIcon(EditIcon),
  },
  {
    label: "Выход",
    key: "logout",
    icon: renderIcon(LogoutIcon),
  },
];

// Логика переключения дропдауна
const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
};

// Обработка выбора опции из дропдауна
const handleOptionSelect = (key) => {
  if (key === "logout") {
    console.log("Logging out...");
  } else if (key === "profile") {
    console.log("Opening profile...");
  } else if (key === "editProfile") {
    console.log("Editing profile...");
  }
};

onMounted(() => {
  window.addEventListener("mousedown", handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener("mousedown", handleClickOutside);
});

</script>

<style>
.navbar {
  position: fixed;
  height: 50px;
  box-shadow: 2px 2px 4px grey;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%
}

.profile-button {
  width: auto;
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
