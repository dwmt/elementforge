import { Theme } from './theme/Theme'
import { Furnace, createFurnace } from './Furnace'
import { useFurnace } from './composition'

import RenderableComponent from './components/RenderableComponent.vue'

import props from './props/index'
import evts from './events/index'

export default {
  Theme,
  Furnace,
  createFurnace,
  useFurnace,
  RenderableComponent,
  components: props,
  events: evts
}
