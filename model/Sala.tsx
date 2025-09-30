export class Sala{

    public id:              string;
    public nome:            string;
    public Usuario:         string;
    public Item:            string;

    constructor(obj ?: Partial<Sala>){
        if(obj){
            this.id         =obj.id
            this.nome       =obj.nome
            this.Usuario    =obj.Usuario
            this.Item       =obj.Item
        }
    }

    toString () {
        const objeto = `{
        "id"            :       "${this.id}",
        "nome"          :       "${this.nome}",
        "Usuario"         :     "${this.Usuario}",
        "Item"          :       "${this.Item}",
      }`
      return objeto
    }

    toFirestore(){
        const sala = {
            id          : this.id,
            nome        : this.nome,
            Usuario     : this.Usuario,
            Item        : this.Item, 
        }
        return sala
    }

}

 