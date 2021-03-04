<template lang="pug">
#app.p-4
	h1.mt-12
		span Components
	h2
		span Buttons
	h3
		span Line button
	div
		Button(text="Example Line Button", @click="alertBox")
		Button.max-10(text="Previous", :properties="{icon: {left: 'nlv8-prev'}, animation: {name: 'sliding', direction: 'left'}}", :modifiers="['block']", @click="alertBox")
		Button.max-10(text="Next", :properties="{icon: {right: 'nlv8-next'}, animation: {name: 'sliding', direction: 'right'}}", @click="alertBox")
		Button.max-10(text="Disabled", :properties="{icon: {right: 'nlv8-arrow-right'}, animation: {name: 'sliding', direction: 'right'}}", :disabled="true", @click="alertBox")
		Button.max-10(text="Next", :properties="{icon: {right: 'nlv8-next'}, keyframe: 'righter'}", @click="alertBox")
		Button(text="Loading button", @click="alertBox", ref="loadingButton")
	h3
		span Rounded button

	div
		Button.max-10(appearance="rounded", text="Hi i'm rounded!", @click="alertBox")
	h2
		span TextArea
	h3
		span Default

	div
		Textarea(v-model="textarea" maxlength="100" :required="true", label="textarea")

	h2
		span Checkbox
	h3
		span Default
	div
		div {{ normalCheckbox }}
		Checkbox(v-model="normalCheckbox", label="Some random label")
		Checkbox(v-model="normalCheckbox", label="Some random label", :disabled="true").my-2
	h3
		span Toggle
	div
		div {{ toggle }}
		Checkbox(v-model="toggle", appearance="toggle", label="Whatever").mt-2
		Checkbox(v-model="toggle", appearance="toggle", label="Whatever", :modifiers="['slim']").mt-2
		Checkbox(v-model="toggle", appearance="toggle", label="Whatever", :modifiers="['narrow']").mt-2
		Checkbox(v-model="toggle", appearance="toggle", label="Whatever", :disabled="true").mt-2

	h2
		span Radio
	h3
		span Default
	div
		div {{ normalRadio }}
		Radio(v-model="normalRadio", name="normalRadio", label="Some random label", data="1")
		Radio(v-model="normalRadio", name="normalRadio", label="Some random label", data="2").my-2
		Radio(v-model="normalRadio", label="Disabled radio", :disabled="true", data="1").my-2
	h2
		span RadioGroup
	h3
		span Default
	div
		div {{ normalRadioGroup }}
		RadioGroup(v-model="normalRadioGroup", label="Is it true?")
			Radio(:data="true", label="Yes")
			Radio(:data="false", label="No")
		RadioGroup(v-model="normalRadioGroup", label="Is it true?", :disabled="true")
			Radio(:data="true", label="Yes")
			Radio(:data="false", label="No")
		RadioGroup(v-model="normalRadioGroup", label="Is it true?")
			Radio(:data="true", label="Yes")
			Radio(:data="false", label="No")
			Radio(:data="123", label="Disabled", :disabled="true")

	h2
		span Selection
	h3
		span Default
	div(class="w-1/3")
		div {{ selectArray }}
		Select.mb-4(v-model="selectArray" :options="optionsArray" label="Array selection")
		div {{ selectKeyValue }}
		Select.mb-4(v-model="selectKeyValue" :options="optionsKeyValue" label="Key Value Selection", :required="true")
		div {{ selectKeyValueLang }}
		Select.mb-4(v-model="selectKeyValueLang" :options="optionsKeyValueLang" label="Localized Key Value Selection")
		div {{ selectObject }}
		Select.mb-4(v-model="selectObject" :options="optionsObject" label="Object value of seleciton")
		Select.mb-4(v-model="selectObject" :options="optionsObject" label="Disabled selection", :disabled="true")
		Select.mb-4(v-model="selectObject" :options="optionsObject" label="Disabled selection", :isValid="false", :errors="['Example error']")
		div {{ narrowSelectObject }}
		Select.mb-4(class=" w-1/4",v-model="narrowSelectObject" :options="narrowOptionsObject" label="Narrow selection")

	h2
		span Label
	h3
		span Default
	div(class="w-1/3")
		Label(label="First Name", value="John", :modifiers="['inline']")
		Label(label="Last Name", value="Doe", :modifiers="['inline']")
		Label(label="Telephone", value="+36309660669")
		Label(value="Hi! I'm labelless")

	h2
		span Sorter
	h3
		span Default
	div(class="w-1/3")
		Sorter(label="SortIt", v-model="sortKey")
		Sorter(label="SortIt", v-model="sortKey", :disabled="true")
		ul
			li(v-for="item in sortableArray") {{ item }}
	h2
		span Input
	h3
		span Default
	div(class="w-1/3")
		div {{ normalInput }}
		Input(
			label="Normal Input",
			v-model="normalInput",
			name="normalInput",
			@input="write('inputting')",
			@focus="write('focusing')",
			@blur="write('blurring')",
			@click="write('clicking')",
			@keyup.enter="write('enter')",
			@keydown.esc="write('esc')",
		)
		Input(label="Valid", v-model="validInput", name="normalInput", :isValid="true")
		Input(label="Invalid", v-model="invalidInput", name="invalidInput", :isValid="false", :errors="['This input is required!']")
		Input(label="Disabled", name="disabledInput", value="This is disabled" :disabled="true")

	h2
		span Autocomplete
	h3
		span Default
	div(class="w-1/3")
		Autocomplete(v-model="autocompleteDefaultStringArray", :options="autocompleteStringArray", :autoFilter="true")
		Autocomplete(v-model="autocompleteDefaultObjectArray", :options="autocompleteObjectArray", :autoFilter="false", @filter="autocompleteFilterFunction", behaviour="select")
		Autocomplete(class="w-1/4", v-model="narrowAutocomplete", :options="narrowAutocompleteOptions", :autoFilter="true")

	h2
		span Progress
	h3
		span Default
	div(class="w-1/3")
		Progress(v-model="defaultProgress", name="defaultProgress")
		.mt-5
		Progress(v-model="animatedProgress", name="animatedProgress", :animated="true")
	h2
		span Multiselect
	h3
		span Default
	div(class="w-1/3")
		Multiselect(v-model="arrayMultiSelect", :options="arrayMultiSelectOptions", name="defaultProgress")
		.mt-5
		Multiselect(v-model="objectMultiSelect", :options="objectMultiSelectOptions", name="defaultProgress")
		.mt-5
		Multiselect(v-model="patternMultiSelect", :options="patternMultiSelectOptions", name="defaultProgress")
	h2
		span DateTimePicker
	h3
		span Default
	div(class="w-2/3")
		div {{ date }}
		DateTimePicker(v-model="date", type="date", name="Date picker", :returnDate="true")
		DateTimePicker(v-model="date", type="date", name="Date picker", :returnDate="true")
		div {{ datetime }}
		DateTimePicker(v-model="datetime", type="datetime", name="DateTime picker", :returnDate="true")
		Button(text="Show picker", @click="showPicker = true")
		DateTimePicker(v-model="datetime", type="datetime", name="DateTime picker", :modal="true", v-if="showPicker", @close="showPicker = false")
	h2
		span DateTime
	h3
		span Default
	div(class="w-1/3")
		DateTime(v-model="dateInput", name="asd")
		DateTime(v-model="dateTimeInput", name="asd2", type="datetime")
		DateTime(v-model="dateInputYear", name="asd3", format="yyyy")
		div(class="transform translate-x-8")
			DateTime(v-model="dateInput", name="asd" label="Translated container")
	h3
		span Indefinite
	div(class="w-1/3")
		DateTime(v-model="indefiniteDateTime", name="asd")

	h2
		span TagInput
	h3
		span Default
	div(class="w-1/3")
		div {{ tags }}
		TagInput(v-model="tags")
		TagInput(v-model="tags", label="Tag Input")
	h2
		span Form
	div(class="w-1/3")
		Button(name="resetForm", @click="resetForm", appearance="rounded", text="reset form")
		Form(ref="form", v-model="form1", :rules="formValidationRules", :resetValue="{formInputOne: '', formInputTwo: ''}")
			Input(v-model="form1.formInputOne" name="formInputOne", label="input with label", :required="true")
			Input(v-model="form1.formInputTwo" name="formInputTwo")
			Textarea.mb-6(v-model="form1.formTextareaOne" name="formTextareaOne")
			Select.mb-6(v-model="form1.formSelectOne" :options="optionsArray" label="Array selection", name="formSelectOne")
			Multiselect.mb-4(v-model="form1.formMultiSelectOne" :options="arrayMultiSelectOptions" label="Multiselect", name="formMultiSelectOne")
			Button(name="Submit button", type="submit", @click="alertBox", appearance="rounded", text="submit")
		Button(name="Submit button", type="submit", @click="alertBox", appearance="rounded", text="submit", :formInstance="formRef")
	h2
		span Paginator
	h3
		span Default
	div(class="w-1/3")
		div {{ paginator }}
		Paginator(v-model="paginator", :totalPages="2")
		div {{ paginator2 }}
		Paginator(v-model="paginator2", :totalPages="12")
		div {{ paginator3 }}
		Paginator(v-model="paginator3", :totalPages="20")
	h2
		span Slider
	h3
		span Default
	div(class="w-1/3")
		Slider(:min="0", :max="100", v-model="sliderValue", :step="1")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'App',
	data () {
		return {
			sliderValue: 0,
			sortable: [2,4,3,1],
			sortKey: 0,
			narrowAutocomplete: '',
			narrowAutocompleteOptions: ['This is a long selection option for demonstration purposes', 'This is another long selection option for demonstration purposes'],
			autocompleteDefaultStringArray: '',
			autocompleteDefaultObjectArray: '',
			autocompleteStringArray: ['Almafa', 'Analfabeta', 'Betafa', 'Cetafa', 'Detafa', 'Kutyafa', 'Eperfa'],
			autocompleteObjectArray: [{key:'Extra long thing', value: '1'}, {key:'Not so long', value:'2'}, {key:'Five', value:'5'}, {key:'Six', value:'6'}],
			paginator: 1,
			paginator2: 12,
			paginator3: 10,
			formRef: null,
			isOK: true,
			textarea: 'Example text',
			select: 'c',
			normalCheckbox: true,
			toggle: true,
			selectKeyValue: '',
			selectKeyValueLang: '',
			selectArray: '',
			optionsKeyValue: [{key: 'A', value: 'a'},{key: 'B', value: 'b'},{key: 'C', value: 'c'}],
			optionsKeyValueLang: [{key: 'A', value: 'a'},{key: 'B', value: 'b'},{key: 'C', value: 'c'}],
			optionsArray: ['a', 'b', 'c'],
			selectObject: {name: 'huszar', age: 12},
			narrowSelectObject: {name: 'huszar', age: 12},
			optionsObject: [{key: 'Huszar', value: {name: 'huszar', age: 12}}, {key: 'Vilmos', value: {name: 'vili', age: 50}}],
			narrowOptionsObject: [{key: 'This is a long selection option for demonstration purposes', value: {name: 'huszar', age: 12}}, {key: 'This is another long selection option for demonstration purposes', value: {name: 'vili', age: 50}}],
			normalInput: '',
			validInput: 'good value',
			invalidInput: 'bad value',
			defaultProgress: 65,
			animatedProgress: 80,
			arrayMultiSelect: ['kiwi', 'korte'],
			arrayMultiSelectOptions: ['alma', 'korte', 'kiwi', 'narancs'],
			objectMultiSelect: ['alma'],
			objectMultiSelectOptions: [
				{
					key: 'Alma',
					value: 'alma'
				},
				{
					key: 'Körte',
					value: 'korte'
				},
				{
					key: 'Kiwi',
					value: 'kiwi'
				},
				{
					key: 'Narancs',
					value: 'narancs'
				}
			],
			patternMultiSelect: [{name: 'kaka', age: 15}, {name: 'Karoly', age: 80}],
			patternMultiSelectOptions: [
				{
					key: 'Kaka elvtárs',
					value: {name: 'kaka', age: 15}
				},
				{
					key: 'Gergely Elvtárs',
					value: {name: 'gergely', age: 23}
				},
				{
					key: 'Károly hadnagy',
					value: {name: 'Karoly', age: 80}
				}
			],
			date: null,
			datetime: null,
			showPicker: false,
			dateInput: null,
			dateTimeInput: null,
			dateInputYear: null,
			tags: [],
			formValidationRules: {
				formInputOne: { notblank: true, required: true},
				formInputTwo: {notblank:true, typeof: 'email'},
				formSelectOne: {notblank: true, required: true},
				formMultiSelectOne: {enforceLevel: true, _validator: { notblank: true }},
				formTextareaOne: {notblank: true, required: true}
			},
			form1: {
				formInputOne: '',
				formInputTwo: '',
				formTextareaOne: '',
				formSelectOne: '',
				formMultiSelectOne: []
			},
			progressInterval: null,
			normalRadio: false,
			normalRadioGroup: false,
			indefiniteDateTime: null
		}
	},
	computed: {
		sortableArray () {
			if (this.sortKey === 0) {
				return this.sortable
			}
			if (this.sortKey === 1) {
				return this.sortable.sort((a, b) => a - b)
			}
			if (this.sortKey === -1) {
				return this.sortable.sort((a, b) => b - a)
			}
		}
	},
	methods: {
		write (...params) {
			console.log('Writing: ', ...params)
		},
		autocompleteFilterFunction () {
			console.log('Filtering autocomplete input')
		},
		alertBox () {
			alert('Clicked')
		},
		resetForm () {
			this.$refs.form.resetForm()
		},
		startProgressInterval () {
			this.progressInterval = setInterval(() => {
				this.defaultProgress = Math.floor(Math.random() * 100) + 0
				this.animatedProgress = Math.floor(Math.random() * 100) + 0
			}, 1500)
		},
		stopProgressInterval () {
			clearInterval(this.progressInterval)
		}
	},
	mounted () {
		this.$refs.loadingButton.loader.work()
		this.formRef = this.$refs.form
		this.startProgressInterval()
	},
	beforeUnmount () {
		this.stopProgressInterval()
	}
})
</script>
