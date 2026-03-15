// import {createServer} from 'node:http'

// const  server = createServer((request,response) => {
//     response.write('oi')
    
    
//     return Response.end()
// })

// server.listen(1515)
//--------------------------------



//importação ---------------
import { fastify } from 'fastify'
import cors from '@fastify/cors'
//import { databasememory } from './database_memory.js'
import { databasepostgres } from './database-postgres.js'
import { request } from 'http'

//criaçao do server com fastify
const server = fastify()

await server.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"]
})

const database = new databasepostgres()
//---------------------------t


//----------------------------------------------
//quando o server acessar '/nada' retornara hello world
// server.get('/', () => {
//     return 'hello world'
// })

// server.get('/new', () => {
//     return 'hello new'
// })
//----------------------------------------------


//cria admin
server.post('/Admins', async (request,reply) =>{
    const {adminName, adminAge, email, password} = request.body
    const body = request.body
    await database.createAdmin ({
        adminName: adminName,
        adminAge: adminAge,
        email: email,
        password: password,

})

    console.log(database.list())

    console.log(body)

    return reply.status(201).send()
})


//cria os users
server.post('/users', async (request, reply) => {

    
    const {userName,userAge} = request.body

    await database.create  ({
        userName: userName,
        userAge: userAge,
        
})

    console.log(database.list())

    return reply.status(201).send()
})

//lista todos os users
server.get('/listusers', async (request) => {
    const search = request.query.search

    console.log(search) 

    const users = await database.list(search)

    return users
})

//edita users
server.put('/users/:userID', async (request, reply) => {
    const userID = request.params.userID
    const {userName,userAge} = request.body


    const user = await database.update(userID, {
        userName,
        userAge,
    })

    return reply.status(204).send()

})


server.delete('/users/:userID', async (request, reply) => {
    const userID = request.params.userID

    await database.delete(userID)

    return reply.status(204).send()
})


//LOGIN
server.post('/login', async (request, reply)=>{

  const { email, password } = request.body

  const admin = await database.findAdminByEmail(email)

  console.log(admin)
  
  if(!admin){
    return reply.status(401).send({message:"Admin não encontrado"})
  }

  if(admin.password !== password){
    return reply.status(401).send({message:"Senha inválida"})
  }

  return reply.send(admin)

})


//apontar porta com fastify
server.listen({
   port: 1515,
})