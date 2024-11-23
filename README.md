npm install express
-
npm install body-parser mongoose cors
-
npm install -g express-generator
-
npm init
-
npm install prisma --save-dev
-
npx prisma init
-
npx prisma generate
-
npx prisma migrate dev --name init_wallet
-
npx prisma studio
-


create a new application: 
-
    express myapp



crud-prisma/
│
├── .env
├── package.json
├── tsconfig.json
├── prisma/
│   ├── schema.prisma
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── routes/
│   │   ├── usuarioRoutes.ts
│   │   ├── carteiraRoutes.ts
│   │   ├── criptoativoRoutes.ts
│   │   ├── transacaoRoutes.ts
│   │   ├── carteiraCriptoRoutes.ts
│   ├── controllers/
│   │   ├── usuarioController.ts
│   │   ├── carteiraController.ts
│   │   ├── criptoativoController.ts
│   │   ├── transacaoController.ts
│   │   ├── carteiraCriptoController.ts
│   ├── middlewares/
│   │   └── errorHandler.ts
│   ├── prisma/
│       └── client.ts