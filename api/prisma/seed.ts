import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const store = await prisma.store.create({
    data: {
      name: "Main Store",
      type: "INVENTORY_MANAGER",
    },
  });

  const user = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@mail.com",
      password: "$2y$10$TO6jeDN.B5UO.6odx7v2KOi8//w0HrfDm/mdbLiYU6mKstNV/4fT2",
      unity_id: store.id,
      position: "Administrator",
      permissions:
        "view_dashboard,view_financial,create_carrier,view_carrier,update_carrier,delete_carrier,create_category,view_category,update_category,delete_category,create_client,view_client,update_client,delete_client,create_register,view_register,update_register,delete_register,create_product,view_product,update_product,delete_product,create_provider,view_provider,update_provider,delete_provider,create_purchase,view_purchase,update_purchase,delete_purchase,create_sale,view_sale,update_sale,delete_sale,create_seller,view_seller,update_seller,delete_seller,create_store,view_store,update_store,delete_store,create_ticket,view_ticket,update_ticket,delete_ticket,create_user,view_user,update_user,delete_user,restrict_delete_store,",
      active: true,
    },
  });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
