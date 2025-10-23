<template>
  <div class="msg" :class="message.author === 'me' ? 'mine' : 'theirs'">
    <div class="text">{{ message.text }}</div>
    <small class="time">{{ new Date(message.timestamp).toLocaleTimeString() }}</small>
  </div>
</template>

<script setup>
defineProps({ message: Object })
</script>

<style scoped>
.msg { max-width:80%; padding:10px 12px; border-radius:14px; }
.mine { align-self:flex-end; background:var(--primary); color:#062c49; }
.theirs { align-self:flex-start; background:#1f2937; color:#e2e8f0; }
.time { font-size:10px; opacity:0.6; }
</style>
