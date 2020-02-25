<template lang="pug">
.label-container
	.label-title {{ label }}
	.label-text {{ value }}
</template>

<script>
import ElementForgeTheme from '@dwmt/elementforge-theme'

export default {
	name: 'DefaultLabel',
	extends: ElementForgeTheme.RenderableComponent,
	props: ElementForgeTheme.props.Label.renderable
}
</script>
