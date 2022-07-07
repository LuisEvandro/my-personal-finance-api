# Projeto-ViaCEP

## 💻 Tecnologias usadas:

> - NodeJs (Express e Prisma)
> - MySQL para o banco de dados

#### Para rodar o projeto

Para iniciar a instalação do backend após clonar o projeto entre na pasta pelo terminal e execute os seguintes comandos:

> Comando para instalar as dependencias do backend
>
> ```
> npm install
> ```
>
> :warning: **_No arquivo .env coloque as credenciais do banco de dados da sua maquina._**
>
> > Sem essa configuração de banco de dados no arquivo `.env` os proximos comando não funcionara corretamente !
>
> Comandos para gerar o banco de dados local e conexão.
>
> ```
> npx prisma generate
> npx prisma migrate dev
> ```
>
> O comando para iniciar o server da API:
>
> ```
> npm run dev
> ```
>
> Após execução do comando acima a api estara disponivel : http://localhost: " _A PORTA QUE COLOCAR NO ARQUIVO ENV_ "

#### **👨🏻‍💻 Desenvolvido 💙 [Luis Evandro](https://github.com/LuisEvandro)**
