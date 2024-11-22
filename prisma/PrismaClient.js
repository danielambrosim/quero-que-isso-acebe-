const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Criar uma carteira
  const newWallet = await prisma.wallet.create({
    data: {
      owner: "John Doe",
      balance: { BTC: 0.5, ETH: 1.2 },
    },
  });
  console.log("Nova carteira criada:", newWallet);

  // Listar todas as carteiras
  const wallets = await prisma.wallet.findMany();
  console.log("Carteiras encontradas:", wallets);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
