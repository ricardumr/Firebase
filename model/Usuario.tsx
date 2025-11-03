export class Usuario{

    public id:          string;
    public nome:        string;
    public email:       string;
    public senha:       string;
    public nascimento:  string;


    constructor(obj ?: Partial<Usuario>){
        if(obj){
            this.id        =obj.id
            this.nome      =obj.nome
            this.email     =obj.email
            this.senha     =obj.senha
            this.nascimento      =obj.nascimento
        }
    }

    toString () {
        const objeto = `{
        "id"        :       "${this.id}",
        "nome"      :       "${this.nome}",
        "email"     :       "${this.email}",
        "senha"     :       "${this.senha}",
        "nascimento"      :       "${this.nascimento}",
      }`
      return objeto
    }

    toFirestore(){
        const usuario = {
            id          : this.id,
            nome        : this.nome,
            email       : this.email,
            senha       : this.senha,
            nascimento        : this.nascimento
        }
        return usuario
    }

}

 