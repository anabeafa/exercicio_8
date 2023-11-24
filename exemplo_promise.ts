function operacaoAssincrona(): Promise<number> {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            const sucesso = Math.random() < 0.5;
            if (sucesso) {
                resolve(42);
            } else {
                reject(new Error('Falha na operação assíncrona'));
            }
        }, 1000);
    });
}

async function executarOperacaoAssincrona() {
    try {
        const resultado = await operacaoAssincrona();
        console.log("Resultado assíncrono:", resultado);
    } catch (error) {
        console.error("Erro na operação assíncrona:", error.message);
    } finally {
        console.log("Bloco finally: Operação assíncrona finalizada");
    }
}

executarOperacaoAssincrona();