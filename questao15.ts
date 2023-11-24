class EntradaInvalidaError extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = this.constructor.name;
    }
}

function obterNumeroInteiro(mensagem: string): number {
    while (true) {
        try {
            const input = prompt(mensagem);
            if (!input) {
                throw new EntradaInvalidaError('Entrada vazia. Por favor, insira um número inteiro.');
            }

            const numero = parseInt(input, 10);
            if (isNaN(numero)) {
                throw new EntradaInvalidaError('Valor inválido. Insira um número inteiro válido.');
            }

            return numero;
        } catch (error) {
            if (error instanceof EntradaInvalidaError) {
                console.error("Erro:", error.message);
            } else {
                console.error("Erro desconhecido:", error);
            }
        }
    }
}
const numero = obterNumeroInteiro("Digite um número inteiro:");
console.log("Número inserido:", numero);