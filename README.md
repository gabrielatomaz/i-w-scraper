# I-W-SCRAPER

A aplicação realiza a autenticação no Banco Itaú e apresenta o nome do proprietário e também seu saldo atual. 

![alt text](https://i.imgur.com/RvxHAZi.png)
![alt text](https://i.imgur.com/FwaSH8m.png)


# Detalhes
- O nome, saldo e agência são salvos no MongoDB com o auxílio do framework Mongoose.
- Os campos de texto de agência/conta e senha possuem uma máscara (agência/conta: 0000 00000-0 e senha: 000000)
- Os erros são tratados com try/catch
- Teste disponível para validar o título da página
- Arquitetura MVC
- Session com cookies (cookie-parser)
- A autenticação acaba sendo demorada para acompanhar o tempo de espera da página do Itaú

### Para rodar a aplicação

```sh
$ npm install
$ npm run dev
```
