import Emitter from 'tiny-emitter'

export class CommunicationBus extends Emitter {}

const bus = new CommunicationBus()
// bus.setMaxListeners(0)

export default bus
