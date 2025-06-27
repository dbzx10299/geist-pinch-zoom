# Geist Pinch Zoom

An opinionated pinch zoom component for Vue.

## Install

```bash
npm i geist-pinch-zoom
```

## Usage

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
    <img src="/image.webp"/>
  </PinchZoom>
</template>
```

## Licenses

This project is licensed under the [MIT License](LICENSE).