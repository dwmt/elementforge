const EventEmitter = require('events')

export class CommunicationBus extends EventEmitter {}

const bus = new CommunicationBus()
bus.setMaxListeners(0)

export default bus
