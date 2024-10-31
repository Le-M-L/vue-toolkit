<script setup lang="ts">
import { useMouse } from '@toolkit/core'

const { x, y } = useMouse()
</script>

<template>
  <div>{{ x }}, {{ y }}</div>
</template>
