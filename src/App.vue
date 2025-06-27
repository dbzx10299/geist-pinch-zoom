<script setup lang="ts">
import { PinchZoom } from '../lib/index.ts'
// import { PinchZoom } from '../dist'
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
      srcset=""
      src="/shoes.webp"
      style="position: relative; width: 100%; display: block; height: auto; max-width: 100%; text-align: center;"
    />
  </PinchZoom>
</template>