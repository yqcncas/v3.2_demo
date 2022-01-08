<template>
  <div class="hamburger-container" @click="toggleClick" id="guide-hamburger">
    <svg-icon class="hamburger" :icon="icon"></svg-icon>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const icon = computed(() => {
  return store.getters.siderOpenFlag ? 'hamburger-opened' : 'hamburger-closed'
})

const toggleClick = () => {
  store.commit('app/trigger')
}
</script>

<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;
  transform: translateY(2px);
  .hamburger {
    display: inline-block;
    vertical-align: middle;

    width: 20px;
    height: 20px;
  }
}
</style>
