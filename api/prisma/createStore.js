const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const newStore = await prisma.store.create({
  data: {
    name: 'New Store',
    type: 'Branch',
  },
});
console.log('Store Created:', newStore);
