<script setup>
import { ref, Teleport } from 'vue'
import CodePreview from './.vitepress/components/CodePreview.vue'
import GeistModal from './.vitepress/components/GeistModal.vue'
import CloseIcon from './.vitepress/components/CloseIcon.vue'
import { PinchZoom } from '../lib'

const code = `
<script setup lang=\"ts\">
import { PinchZoom } from 'geist-pinch-zoom'
<\/script>

<template>
  <div style="position: fixed; left: 0; top: 0; display: flex; height: 100%; width: 100%; justify-content: center; z-index: 999;">
    <div style="z-index: 999; align-items: center; position: relative; height: 100%; width: 100%; display: flex; flex-direction: column; outline: none;">
      <div style="margin: 0; padding: 0; display: flex; flex-direction: column; height: 100%; transform: translateZ(0); overflow-x: hidden; overflow-y: scroll;">
        <PinchZoom
          initialScale="auto"
          minScale="auto"
          :maxScale="3"
          :zoomTolerance="0.3"
          :aspectRatio="0.693"
        >
          <img
            :width="image.width"
            :height="image.height"
            :srcset="\`
              \${image.url}&width=375,
              \${image.url}&width=750 2x,
              \${image.url}&width=1125 3x
            \`"
            :src="\`\${image.url}\`"
            :alt="image.altText"
            :sizes="\`
              (min-width: 1024px) 35vw,
              100vw
            \`"
            decoding="async"
          />
        </PinchZoom>
      </div>
    </div>
  </div>
</template>
`

const showModal = ref(false)
</script>

# Getting Started

Geist Pinch Zoom is a lightweight, performant, and simple pinch zoom component for Vue perfect for e-commerce or photography sites.

## Installation

```sh
npm i geist-pinch-zoom
```

## Create a Pinch Zoom component

In order to get the zoom viewport setup correctly, there is only one required prop `aspectRatio`. Simply divide the image `width` by `height` to get the correct aspect ratio.

```vue
<script setup lang="ts">
import { PinchZoom } from 'geist-pinch-zoom'
</script>

<template>
  <PinchZoom
    initialScale="auto"
    minScale="auto"
    :maxScale="3"
    :zoomTolerance="0.3"
    :aspectRatio="0.693"
  >
    <img
      :width="image.width"
      :height="image.height"
      :srcset="`
        ${image.url}&width=375,
        ${image.url}&width=750 2x,
        ${image.url}&width=1125 3x
      `"
      :src="`${image.url}`"
      :alt="image.altText"
      :sizes="`
        (min-width: 1024px) 35vw,
        100vw
      `"
      decoding="async"
    />
  </PinchZoom>
</template>
```

## Examples

<CodePreview
  lang="vue"
  :code
>
  <template #preview>
    <button
      class="btn"
      @click="showModal = !showModal"
    >
      open zoom
    </button>
    <Teleport to="body">
      <GeistModal
        v-if="showModal"
        :showModal="showModal"
        @close="() => {
          showModal = false
        }"
      >
        <template #closeButton="{ onClick }">
          <button class="geist-close_btn" style="color: #000; z-index: 9999; height: 20px; width: 20px;" @click="onClick">
            <CloseIcon />
          </button>
        </template>
        <template #content="{ onHandleClose }">
          <div style="position: fixed; left: 0; top: 0; display: flex; height: 100%; width: 100%; justify-content: center; z-index: 999;">
            <div style="z-index: 999; align-items: center; position: relative; height: 100%; width: 100%; display: flex; flex-direction: column; outline: none;">
              <div style="margin: 0; padding: 0; display: flex; flex-direction: column; height: 100%; transform: translateZ(0); overflow-x: hidden; overflow-y: scroll;">
                <PinchZoom
                  initialScale="auto"
                  minScale="auto"
                  :maxScale="3"
                  :zoomTolerance="0.3"
                  :aspectRatio="0.693"
                >
                  <img
                    srcset=""
                    src="/shoes2.webp"
                    style="position: relative; width: 100%; display: block; height: auto; max-width: 100%; text-align: center;"
                  />
                </PinchZoom>
              </div>
            </div>
          </div>
        </template>
      </GeistModal>
    </Teleport>
  </template>
</CodePreview>

## API Reference

```ts
interface PinchZoomProps {
  /**
   * how much the image should zoom on each double tap.
   */
  zoomTolerance?: number;
  initialScale?: 'auto' | number;
  minScale?: 'auto' | number;
  maxScale?: number;
  aspectRatio: number;
  onZoomChange?: (scale: number) => void;
}
```