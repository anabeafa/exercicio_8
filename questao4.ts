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
        try {
            this.sacar(valor); 
            outraConta.depositar(valor);
            console.log(`Transferência de R$${valor} realizada com sucesso.`);
        } catch (error) {
            if (error instanceof SaldoNegativoError) {
                console.error("Erro ao transferir:", error.message);
            } else {
                console.error("Erro desconhecido:", error);
            }
        }
    }
}

let contaOrigem: Conta = new Conta("1", 100); 
let contaDestino: Conta = new Conta("2", 50); 

console.log("Saldo da conta origem antes da transferência:", contaOrigem.saldo);
console.log("Saldo da conta destino antes da transferência:", contaDestino.saldo);

contaOrigem.transferir(contaDestino, 200); 

console.log("Saldo da conta origem após a transferência:", contaOrigem.saldo);
console.log("Saldo da conta destino após a transferência:", contaDestino.saldo);