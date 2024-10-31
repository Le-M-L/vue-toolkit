<script setup lang="ts">
import { useMouse } from '@vue-toolskit/core'

const { x, y } = useMouse()
</script>

<template>
  <div>{{ x }}, {{ y }}</div>
</template>
