import { InjectionKey } from 'vue'
import { Furnace } from './Furnace'

export const hasSymbol =
  typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol'

export const PolySymbol = (name: string) =>
  hasSymbol
    ? Symbol(name)
    : ('_ef_') + name

export const furnaceKey = PolySymbol('f') as InjectionKey<Furnace>
