export class Conferencia{

    public id:               boolean;
    public simsalacrt:       boolean;
    public simsalaerrd:      boolean;
    public nao:              boolean;
    
    constructor(obj ?: Partial<Conferencia>){
        if(obj){
            this.id         =obj.id
            this.simsalacrt       =obj.simsalacrt
            this.simsalaerrd     =obj.simsalaerrd
            this.nao =obj.nao
    
        }
    }

    toString () {
        const objeto = `{
        "id"                 :       "${this.id}",
        "simsalacrt"         :       "${this.simsalacrt}",
        "simsalaerrd"        :       "${this.simsalaerrd}",
        "nao"                :       "${this.nao}",
    
      }`
      return objeto
    }

    toFirestore(){
        const conferencia = {
            id          : this.id,
            simsalacrt        : this.simsalacrt,
            simsalaerrd      : this.simsalaerrd,
            nao  : this.nao,
        }
        return conferencia
    }

}

 