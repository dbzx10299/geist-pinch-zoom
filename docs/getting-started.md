<script setup>
import { ref, Teleport } from 'vue'
import CodePreview from './.vitepress/components/CodePreview.vue'
import GeistModal from './.vitepress/components/GeistModal.vue'
import CloseIcon from './.vitepress/components/CloseIcon.vue'
import { PinchZoom } from '../lib'
import Note from './.vitepress/components/Note.vue'

const code = `
<script setup lang=\"ts\">
import { PinchZoom } from 'geist-pinch-zoom'
<\/script>

<template>
  <GeistModal v-if="showModal">
    <template #content">
      <div
        :style="{
          alignItems: 'center',
          position: 'relative',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        }"
      >
        <PinchZoom
          initialScale="auto"
          minScale="auto"
          :maxScale="3"
          :zoomTolerance="0.3"
          :aspectRatio="0.693"
        >
          <img
            src="/shoes.webp"
            :style="{
              position: 'relative',
              width: '100%',
              display: 'block',
              height: 'auto',
              maxWidth: '100%',
              textAlign: 'center'
            }"
          />
        </PinchZoom>
      </div>
    </template>
  </GeistModal>
<template>
`

const showModal = ref(false)
</script>

# Getting Started

Geist Pinch Zoom is a lightweight, performant, and simple pinch zoom component for Vue perfect for e-commerce sites.

## Installation

```sh
npm i geist-pinch-zoom
```

## Create a Pinch Zoom component

<Note type="warning">
<code>aspectRatio</code> is a required prop to ensure the zoom viewport is setup correctly.
</Note>

Simply divide the image `width` by `height` to get the correct aspect ratio, or inspect the image in dev tools and look at its intrinsic width and height.

```vue {11}
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
      :width="data.image.width"
      :height="data.image.height"
      :srcset="`
        ${data.image.url}&width=375,
        ${data.image.url}&width=750 2x,
        ${data.image.url}&width=1125 3x
      `"
      :sizes="`
        (min-width: 1024px) 35vw,
        100vw
      `"
      :src="`${data.image.url}`"
      :alt="data.image.altText"
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
          <button class="geist-close_btn" style="color: #000; z-index: 9999; height: 24px; width: 24px;" @click="onClick">
            <CloseIcon />
          </button>
        </template>
        <template #content="{ onHandleClose }">
          <div
            :style="{
              alignItems: 'center',
              position: 'relative',
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column'
            }"
          >
            <PinchZoom
              initialScale="auto"
              minScale="auto"
              :maxScale="3"
              :zoomTolerance="0.3"
              :aspectRatio="0.6923"
            >
              <img
                src="/shoes2.webp"
                :style="{
                  position: 'relative',
                  width: '100%',
                  display: 'block',
                  height: 'auto',
                  maxWidth: '100%',
                  textAlign: 'center'
                }"
              />
            </PinchZoom>
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