export class Conferencia {
  public id: string;
  public data: Date;
  public itens: Array<{
    itemId: string;
    itemNome: string;
    sala: string;
    patrimonio: string;
    status: "correct" | "wrong" | "not_found";
  }>;

  constructor(obj?: Partial<Conferencia>) {
    if (obj) {
      this.id = obj.id;
      this.data = obj.data || new Date();
      this.itens = obj.itens || [];
    }
  }

  toString() {
    const objeto = `{
        "id"            :       "${this.id}",
        "data"          :       "${this.data}",
        "itens"         :       ${JSON.stringify(this.itens)}
      }`;
    return objeto;
  }

  toFirestore() {
    return {
      id: this.id,
      data: this.data,
      itens: this.itens,
      timestamp: new Date(),
    };
  }
}
