/*
  Warnings:

  - You are about to drop the `Wallet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Wallet";

-- CreateTable
CREATE TABLE "carteira" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "id_usuario" INTEGER NOT NULL,

    CONSTRAINT "carteira_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carteira_cripto" (
    "id_carteira" SERIAL NOT NULL,
    "id_criptoativo" INTEGER NOT NULL,
    "quantidade" DECIMAL(30,8) NOT NULL
);

-- CreateTable
CREATE TABLE "criptoativo" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "codigo" VARCHAR(3) NOT NULL,
    "preco" DECIMAL(30,8) NOT NULL,

    CONSTRAINT "criptoativo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transacao" (
    "id" SERIAL NOT NULL,
    "id_carteira_origem" INTEGER NOT NULL,
    "id_carteira_destino" INTEGER NOT NULL,
    "id_criptoativo" INTEGER NOT NULL,
    "quatidade" DECIMAL(30,8) NOT NULL,
    "tipo" VARCHAR(20) NOT NULL,
    "data" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "transacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "login" VARCHAR(50) NOT NULL,
    "senha" VARCHAR(30) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "carteira_cripto_id_carteira_key" ON "carteira_cripto"("id_carteira");

-- CreateIndex
CREATE UNIQUE INDEX "carteira_cripto_id_criptoativo_key" ON "carteira_cripto"("id_criptoativo");

-- CreateIndex
CREATE UNIQUE INDEX "criptoativo_codigo_key" ON "criptoativo"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "transacao_id_criptoativo_key" ON "transacao"("id_criptoativo");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_login_key" ON "usuario"("login");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_senha_key" ON "usuario"("senha");

-- AddForeignKey
ALTER TABLE "carteira" ADD CONSTRAINT "carteira_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "carteira_cripto" ADD CONSTRAINT "carteira_cripto_id_carteira_fkey" FOREIGN KEY ("id_carteira") REFERENCES "carteira"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "carteira_cripto" ADD CONSTRAINT "carteira_cripto_id_criptoativo_fkey" FOREIGN KEY ("id_criptoativo") REFERENCES "criptoativo"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transacao" ADD CONSTRAINT "transacao_id_carteira_destino_fkey" FOREIGN KEY ("id_carteira_destino") REFERENCES "carteira"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transacao" ADD CONSTRAINT "transacao_id_carteira_origem_fkey" FOREIGN KEY ("id_carteira_origem") REFERENCES "carteira"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transacao" ADD CONSTRAINT "transacao_id_criptoativo_fkey" FOREIGN KEY ("id_criptoativo") REFERENCES "criptoativo"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
