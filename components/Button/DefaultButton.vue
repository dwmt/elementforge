<template>
<button :class="modifier" :disabled="disabled" :name="name" >
  <span v-if="!isLoading">{{ text }}</span>
  <span v-else>Loading...</span>
</button>
</template>
<script>
import Componentable from '../Componentable'
export default {
  name: 'DefaultButton',
  extends: Componentable,
  props: [
    'data',
    'text',
    'disabled',
    'isLoading'
  ],
  methods: {
    click (e) {
      if (!this.isValid || this.disabled) {
        return
      }
      this.$emit('click', {event: e, data: this.data})
    }
  }
}
</script>
<style>

</style>
