<template>
  <n-drawer v-model:show="visible" placement="right" width="500">
    <n-drawer-content title="GPT-чат">
      <div class="chat-wrapper">
        <div class="messages" ref="messagesContainer">
          <div v-for="(msg, i) in messages" :key="i" class="message">
            <strong>{{ msg.role === 'user' ? 'Вы:' : 'GPT:' }}</strong>
            <div v-html="renderMarkdown(msg.content)" />
          </div>
        </div>

        <div class="chat-footer">
          <n-input
            v-model:value="input"
            type="textarea"
            placeholder="Ваш вопрос..."
            :autosize="{ minRows: 2, maxRows: 5 }"
            @keydown.enter.prevent="send"
          />
          <n-button type="primary" @click="send" :loading="loading" class="send-button">
            Отправить
          </n-button>
        </div>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>



<script setup>
import { ref, watch, nextTick } from 'vue'
import { NDrawer, NDrawerContent, NSpace, NInput, NButton } from 'naive-ui'
import { marked } from 'marked'

const props = defineProps({ show: Boolean })
const emit = defineEmits(['update:show'])

const messagesContainer = ref(null)

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}


const renderMarkdown = (text) => {
  try {
    return marked.parse(text)
  } catch {
    return text // fallback
  }
}

const visible = ref(props.show)
watch(
  () => props.show,
  (v) => (visible.value = v),
)
watch(visible, (v) => emit('update:show', v))

const input = ref('')
const messages = ref([])
const loading = ref(false)

const send = async () => {
  if (!input.value.trim()) return
  const userMessage = { role: 'user', content: input.value }
  messages.value.push(userMessage)
  scrollToBottom()
  input.value = ''
  loading.value = true

  try {
    const res = await fetch('http://localhost:4000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ message: userMessage.content }),
    })
    const data = await res.json()
    messages.value.push({ role: 'assistant', content: data.response })
    scrollToBottom()
  } catch {
    messages.value.push({ role: 'assistant', content: 'Ошибка при получении ответа.' })
    scrollToBottom()
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.chat-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding-right: 4px;
  margin-bottom: 10px;
}

.message {
  margin-bottom: 10px;
}

.chat-footer {
  border-top: 1px solid #ddd;
  padding-top: 10px;
  background: white;
  position: sticky;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

</style>
