<script setup lang="ts">
import { useMouse } from '@toolskit/core'

const { x, y } = useMouse()
</script>

<template>
  <div>{{ x }}, {{ y }}</div>
</template>
