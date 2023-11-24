class SaldoNegativoError extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = 'SaldoNegativoError';
    }
}

class Conta {
    private _numero: string;
    private _saldo: number;

    constructor(numero: string, saldoInicial: number) {
        this._numero = numero;
        this._saldo = saldoInicial;
    }

    get saldo() {
        return this._saldo;
    }

    sacar(valor: number): void {
        const novoSaldo = this._saldo - valor;
        if (novoSaldo < 0) {
            throw new SaldoNegativoError('Saldo insuficiente para o saque');
        }
        this._saldo = novoSaldo;
    }

    depositar(valor: number): void {
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
        try {
            origem.transferir(destino, valor);
        } catch (error) {
            if (error instanceof SaldoNegativoError) {
                console.error("Erro ao transferir:", error.message);
            } else {
                console.error("Erro desconhecido:", error);
            }
        }
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