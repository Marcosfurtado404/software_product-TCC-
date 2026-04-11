import {randomUUID} from 'crypto'

export class databasememory{
    #clientes = new Map()
 

//array.from transforma a requisicao em array   

//entries separa o Array, e depois conseguimos escolher qual Array usamos
    list(search) {
        return Array.from(this.#clientes.entries())
            .map((clienteArray) => {
                const clienteID = clienteArray[0]
                const data = clienteArray[1]

                return {
                    clienteID,
                    ...data,
                }
            })
            .filter(cliente =>{
                if (search) {
                  return cliente.clienteName.includes(search)
                }

                return true
            })



    }



//recebe o 'usuario' e armazena em #usuarios
    create(cliente) {

        //UUID (universal unique ID)
        const clienteID = randomUUID()
        
        this.#clientes.set (clienteID, cliente)
    }




    update(clienteID,cliente) {
        this.#clientes.set(clienteID, cliente)
    }

    delete(clienteID,cliente) {
        this.#clientes.set(clienteID)
    }
}
