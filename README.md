# Desafio-Tecnico-2-escribo

# api em express

## Descrição
API RESTful para autenticação de usuários, permite operações de cadastro (sign up),
autenticação (sign in) e recuperação de informações do usuário.

## Recursos Principais
  - Autenticação com token jwt
  - senha encriptada com bcrypt usando um salt para maior segurança

## Documentação

# Uso

## criar um usuario:

manda um request do tipo POST com um JSON contendo os seguintes campos.
```bash
{
    "nome": "lucas4",
  "email": "lucas4@email.com",
  "senha": "lucas",
  "telefone": "9999999994"
  
}
```

## login

manda um request do tipo POST com um JSON contendo os seguintes campos.

{
    "email": "lucas4@email.com",
    "senha": "lucas"

}


## autenticar usando o token JWT (com esse token é possivel acessar uma rota protegida "/home")

manda um request do tipo GET de autenticação do tipo beare token com o token obtido no login (token so é valido por 30 minutos).




