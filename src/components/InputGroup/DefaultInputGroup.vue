<template>
<div>
	<slot></slot>
</div>
</template>

<script>
import ElementForgeTheme from '@dwmt/elementforge-theme'

export default {
	name: 'DefaultInputGroup',
	extends: ElementForgeTheme.RenderableComponent,
	props: ElementForgeTheme.props.InputGroup.renderable
}
</script>
