<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { codeToHtml, addClassToHast } from 'shiki'
import { createCssVariablesTheme } from 'shiki/core'

const {
  code,
  lang,
  highlights
} = defineProps<{
  code?: string;
  lang?: string;
  highlights?: number[]
}>()

const cssVarsTheme = createCssVariablesTheme({ 
  name: 'css-variables',
  variablePrefix: '--shiki-',
  variableDefaults: {},
  fontStyle: true
})

const html = ref<string | null>(null)

onMounted(async () => {
  if (!code || !lang) return

  html.value = await codeToHtml(
    code.trim(),
    {
      lang,
      theme: cssVarsTheme,
      transformers: [
        {
          line(node, line) {
            if (highlights?.includes(line)) {
              addClassToHast(node, 'highlighted')
            }
          }
        }
      ]
    },
  )
})

const isOpen = ref(false)
</script>

<template>
  <div class="mt-7">
    <div class="bg-[#0a0a0a] group relative rounded-lg border border-[#242424] overflow-hidden">
      <div class="flex w-full overflow-x-auto md:overflow-visible">
        <div class="w-full p-6">
          <slot name="preview"/>
        </div>
      </div>

      <div
        v-if="code"
        class="bg-[#000] relative flex items-center rounded-b-lg border-t border-[#2e2e2e]"
      >
        <div :data-state="isOpen ? 'open' : 'closed'" class="border-b-lg w-full">
          <button
            type="button"
            :aria-expanded="isOpen"
            :data-state="isOpen ? 'open' : 'closed'"
            class="focus-visible:shadow-focus-ring flex h-[48px] w-full cursor-pointer items-center gap-3 rounded-b-lg px-4 text-left font-sans text-sm focus:outline-none"
            @click="isOpen = !isOpen"
          >
            <div
              :class="{
                'rotate-[-90deg]': !isOpen,
                'rotate-[0deg]': isOpen
              }"
            >
              <svg
                height="16"
                stroke-linejoin="round"
                viewBox="0 0 16 16"
                width="16"
                style="color: currentcolor;"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.0607 6.74999L11.5303 7.28032L8.7071 10.1035C8.31657 10.4941 7.68341 10.4941 7.29288 10.1035L4.46966 7.28032L3.93933 6.74999L4.99999 5.68933L5.53032 6.21966L7.99999 8.68933L10.4697 6.21966L11 5.68933L12.0607 6.74999Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            {{ isOpen ? 'Hide code': 'Show code' }}
          </button>

          <div
            :data-state="isOpen ? 'open' : 'closed'"
            class="max-h-[440px] overflow-auto"
            :style="{
              ...(isOpen && {
                'border-top': '1px solid hsl(0 0% 12%)'
              })
            }"
          >
            <div
              v-if="isOpen"
              v-html="html"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  padding: 0 1rem;
  background: #000;
  color: #a1a1a1;
}
</style>