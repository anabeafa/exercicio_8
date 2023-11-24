class MeuErro extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = 'MeuErro';
    }
}

function funcaoComErro() {
    throw new MeuErro('Ocorreu um erro personalizado');
}

try {
    funcaoComErro();
} catch (error) {
    if (error instanceof MeuErro) {
        console.error("Erro personalizado capturado:", error.message);
    } else {
        console.error("Erro não identificado:", error);
    }
}