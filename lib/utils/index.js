export function optionalChaining(obj, chain) {
	return chain.split('.').reduce(function (acc, val) {
		return acc ? acc[val] : undefined
	}, obj)
}
