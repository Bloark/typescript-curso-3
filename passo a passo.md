# Passo a Passo

1. npm install
2. npm run server
3. npm install typescript@4.2.2 --save-dev
4. todo codigo de typescript deve ser escrito da estrutura
   app>>
   controllers
   model
   views
5. configurar os arquivos typescript para rodar na pasta dist
6. criar a pasta na raiz tsconfig.json e configurar

```js
{
    "compilerOptions": {
        "outDir": "dist/js",
        "target": "ES6"
    },
    
    "include": [
        "app/**/*"
    ]
}
```

7. configurando package.json para rodar, incluso a linha abaixo em script.

```js
    "compile":"tsc"
```

8. adicionado um parametro em tsconfig.json para não criara o arquivo em js enquanto nos erros não forem corrigidos.

```js
    "noEmitOnError": true
```

9. automatizando a compilação de arquivos
10. incluir no package.json em script "watch" : "tsc -w"
11. inicializar com npm run start
12. criar controller para intergagir com a pagina.

```js
        export class NegociacaoController {

            private inputData; 
            private inputQuantidade;
            private inputValor;

            constructor() {
                this.inputData = document.querySelector('#data');
                this.inputQuantidade = document.querySelector('#quantidade');
                this.inputValor = document.querySelector('#valor');
            }

            adiciona() {
                console.log(this.inputData);
                console.log(this.inputQuantidade);
                console.log(this.inputValor);
            }
        }
```

13. tipagem no typescript
14. adicionado no tsconfig.json "noImplicitAny": true, para não aceitar o tipo any como padrão;
15. exemplo de uso de tipos de variaveis constructor(data: Date, quantidade: number, valor: number);
16. refatorado todo o codigo inserido o tipo para cada função e variavéis.
17. criado negociacoes.ts

```js
    import { Negociacao } from "./negociacao.js";

    export class Negociacoes {
        private negociacoes: Array<Negociacao> = [];

        adiciona(negociacao : Negociacao) {
            this.negociacoes.push(negociacao);
        }
        
        lista(): Array<Negociacao> {
            return this.negociacoes;        
        }
    }
```

18. usando ReadonlyArray para não pemitir alteração de remoção no Array.

```js
  lista(): ReadonlyArray<Negociacao> {
        return this.negociacoes;        
    }
```

19. Criado a negociacoes-view.ts

```js
    export class NegociacoesView {
        private elemento: HTMLElement;

        constructor(seletor: string) {
            this.elemento = document.querySelector(seletor);        
        }

        template(): string {
            return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>        
            `
        }
        update(): void{
            this.elemento.innerHTML = this.template();
        }
    }
```

20. inserido métodos para inserir dados na tabela.
21. configurado a linha para exibição da Data.

```js
    <td>${new Intl.DateTimeFormat().format(negociacao.data)}</td>
```

22. criado a mensagem-View para mostrar uma mensagem quando é adicionado o item.

```js
export class MensagemView {
    private element: HTMLElement;
    
    constructor(seletor: string) {
        this.element = document.querySelector(seletor);        
    }
    
    template(model: string): string{
        return `
            <p class="alert alert-info">${model}</p>        
        `
    }

    update(model: string): void{
        const template = this.template(model)
        this.element.innerHTML = template;
    }

}
```

23.Criando um view para uso genérico.

```js
export class View<T> {

    protected elemento: HTMLElement;

    constructor(seletor: string) {
        this.elemento = document.querySelector(seletor);
    }
    
    update(model: T){
        const template = this.template(model)
        this.elemento.innerHTML = template;
    }

    template(model: T): string{
       throw Error('Classe filha precisa implementar o método template')
    }

}
```

24. transformar a classe em abstract, força aimplementa o método template.

```js
    export abstract class View<T> {

        protected elemento: HTMLElement;

        constructor(seletor: string) {
            this.elemento = document.querySelector(seletor);
        }
        
        update(model: T){
            const template = this.template(model)
            this.elemento.innerHTML = template;
        }

        abstract template(model: T): string;

    }
```

25. Centralizando updates e aceitando apenas dias uteis.
26. Refatorado o métodos para dias uteis
27. criado uma class enums para lidar com os dias da semana.

```js
    export enum DiasDaSemana {

        DOMINGO = 0,
        SEGUNDA = 1,
        TERCA = 2,
        QUARTA = 3,
        QUINTA = 4,
        SEXTA = 5,
        SABADO = 6

    }
```

28. implemnetando métodos estátiscos e protegendos o templates de alterações;
29. Removendo comentários adiocionado no tsconfig "removeComments": true;
30. Usando o  "strictNullChecks": true
31. Aplicando  o método TypeScript e Decorators.
32. Habilitar decorators em typescripts.
33. tsconfig.json adiconar a linha   "experimentalDecorators": true.
34. criado Decorator
```js
        export function logarTempoDeExcecucao() {
            return function (
                target: any,
                propertyKey: string,
                descriptor: PropertyDescriptor
            ) {
                const metodoOriginal = descriptor.value;
                descriptor.value = function (...args:any[]) {
                    const t1 = performance.now();
                    const retorno = metodoOriginal.apply(this, args);
                    const t2 = performance.now();
                    console.log(`${propertyKey}, tempo de execução: ${(t2 - t1) / 1000} segundos`)
                    retorno
                };

                return descriptor;
            }
        }
```
35. habilitando o decorator através do @logarTempoDeExcecucao() em cima do método para calcular o tempo.
