<script setup lang="ts">
import { sidebarTheme } from '/@src/state/sidebarLayoutState'
import TableCategories from '../components/table/table.vue'
import SidebarLayout from '../../layouts/admin-layout/SidebarLayout.vue'
</script>

<template>
  <SidebarLayout :theme="sidebarTheme" close-on-change default-sidebar="layout">
    <!-- Content Wrapper -->
    <div class="page-content-inner">
      <TableCategories />
    </div>
  </SidebarLayout>
</template>
