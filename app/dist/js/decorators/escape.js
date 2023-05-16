export function escape(target, propertyKey, descriptor) {
    const metodoOrigional = descriptor.value;
    descriptor.value = function (...args) {
        let retorno = metodoOrigional.apply(this, args);
        if (typeof retorno === 'string') {
            console.log(`@escape em ação na classe ${this.constructor.name} para o método ${propertyKey}`);
            retorno = retorno
                .replace(/<script>[\s\S]*?<\/script>/, '');
        }
        return retorno;
    };
    return descriptor;
}
