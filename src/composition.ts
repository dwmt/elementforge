import { inject } from 'vue'
import { furnaceKey } from './symbols'
import { Furnace } from './Furnace'

export function useFurnace(): Furnace {
  return inject(furnaceKey)!
}
