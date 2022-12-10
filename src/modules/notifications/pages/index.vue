<script setup lang="ts">
import { sidebarTheme } from '/@src/state/sidebarLayoutState'
import Resume from '../components/resume.vue'
</script>

<template>
  <SidebarLayout :theme="sidebarTheme" close-on-change default-sidebar="layout">
    <!-- Content Wrapper -->
    <div class="page-content-inner">
      <Resume />
    </div>
  </SidebarLayout>
</template>
