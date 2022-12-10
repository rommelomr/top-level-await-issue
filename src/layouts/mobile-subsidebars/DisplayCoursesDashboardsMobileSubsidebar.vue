<script setup lang="ts"></script>
<template>
  <div class="mobile-subsidebar">
    <div class="sidebar-panel is-generic scrollable">
      <div class="subpanel-header">
        <h3 class="no-mb">Capítulos</h3>
        <div class="panel-close" @click="emit('close')">
          <i aria-hidden="true" class="iconify" data-icon="feather:x"></i>
        </div>
      </div>
      <div data-simplebar>
        <ChaptersAccordion :items="data" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/layout/_sidebar-mobile.scss';
</style>
