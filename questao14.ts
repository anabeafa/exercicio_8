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
    private _ehPoupanca: boolean;

    constructor(numero: string, saldoInicial: number, ehPoupanca: boolean = false) {
        this._numero = numero;
        this._ehPoupanca = ehPoupanca;
        this.depositar(saldoInicial);
    }

    get numero() {
        return this._numero;
    }

    get saldo() {
        return this._saldo;
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

    private validarValor(valor: number): void {
        if (valor <= 0) {
            throw new ValorInvalidoError('O valor deve ser maior que zero');
        }
    }

    renderJuros(taxa: number): void {
        if (!this._ehPoupanca) {
            throw new PoupancaInvalidaError('A conta não é uma conta poupança');
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

let continuar: string;

do {
    try {
        const numeroConta = prompt("Digite o número da conta: ");
        const valorOperacao = Number(prompt("Digite o valor da operação: "));

        const conta = banco.consultar(numeroConta);
        conta.depositar(valorOperacao);

        console.log(`Depósito de ${valorOperacao} na conta ${numeroConta} efetuado com sucesso.`);
    } catch (error) {
        if (error instanceof ContaInexistenteError) {
            console.error("Erro: Conta não encontrada.");
        } else if (error instanceof SaldoInsuficienteError) {
            console.error("Erro: Saldo insuficiente para a operação.");
        } else if (error instanceof ValorInvalidoError) {
            console.error("Erro: Valor inválido inserido.");
        } else if (error instanceof PoupancaInvalidaError) {
            console.error("Erro: Operação não permitida para conta poupança.");
        } else {
            console.error("Erro desconhecido:", error);
        }
    }

}