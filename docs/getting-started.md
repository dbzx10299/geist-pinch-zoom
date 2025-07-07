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
`;

const code2 = `
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
          flexDirection: 'column',
          maxHeight: 'calc(100svh - 96px)'
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
`;

const showModal = ref(false)
const showModal2 = ref(false)
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

Simply divide image `width` by `height` to get the correct aspect ratio.

<Note>
When dividing the image <code>width</code> by <code>height</code>, make sure to use the <strong style="color: #ededed;">intrinsic</strong> image dimensions. This can be found in DevTools when inspecting the image.
</Note>

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

### Full Screen

By default when you create a pinch zoom, the zoom viewport will be the height of the screen.

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

### Restricted Height

If you want to restrict the zoom viewport height so that it's smaller and centered, just add `max-height` CSS property.

<CodePreview
  lang="vue"
  :code="code2"
  :highlights="[16]"
>
  <template #preview>
    <button
      class="btn"
      @click="showModal2 = !showModal2"
    >
      open zoom
    </button>
    <Teleport to="body">
      <GeistModal
        v-if="showModal2"
        :showModal="showModal2"
        @close="() => {
          showModal2 = false
        }"
      >
        <template #closeButton="{ onClick }">
          <button
            @click="onClick"
            class="geist-close_btn" style="color: #000; z-index: 9999; height: 24px; width: 24px;"
          >
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
              flexDirection: 'column',
              maxHeight: 'calc(100svh - 96px)'
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