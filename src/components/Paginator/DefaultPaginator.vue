<template lang="pug">
ul(class="flex list-reset border border-smoke-light rounded w-auto font-sans", v-if="totalPages > 1")
	li
		a(class="block border-r px-3 py-2 paginator-page", @click="goToPrevious" :class="{'disabled': !isPreviousActionable}") Previous
	li(v-for="pageNumber in pageNumbers")
		a(class="block border-r px-3 py-2 paginator-page", @click="goToPage(pageNumber)" :class="{'active': pageNumber == currentPage}") {{pageNumber}}
	li
		a(class="block px-3 py-2  paginator-page", @click="goToNext", :class="{'disabled': !isNextActionable}") Next

</template>

<script>
import Props from '../../props/index.js'
import RenderableComponent from "../RenderableComponent.vue";

export default {
	name: 'DefaultPaginator',
	extends: RenderableComponent,
	props: Props.Paginator.renderable,
	computed: {
		pageNumbers () {
			let delta = 2,
			left = this.currentPage - delta,
			right = this.currentPage + delta + 1,
			result = [];

			let length = (parseInt(this.currentPage) + 2 > parseInt(this.totalPages)) ? parseInt(this.totalPages) : parseInt(this.currentPage) + 2

			result = Array.from({length: length }, (v, k) => k + 1).filter(i => i && i >= left && i < right);

			return result;
		},
		isPreviousActionable () {
			return this.currentPage > 1
		},
		isNextActionable () {
			return this.currentPage != this.totalPages
		}
	},
	methods: {
		goToRoute (e) {
			let page = e.currentTarget.getAttribute('page')
			if (parseInt(page) !== parseInt(this.currentPage)) {
				this.$emit('input', page)
			}
		},
		goToNext () {
			let nextPage = parseInt(this.currentPage) + 1
			if (parseInt(nextPage) <= parseInt(this.totalPages)) {
				this.$emit('input', nextPage)
			}
		},
		goToPrevious () {
			let prevPage = parseInt(this.currentPage) - 1
			if (parseInt(prevPage) >= 1) {
				this.$emit('input', prevPage)
			}
		}
	}
}
</script>
