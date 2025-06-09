<template>
  <nav class="navbar">
    <h1 style="margin-left: 10px;">Task Manager</h1>
    <div style="margin-right: 10px;" ref="dropdownContainer">
      <!-- Dropdown -->
      <n-dropdown
        trigger="click"
        :options="menuOptions"
        placement="bottom"
        @select="handleOptionSelect"
        @update:show="updateDropdownVisible"
      >
        <n-button
          type="default"
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
import { ref, h } from "vue";
import { NDropdown, NButton, NIcon } from "naive-ui";
import { ChevronDown, ChevronUp } from "@vicons/fa";
import {
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
  PersonCircleOutline as UserIcon
} from "@vicons/ionicons5";
import { useRouter } from "vue-router";

const router = useRouter();
const isDropdownVisible = ref(false);

// Генерация иконки для меню
function renderIcon(icon) {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
}

function updateDropdownVisible(val) {
  isDropdownVisible.value = val;
}


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


// Обработка выбора опции из дропдауна
const handleOptionSelect = (key) => {
  if (key === "logout") {
    console.log("Logging out...");
    localStorage.removeItem("token")
    router.push("/login");
  } else if (key === "profile") {
    console.log("Opening profile...");
  } else if (key === "editProfile") {
    console.log("Editing profile...");
  }
};

</script>

<style>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 56px;
  padding: 0 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #ffffff; /* светлая тема */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border-bottom: 1px solid #e5e7eb;

  font-family: 'Segoe UI', sans-serif;
}


.profile-button {
  background-color: transparent;
  border: none;
  box-shadow: none;
  padding: 6px 12px;
  transition: background-color 0.2s ease;
}

.profile-button:hover {
  background-color: #f0fdf4; /* светло-зеленый при наведении */
  border-radius: 6px;
}

.profile-content {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  font-size: 14px;
}

.navbar h1 {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937; /* gray-800 */
  margin: 0;
}


.n-button {
  display: flex;
  align-items: center;
}
</style>
