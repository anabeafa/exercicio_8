class AplicacaoError extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

class ContaInexistenteError extends AplicacaoError {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

class SaldoInsuficienteError extends AplicacaoError {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}