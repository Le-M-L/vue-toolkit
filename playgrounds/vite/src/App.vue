<script setup lang="ts" >
import { $t, loadLocaleMessages } from '../src/locales/index'
// import axios from 'axios'
const handleClick = () => {
  loadLocaleMessages('en-US')
}

</script>

<template>
  <div>
     {{ $t('ui.test') }}
     
     <!-- <d.UIButton></d.UIButton>  -->
    <button @click="handleClick" >测试</button>
  
  </div>
</template>
