<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { useViewWrapper } from '/@src/store/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Jobs')

useHead({
  title: 'Jobs - Navbar - Vuero',
})
</script>

<template>
  <div class="page-content-inner">
    <JobsDashboard />
  </div>
</template>
