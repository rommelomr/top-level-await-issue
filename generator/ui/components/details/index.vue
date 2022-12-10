<template>
  <V-Card radius="small" elevated>
    <div class="card-head">
      <V-Block
        :title="store.selectedItem.name"
        subtitle=""
        center
        class="no-margin"
      >
      </V-Block>
      <V-Field grouped>
        <V-Control>
          <V-SwitchSegment
            v-model="store.selectedItem.isActive"
            label-true=""
            label-false="Activo"
            color="success"
            disabled
          />
        </V-Control>
      </V-Field>
    </div>

    <div class="">
      <p>
        {{ store.selectedItem.description }}
      </p>
    </div>
  </V-Card>
</template>

<script setup lang="ts">
import { __name__PascalCase__ } from '../../interfaces/categories-interfaces'
import { use__name__PascalCase__Store } from '../../store/__name__PascalCase__.store'
const store = use__name__PascalCase__Store()
const item = store.selectedItem
</script>

<style lang="scss" scoped>
@import '../../../../../src/scss/abstracts/_variables.scss';
@import '../../../../../src/scss/abstracts/_mixins.scss';

.leftButton {
  margin-left: auto !important;
  min-width: 140px;
}
</style>
