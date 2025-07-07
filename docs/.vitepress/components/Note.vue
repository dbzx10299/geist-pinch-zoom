<script setup lang="ts">
type NoteProps = {
  gap?: number;
  size?: 'small';
  type?: 'warning';
}

const { gap = 12, ...props } = defineProps<NoteProps>()

</script>

<template>
  <div
    :class="[
      'note',
      {
        small: size === 'small'
      }
    ]"
  >
    <div
      class="content"
      :style="`gap: ${gap}px `"
    >
      <span style="display: flex; height: 16px;">
        <svg
          v-if="type === 'warning'"
          height="16"
          stroke-linejoin="round"
          viewBox="0 0 16 16"
          width="16"
          style="width: 16px; height: 16px;"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.55846 2H7.44148L1.88975 13.5H14.1102L8.55846 2ZM9.90929 1.34788C9.65902 0.829456 9.13413 0.5 8.55846 0.5H7.44148C6.86581 0.5 6.34092 0.829454 6.09065 1.34787L0.192608 13.5653C-0.127943 14.2293 0.355835 15 1.09316 15H14.9068C15.6441 15 16.1279 14.2293 15.8073 13.5653L9.90929 1.34788ZM8.74997 4.75V5.5V8V8.75H7.24997V8V5.5V4.75H8.74997ZM7.99997 12C8.55226 12 8.99997 11.5523 8.99997 11C8.99997 10.4477 8.55226 10 7.99997 10C7.44769 10 6.99997 10.4477 6.99997 11C6.99997 11.5523 7.44769 12 7.99997 12Z"
            fill="currentColor"
          />
        </svg>

        <svg v-else height="16" stroke-linejoin="round" viewBox="0 0 16 16" width="16" style="color: currentcolor;">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM6.25 7H7H7.74999C8.30227 7 8.74999 7.44772 8.74999 8V11.5V12.25H7.24999V11.5V8.5H7H6.25V7ZM8 6C8.55229 6 9 5.55228 9 5C9 4.44772 8.55229 4 8 4C7.44772 4 7 4.44772 7 5C7 5.55228 7.44772 6 8 6Z" fill="currentColor"></path>
        </svg>
      </span>

      <span>
        <slot/>
      </span>
    </div>

    <div v-if="$slots.action">
      <slot name="action" />
    </div>
  </div>
</template>

<style scoped>
.note {
  padding: 8px 12px;
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 40px;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.5;
  word-break: break-word;
  box-sizing: border-box;
  border: 1px solid hsl(0 0% 18%);
  background: transparent;
  color: hsl(0 0% 63%);
}

.note.small {
  padding: 6px 8px;
  min-height: 34px;
  font-size: 13px;
  border-radius: 6px;
}

.content {
  display: flex;
  align-items: center;
  margin: 0;
}
</style>