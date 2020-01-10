import {shallowMount} from '@vue/test-utils'
import Sample from './Sample.vue'
const chai = require('chai')
const expect = chai.expect

describe('Sample compoent', () => {
	it('Should render a vue component', () => {
		const wrapper = shallowMount(Sample)
		expect(wrapper.isVueInstance()).true
		expect(wrapper.name()).to.be.equal('Sample')
	})
})
