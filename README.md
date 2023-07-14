# GradeBookVUE - Deloitte

1 - Clone o repositório, após isso será necessário instalar todas as dependencias do projeto, é possivel fazer isso utilizando o compando
``` npm install ```
Ou
``` yarn ```

2 - Com as dependencias instaladas você já pode executar o projeto usando
 ``` yarn serve ```
 
 ## Problmas possiveis

```bash
Error: listen EADDRINUSE: address already in use :5173
```

Tente verificar se existe alguma outra aplicação rodando na porta 5173, caso não consiga achar nenhuma
aplicação rodando utilize os seguintes comandos

```bash
fuser -k 5173/tcp
```

Pronto, será finalizado a aplicação e agora você pode rodar o comando npm novamente

Se o problema persistir você pode trocar o valor da porta em que a aplicação está rodando.

Agora basta abrir a url que o terminal te indicar para conseguir utilizar o FrontEnd, lembrando que para rodar o FrontEnd de maneira local é necessário também rodar o BackEnd, já o BackEnd pode ser rodado local e testado via Insomnia ou PostMan.

Para facilitar o setup eu dispensei o uso de .env, então dentro de `utils/api.js` já está a rota padrão do django para testes locais
`const API_BASE_URL = 'http://127.0.0.1:8000'`

## Observações e Dificuldades
Uma das principais dificuldades foi o tempo, foram cerca de 5 dias de desenvolvimento e acabou que foquei mais no backEnd
pois acreditava que seria a parte mais importante para se destacar no processo, e com isso eu criei um backEnd com mais de 25 Rotas porem não pude apresentar nem metade disso.
A ideia do desenvolvimento do front-end era de mostrar um pouco de todas as models, então poder manipular tudo que o backEnd entrega.

Algumas rotas importantes que faltaram no desenvolvimento do front-end:
## DEL api/teacher/delete/<teacher_id>/
## DEL api/report-notes/delete/<note_id>/
## DEL api/student/delete/<student_id>/
## PUT api/report-cards/update/<Boletim_id>/

O front end conta as estilização focada em cores dark mode como padrão e com otimização para mobile.

Faltou duas rotas para report-cards no front, uma para professores e uma para estudantes, ambas para a listagem de boletins.
Na de professores listaria todos os boletins atribuido por um professor x (professor logado) e assim poderiamos editar os boletins e as notas por essa tela.

A segunda rota seria de estudantes, onde o estudante poderia ver todos os seus boletins e acompanhar suas notas.

## Features:
Criar um superUser "Diretor" esse user seria o unico capaz de criar disciplinas, teria permissão para deletar estudantes ou desmatricular eles de uma disciplina, o único que pode atribuir um professor a uma disciplina.
