<script setup lang="ts">
import HelloWorld from '../../components/HelloWorld.vue';

const openSidePanel = async () => {
  const currentWindow = await chrome.windows.getCurrent();
  if (currentWindow.id !== undefined) {
    await chrome.sidePanel.open({ windowId: currentWindow.id });
  }
  window.close();
};
</script>

<template>
  <!-- Update here to see changes -->
  <HelloWorld msg="Vite + Vue" />
  <button type="button" @click="openSidePanel">Open Side Panel</button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
