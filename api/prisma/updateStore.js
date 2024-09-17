const updatedStore = await prisma.store.update({
  where: { id: '001f7b74-f116-43eb-8d1b-efcbf12ca561' },
  data: { name: 'Updated Store Name' },
});
console.log('Store Updated:', updatedStore);
