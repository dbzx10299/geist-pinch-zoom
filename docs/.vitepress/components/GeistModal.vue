<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close'])

const modal = ref(null)

onMounted(() => {
  document.querySelector('body').style.cssText = `
    overscroll-behavior: contain;
    padding-left: 0px;
    padding-top: 0px;
    padding-right: 0px;
    margin-left: 0px;
    margin-top: 0px;
    touch-action: none;
    overflow: hidden !important;
    position: relative !important;
    margin-right: 0px !important;
  `
})

onUnmounted(() => {
  document.querySelector('body').removeAttribute('style')
})

function handleClose() {
  modal.value.style.cssText = `
    transition: opacity 200ms ease-in-out;
    opacity: 0;
  `

  setTimeout(() => emit('close'), 200)
}
</script>

<template>
  <div role="dialog" class="geist-dialog">
    <Transition name="fade" appear>
      <div ref="modal" v-if="showModal" class="geist-dialog_inner">
        <slot name="closeButton" :onClick="handleClose" />
        <slot name="content" :onHandleClose="handleClose" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease-in-out;
}

.geist-dialog {
  z-index: 999;
  position: fixed;
  inset: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.geist-dialog_inner {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: none;
  background: #fff;
  inset: 0;
  z-index: 1000;
}

:slotted(.geist-close_btn) {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 20px;
  min-height: 20px;
  margin: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
</style>