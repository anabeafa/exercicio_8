function dividir(dividendo: number, divisor: number): number {
    try {
        if (divisor === 0) {
            throw new Error('Divisão por zero não é permitida');
        }
        return dividendo / divisor;
    } catch (error) {
        console.error("Erro durante a divisão:", error.message);
        return -1;
    } finally {
        console.log("Bloco finally: Operação concluída");
    }
}

const resultado1 = dividir(10, 2);
console.log("Resultado 1:", resultado1);
const resultado2 = dividir(10, 0);
console.log("Resultado 2:", resultado2);