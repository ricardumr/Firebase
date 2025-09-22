export class Usuario{

    public id:      string;
    public nome:    string;
    public quantidade:   string;
    public validade:   string;
    public fone:    string;

    constructor(obj ?: Partial<Usuario>){
        if(obj){
            this.id        =obj.id
            this.nome      =obj.nome
            this.quantidade     =obj.quantidade
            this.validade     =obj.validade
            this.fone      =obj.fone
        }
    }

    toString () {
        const objeto = `{
        "id"        :       "${this.id}",
        "nome"      :       "${this.nome}",
        "quantidade"     :       "${this.quantidade}",
        "validade"     :       "${this.validade}",
        "fone"      :       "${this.fone}",
      }`
      return objeto
    }

    toFirestore(){
        const usuario = {
            id          : this.id,
            nome        : this.nome,
            quantidade       : this.quantidade,
            validade       : this.validade,
            fone        : this.fone
        }
        return usuario
    }

}

 