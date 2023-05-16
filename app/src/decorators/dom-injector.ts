export function domInjector(seletor: string) {
    return function (target: any, propertyKey: string) {
        console.log(`Modificando protype ${target.constructor.name} e adicionado getter para propriedade ${propertyKey}`)
        const getter = function () {
            const elemento = document.querySelector(seletor);
            console.log(`Buscando elemento do DOM com o seletor ${seletor} para injetar em ${propertyKey}`)
            return elemento
        }

        Object.defineProperty(
            target,
            propertyKey,
            { get: getter }
        );
    }
}