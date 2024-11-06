<script setup lang="ts" >
import { useAccessStore } from './store/index'
import { $t, loadLocaleMessages } from '../src/locales/index'
import { usePreference } from "@vue-toolskit/integrations";
import { requestClient } from './api/request'
// import axios from 'axios'
const handleClick = () => {
  loadLocaleMessages('en-US')
}
const c = usePreference()
console.log(c)
const accessStore = useAccessStore()
requestClient.get('https://taiyangapp.com/sun/business/resource?pageNum=1&pageSize=20&orderByColumn=dateTime&memberType=pc', {}, {
  isTransformResponse: false
})
.then(res => {
  console.log(res)
})

</script>

<template>
  <div>
     {{ $t('page.core.login') }}
     
     <!-- <d.UIButton></d.UIButton>  -->
    <button @click="handleClick" >测试</button>
  
  </div>
</template>
