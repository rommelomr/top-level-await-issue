<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
//import { SingleCollapse } from '/@src/modules/components/collapses/SingleCollapse.vue'
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits([])
onMounted(() => {
  //
})
</script>

<template>
  <div><SingleCollapse /></div>
</template>