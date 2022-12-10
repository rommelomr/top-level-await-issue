<script setup lang="ts">
import { sidebarTheme } from '/@src/state/sidebarLayoutState'
import __name__PascalCase__Table from '../components/table/table.vue'
import SidebarLayout from '../../layouts/admin-layout/SidebarLayout.vue'
</script>

<template>
  <SidebarLayout :theme="sidebarTheme" close-on-change default-sidebar="layout">
    <!-- Content Wrapper -->
    <div class="page-content-inner"><__name__PascalCase__Table /></div>
  </SidebarLayout>
</template>
