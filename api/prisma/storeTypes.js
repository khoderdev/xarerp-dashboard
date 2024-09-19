async function createStoreTypes() {
  try {
    const storeType1 = await prisma.storeType.create({
      data: { name: "Branch 1" },
    });
    const storeType2 = await prisma.storeType.create({
      data: { name: "Branch 2" },
    });
    console.log("Store Types Created:", storeType1, storeType2);
  } catch (err) {
    console.error("Error creating store types:", err);
  } finally {
    await prisma.$disconnect();
  }
}

createStoreTypes();
