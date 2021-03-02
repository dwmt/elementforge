<template lang="pug">
ul(class="flex list-reset border border-smoke-light rounded w-auto font-sans", v-if="totalPages > 1")
	li
		a(class="block border-r px-3 py-2 paginator-page", @click="goToPrevious" :class="{'disabled': !isPreviousActionable}") Previous
	li(v-for="pageNumber in pageNumbers")
		a(class="block border-r px-3 py-2 paginator-page", @click="goToPage(pageNumber)" :class="{'active': pageNumber == modelValue}") {{pageNumber}}
	li
		a(class="block px-3 py-2  paginator-page", @click="goToNext", :class="{'disabled': !isNextActionable}") Next

</template>

<script>
import Props from '../../props/index.js'
import Events from '../../events/index.js'
import RenderableComponent from "../RenderableComponent.vue";

export default {
	name: 'DefaultPaginator',
	extends: RenderableComponent,
	props: Props.Paginator.renderable,
	emits: Events.Paginator.renderable,
	computed: {
		pageNumbers () {
			let delta = 2,
			left = this.modelValue - delta,
			right = this.modelValue + delta + 1,
			result = [];

			const length = (parseInt(this.modelValue) + 2 > parseInt(this.totalPages)) ? parseInt(this.totalPages) : parseInt(this.modelValue) + 2

			result = Array.from({length: length }, (v, k) => k + 1).filter(i => i && i >= left && i < right);

			return result;
		},
		isPreviousActionable () {
			return this.modelValue > 1
		},
		isNextActionable () {
			return this.modelValue != this.totalPages
		}
	},
	methods: {
		goToRoute (e) {
			const page = e.currentTarget.getAttribute('page')
			if (parseInt(page) !== parseInt(this.modelValue)) {
				this.$emit('update:modelValue', page)
			}
		},
		goToNext () {
			const nextPage = parseInt(this.modelValue) + 1
			if (parseInt(nextPage) <= parseInt(this.totalPages)) {
				this.$emit('update:modelValue', nextPage)
			}
		},
		goToPrevious () {
			const prevPage = parseInt(this.modelValue) - 1
			if (parseInt(prevPage) >= 1) {
				this.$emit('update:modelValue', prevPage)
			}
		}
	}
}
</script>
