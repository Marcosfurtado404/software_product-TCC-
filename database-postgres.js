import {randomUUID} from 'crypto'
import { sql } from './db.js'


export class databasepostgres {
    #clientes = new Map()
 

//sql é usado para executar comandos no banco
//necessario usar async no começo da função para utilizar await(comando que espera o sql finalizar a consulta) 
//ilike é basicamente um like non-case-sensitive
    async list(search) {
        let clientes

        if (search) {
            clientes = await sql `select * from clientes where cliente_name ilike ${'%' + search + '%'}`
        } else {
            clientes = await sql `select * from clientes`
        }
        
        return clientes

    }






    //ADMIN
    async createAdmin(admin) {
        const adminID = randomUUID()
        const {adminName, adminAge, email, password} = admin

        await sql `insert into admins (admin_id, admin_name, admin_age, email, password)
                   VALUES (${adminID},${adminName},${adminAge},${email},${password})`
 
    }
    





        //buscas no banco
    async findAdminByEmail(email){

        const result = await sql`
          select * from admins where email = ${email}`

        return result[0]
    }

    async findClienteByID(clienteID){
        const result = await sql`select * from clientes where cliente_id = ${clienteID}`

        return result[0]
    }

    async findClienteByName(clienteName){
        const result = await sql`select * from clientes where cliente_namne = ${clienteName}`

        return result[0]
    }





    //criação cliente
    async createcliente(cliente) {
         //UUID (universal unique ID)
        const clienteID = randomUUID()
        const {clienteName, clienteAge,clienteBirthdate,clientePhonenumb,rimel,gestante,procRecente,alergia,
        tireoide,probOcular,tratOncologico,dormelado,especificProblem} = cliente

        await sql `insert into clientes (cliente_id, cliente_name, cliente_age, cliente_birthdate,
         cliente_phonenumb, rimel, gestante, proc_recente, alergia, tireoide, prob_ocular, trat_oncologico,
          dorme_lado, especific_problem) VALUES (${clienteID},${clienteName},${clienteAge},${clienteBirthdate},${clientePhonenumb},${rimel},${gestante}
          ,${procRecente},${alergia},${tireoide},${probOcular},${tratOncologico},${dormelado},${especificProblem})` 
    }



    
    async update(clienteID,cliente) {
     const {clienteName,clienteAge } = cliente
    
     await sql `update clientes set cliente_name = ${clienteName}, cliente_age = ${clienteAge} where cliente_ID = ${clienteID}`

    }



    async delete(clienteID) {
      await sql `delete from clientes where cliente_id = ${clienteID}`
    }




    //agendamento

    async createagendamento(agendamento) {

        const  {data_agendamento, procedimento,
     valor,clienteName,clienteID} = agendamento
    
     const result = await sql `select * from clientes where cliente_id = ${clienteID}`
            console.log(result)
            
     await sql `update agendamentos set client_id = ${clienteID}, ${data_agendamento}, ${procedimento} , ${valor}, ${valor}`

     

    }


}