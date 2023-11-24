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
}

let conta: Conta = new Conta("1", 0.0);

try {
    conta.sacar(200);
    console.log("Saque bem-sucedido. Novo saldo:", conta.saldo);
} catch (error) {
    if (error instanceof SaldoNegativoError) {
        console.error("Erro ao sacar:", error.message);
    } else {
        console.error("Erro desconhecido:", error);
    }
    console.log("Saldo após tentativa de saque:", conta.saldo);
}