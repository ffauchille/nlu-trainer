import * as restify from 'restify'
import * as corsMiddleware from 'restify-cors-middleware'
import routes from './routes';
import { onError } from './error';

var dotenv = require('dotenv');
dotenv.config({});

const server = restify.createServer()

const allowHeaders = (process.env.HTTP_ALLOW_HEADERS || "GET, OPTIONS, POST, DELETE").split(/,\s*/)
const allowOrigins = (process.env.HTTP_ALLOW_ORIGINS || "*").split(/,\s*/)
const exposeHeaders = (process.env.HTTP_EXPOSED_HEADERS || "GET, OPTIONS, POST, DELETE").split(/,\s*/)
export const rasaURL = process.env.RASA_ENDPOINT;

const cors = corsMiddleware({
    allowHeaders,
    origins: allowOrigins,
    exposeHeaders
})

// Body & query parser plugins
server.use(restify.plugins.jsonBodyParser())
server.use(restify.plugins.queryParser())
// CORS
server.pre(cors.preflight)
server.use(cors.actual)

// Register app's routes
routes(server)
server.on("error", onError)


server.listen(process.env.HTTP_PORT || 8000, () => console.log(`Listening on ${server.url}`))