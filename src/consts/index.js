const OPTIONS_TYPE_ARRAY = 'OPTIONS_TYPE_ARRAY'
const OPTIONS_TYPE_KEY_VALUE_NORMAL = 'OPTIONS_TYPE_KEY_VALUE_NORMAL'
const OPTIONS_TYPE_KEY_VALUE_LOCALIZED = 'OPTIONS_TYPE_KEY_VALUE_LOCALIZED'

export const OPTIONS_TYPES = {
	'ARRAY': OPTIONS_TYPE_ARRAY,
	'NORMAL': OPTIONS_TYPE_KEY_VALUE_NORMAL,
	'LOCALIZED': OPTIONS_TYPE_KEY_VALUE_LOCALIZED
}

export const STATES = {
	'PRISTINE': 0,	// entry was not interacted yet
	'UNTOUCHED': 1,	// entry not lost focus yet
	'TOUCHED': 2,		// entry lost focus at least once
	'DIRTY': 3			// interaction occured with entry
}
