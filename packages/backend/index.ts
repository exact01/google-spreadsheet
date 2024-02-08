import { startServer } from './server/server'
import { SERVER_PORT } from './utils/constants'

startServer().then(() => {
    console.log(`Server has been started, PORT ${SERVER_PORT}`)
}).catch(e => {
    console.log('Server failRule' + e)
})