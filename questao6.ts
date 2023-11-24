class ValorNegativoError extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = 'ValorNegativoError';
    }
}

class SaldoInsuficienteError extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = 'SaldoInsuficienteError';
    }
}

class Conta {
    private _numero: string;
    private _saldo: number;

    constructor(numero: string, saldoInicial: number) {
        if (saldoInicial < 0) {
            throw new ValorNegativoError('Saldo inicial não pode ser menor que zero');
        }
        this._numero = numero;
        this._saldo = saldoInicial;
    }

    get saldo() {
        return this._saldo;
    }

    sacar(valor: number): void {
        if (valor < 0) {
            throw new ValorNegativoError('Valor do saque não pode ser menor que zero');
        }

        const novoSaldo = this._saldo - valor;
        if (novoSaldo < 0) {
            throw new SaldoInsuficienteError('Saldo insuficiente para o saque');
        }
        this._saldo = novoSaldo;
    }

    depositar(valor: number): void {
        if (valor < 0) {
            throw new ValorNegativoError('Valor do depósito não pode ser menor que zero');
        }
        this._saldo += valor;
    }

    transferir(outraConta: Conta, valor: number): void {
        this.sacar(valor); 
        outraConta.depositar(valor); 
        console.log(`Transferência de R$${valor} realizada com sucesso.`);
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

    transferir(origem: Conta, destino: Conta, valor: number): void {
        origem.transferir(destino, valor);
    }
}


const banco = new Banco();

const conta1 = new Conta("1", 100); 
const conta2 = new Conta("2", 50);  

banco.adicionarConta(conta1);
banco.adicionarConta(conta2);

console.log("Saldo da conta 1 antes da transferência:", conta1.saldo);
console.log("Saldo da conta 2 antes da transferência:", conta2.saldo);

banco.transferir(conta1, conta2, 200);

console.log("Saldo da conta 1 após a transferência:", conta1.saldo);
console.log("Saldo da conta 2 após a transferência:", conta2.saldo);


try {
    conta1.sacar(-50);
} catch (error) {
    console.error("Erro ao sacar:", error.message);
}

try {
    conta2.depositar(-20);
} catch (error) {
    console.error("Erro ao depositar:", error.message);
}