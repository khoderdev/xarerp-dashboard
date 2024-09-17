await prisma.store.delete({
  where: { id: 'ff0bdbd1-fbba-45df-9b29-9ef228c82757' },
});
console.log('Store Deleted');
