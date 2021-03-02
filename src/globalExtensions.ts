import {Furnace} from './Furnace'
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    /**
     * {@link Furnace} instance used by the application.
     */
    $furnace: Furnace
  }
}
