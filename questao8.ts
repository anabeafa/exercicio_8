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
}


const banco = new Banco();
const conta1 = new Conta("1", 100);
const conta2 = new Conta("2", 50); 

banco.adicionarConta(conta1);
banco.adicionarConta(conta2);

try {
    const contaProcurada = banco.consultar("3"); 
    console.log("Conta encontrada:", contaProcurada);
} catch (error) {
    if (error instanceof ContaInexistenteError) {
        console.error("Erro ao consultar conta:", error.message);
    } else {
        console.error("Erro desconhecido:", error);
    }
}

try {
    const contaPorIndice = banco.consultarPorIndice(5); 
    console.log("Conta encontrada por índice:", contaPorIndice);
} catch (error) {
    if (error instanceof ContaInexistenteError) {
        console.error("Erro ao consultar conta por índice:", error.message);
    } else {
        console.error("Erro desconhecido:", error);
    }
}