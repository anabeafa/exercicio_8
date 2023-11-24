class AplicacaoError extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = this.constructor.name;
    }
}

class ContaInexistenteError extends AplicacaoError {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = this.constructor.name;
    }
}

class SaldoInsuficienteError extends AplicacaoError {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = this.constructor.name;
    }
}

class ValorInvalidoError extends AplicacaoError {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = this.constructor.name;
    }
}

class Conta {
    private _numero: string;
    private _saldo: number;

    constructor(numero: string, saldoInicial: number) {
        this._numero = numero;
        this.depositar(saldoInicial);
    }

    get numero() {
        return this._numero;
    }

    get saldo() {
        return this._saldo;
    }

    private validarValor(valor: number): void {
        if (valor <= 0) {
            throw new ValorInvalidoError('O valor deve ser maior que zero');
        }
    }

    sacar(valor: number): void {
        this.validarValor(valor);

        const novoSaldo = this._saldo - valor;
        if (novoSaldo < 0) {
            throw new SaldoInsuficienteError('Saldo insuficiente para o saque');
        }
        this._saldo = novoSaldo;
    }

    depositar(valor: number): void {
        this.validarValor(valor);
        this._saldo += valor;
    }

    transferir(outraConta: Conta, valor: number): void {
        this.sacar(valor);
        outraConta.depositar(valor);
    }

    renderJuros(taxa: number): void {
        if (taxa < 0) {
            throw new AplicacaoError('Taxa de juros não pode ser menor que zero');
        }
        this._saldo *= (1 + taxa);
    }
}


try {
    const contaExemplo = new Conta("1", 0); 
} catch (error) {
    if (error instanceof ValorInvalidoError) {
        console.error("Erro ao criar conta:", error.message);
    } else {
        console.error("Erro desconhecido:", error);
    }
}