import {randomUUID} from 'crypto'

export class databasememory{
    #users = new Map()
 

//array.from transforma a requisicao em array   

//entries separa o Array, e depois conseguimos escolher qual Array usamos
    list(search) {
        return Array.from(this.#users.entries())
            .map((userArray) => {
                const userID = userArray[0]
                const data = userArray[1]

                return {
                    userID,
                    ...data,
                }
            })
            .filter(user =>{
                if (search) {
                  return user.userName.includes(search)
                }

                return true
            })



    }



//recebe o 'usuario' e armazena em #usuarios
    create(user) {

        //UUID (universal unique ID)
        const userID = randomUUID()
        
        this.#users.set (userID, user)
    }




    update(userID,user) {
        this.#users.set(userID, user)
    }

    delete(userID,user) {
        this.#users.set(userID)
    }
}
