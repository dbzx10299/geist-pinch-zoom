<script setup>

</script>

<template>
  <div class="wrapper">
    <svg aria-hidden="true"><defs><pattern id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse"><path d="M100 200V.5M.5 .5H200" fill="none"></path></pattern></defs><rect width="100%" height="100%" stroke-width="0" fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"></rect></svg>
    <div class="wrapper-inner">
      <h1>Geist Pinch Zoom</h1>
      <p>A pinch zoom component for Vue.</p>
      <a href="/getting-started">Documentation</a>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  position: relative;
  min-height: 75vh;
}

.wrapper-inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 24px;
  max-width: 700px;
  text-align: center;
}

svg {
  mask-image: radial-gradient(100% 100% at top center,#fff,transparent);
  position: absolute;
  height: 100%;
  width: 100%;
  inset: 0;
  stroke: hsl(0 0% 12%);
  max-width: 100%;
}

h1 {
  color: #ededed;
  font-size: 48px;
  line-height: 1;
}

p {
  font-size: 20px;
  color: #888;
}

a {
  color: #ededed;
  text-decoration: underline;
  font-weight: 400;
  font-size: 16px;
}
</style>