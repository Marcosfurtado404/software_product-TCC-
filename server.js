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


//cria os clientes
function emptyToNull(value) {
  return value === "" ? null : value
}

function numberOrNull(value) {
  return value === "" ? null : Number(value)
}

function booleanOrNull(value) {
  if (value === "") return null
  if (value === "true") return true
  if (value === "false") return false
  return value
}

// cria os clientes
server.post('/clientes', async (request, reply) => {
  const {
    clienteName,
    clienteAge,
    clienteBirthdate,
    clientePhonenumb,
    rimel,
    gestante,
    procRecente,
    alergia,
    tireoide,
    probOcular,
    tratOncologico,
    dormelado,
    especificProblem
  }      = request.body

  await database.createcliente({
    clienteName: emptyToNull(clienteName),
    clienteAge: numberOrNull(clienteAge),
    clienteBirthdate: emptyToNull(clienteBirthdate),
    clientePhonenumb: emptyToNull(clientePhonenumb),
    rimel: booleanOrNull(rimel),
    gestante: booleanOrNull(gestante),
    procRecente: emptyToNull(procRecente),
    alergia: emptyToNull(alergia),
    tireoide: booleanOrNull(tireoide),
    probOcular: emptyToNull(probOcular),
    tratOncologico: emptyToNull(tratOncologico),
    dormelado: emptyToNull(dormelado),
    especificProblem: emptyToNull(especificProblem),
  })

  console.log(await database.list())

  return reply.status(201).send()
})
//lista todos os clientes
server.get('/listclientes', async (request) => {
    const search = request.query.search

    console.log(search) 

    const clientes = await database.list(search)

    return clientes
})

//edita clientes
server.put('/clientes/:clienteID', async (request, reply) => {
    const clienteID = request.params.clienteID
    const { clienteName,
            clienteAge,
            clienteBirthdate,
            clientePhonenumb,
            rimel,
            gestante,
            procRecente,
            alergia,
            tireoide,
            probOcular,
            tratOncologico,
            dormelado,
            especificProblem} = request.body

   await database.findClienteByID(clienteID)

    const cliente = await database.update(clienteID, {
        clienteName,
        clienteAge,
        clienteBirthdate,
        clientePhonenumb,
        rimel,
        gestante,
        procRecente,
        alergia,
        tireoide,
        probOcular,
        tratOncologico,
        dormelado,
        especificProblem
    })

    return reply.status(204).send()

})


server.delete('/clientes/:clienteID', async (request, reply) => {
    const clienteID = request.params.clienteID

    await database.delete(clienteID)

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



server.post('/createagendamento', async (request,reply) =>{

  const {data_agendamento, procedimento, valor
     ,clienteID} = request.body 

  await database.createagendamento(data_agendamento, procedimento,
     valor,clienteID)

})







//apontar porta com fastify
server.listen({
   port: 1515,
})