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

class PoupancaInvalidaError extends AplicacaoError {
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

    renderJuros(taxa: number): void {
        throw new PoupancaInvalidaError('A conta não é uma conta poupança');
    }
}

class Banco {
    private contas: Conta[];

    constructor() {
        this.contas = [];
    }

    adicionarConta(conta: Conta): void {
        try {
            this.consultar(conta.numero);
            console.log(`Conta ${conta.numero} já existe. Não foi possível adicionar.`);
        } catch (error) {
            if (error instanceof ContaInexistenteError) {
                this.contas.push(conta);
                console.log(`Conta ${conta.numero} adicionada com sucesso.`);
            } else {
                throw error;
            }
        }
    }

    consultar(numeroConta: string): Conta {
        const contaEncontrada = this.contas.find(conta => conta.numero === numeroConta);
        if (!contaEncontrada) {
            throw new ContaInexistenteError(`Conta ${numeroConta} não encontrada`);
        }
        return contaEncontrada;
    }

}


const banco = new Banco();
const conta1 = new Conta("1", 100);
const conta2 = new Conta("2", 50);
const conta3 = new Conta("1", 200); 

banco.adicionarConta(conta1);
banco.adicionarConta(conta2);
banco.adicionarConta(conta3);