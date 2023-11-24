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

class Conta {
    private _numero: string;
    private _saldo: number;

    constructor(numero: string, saldoInicial: number) {
        this._numero = numero;
        this._saldo = saldoInicial;
    }

    get numero() {
        return this._numero;
    }

    get saldo() {
        return this._saldo;
    }

    sacar(valor: number): void {
        if (valor < 0) {
            throw new AplicacaoError('Valor do saque não pode ser menor que zero');
        }

        const novoSaldo = this._saldo - valor;
        if (novoSaldo < 0) {
            throw new SaldoInsuficienteError('Saldo insuficiente para o saque');
        }
        this._saldo = novoSaldo;
    }

    depositar(valor: number): void {
        if (valor < 0) {
            throw new AplicacaoError('Valor do depósito não pode ser menor que zero');
        }
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

class Banco {
    private contas: Conta[];

    constructor() {
        this.contas = [];
    }

    adicionarConta(conta: Conta): void {
        this.contas.push(conta);
    }

    consultar(numeroConta: string): Conta {
        const contaEncontrada = this.contas.find(conta => conta.numero === numeroConta);
        if (!contaEncontrada) {
            throw new ContaInexistenteError(`Conta ${numeroConta} não encontrada`);
        }
        return contaEncontrada;
    }

    consultarPorIndice(indice: number): Conta {
        if (indice < 0 || indice >= this.contas.length) {
            throw new ContaInexistenteError(`Índice ${indice} fora dos limites`);
        }
        return this.contas[indice];
    }

    alterar(numeroConta: string, valor: number): void {
        this.consultar(numeroConta).depositar(valor);
    }

    depositar(numeroConta: string, valor: number): void {
        this.consultar(numeroConta).depositar(valor);
    }

    sacar(numeroConta: string, valor: number): void {
        this.consultar(numeroConta).sacar(valor);
    }

    transferir(origem: string, destino: string, valor: number): void {
        const contaOrigem = this.consultar(origem);
        const contaDestino = this.consultar(destino);
        contaOrigem.transferir(contaDestino, valor);
    }

    renderJuros(numeroConta: string, taxa: number): void {
        this.consultar(numeroConta).renderJuros(taxa);
    }
}