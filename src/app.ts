import express from 'express'
import cors from 'cors'
import { user } from './routes/user-router'
import { login } from './routes/login-router'
import { company } from './routes/company-router'
import { social } from './routes/social-router'
import { project } from './routes/project-router'

const app = express()

// Middleware para habilitar o CORS
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  }),
)

app.use(express.json())

app.use('/v1/login', login)
app.use('/v1/user', user)
app.use('/v1/company', company)
app.use('/v1/social', social)
app.use('/v1/project', project)

export default app
