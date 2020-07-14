<template>
<div>
	<slot></slot>
</div>
</template>

<script>
import Props from '../../props/index.js'
import RenderableComponent from "../RenderableComponent.vue";

export default {
	name: 'DefaultInputGroup',
	extends: RenderableComponent,
	props: Props.InputGroup.renderable
}
</script>
