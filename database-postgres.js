import {randomUUID} from 'crypto'
import { sql } from './db.js'


export class databasepostgres {
    #users = new Map()
 

//sql é usado para executar comandos no banco
//necessario usar async no começo da função para utilizar await(comando que espera o sql finalizar a consulta) 
//ilike é basicamente um like non-case-sensitive
    async list(search) {
        let users

        if (search) {
            users = await sql `select * from users where user_name ilike ${'%' + search + '%'}`
        } else {
            users = await sql `select * from users`
        }
        
        return users

    }


    //ADMIN
    async createAdmin(admin) {
        const adminID = randomUUID()
        const {adminName, adminAge, email, password} = admin

        await sql `insert into admins (admin_id, admin_name, admin_age, email, password)
                   VALUES (${adminID},${adminName},${adminAge},${email},${password})`
 
    }
    





    //continuar daqui =>
        //criar função para puxar email do admin
    async findAdminByEmail(email){

  const result = await sql`
    select * from admins
    where email = ${email}
  `

  return result[0]

}







    //USER (cliente)
    async create(user) {
         //UUID (universal unique ID)
        const userID = randomUUID()
        const {userName, userAge } = user

        await sql `insert into users (user_ID, user_name, user_age) VALUES (${userID},${userName},${userAge})` 
    }

    async update(userID,user) {
     const {userName, userAge } = user
    
     await sql `update users set user_name = ${userName}, user_age = ${userAge} where user_ID = ${userID}`

    }



    async delete(userID) {
      await sql `delete from users where user_id = ${userID}`
    }
}
