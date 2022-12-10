<script setup lang="ts">
import { sidebarTheme } from '/@src/state/sidebarLayoutState'
</script>

<template>
  <SidebarLayout :theme="sidebarTheme" close-on-change default-sidebar="layout">
    <!-- Content Wrapper -->
    <div class="page-content-inner"></div>
  </SidebarLayout>
</template>
