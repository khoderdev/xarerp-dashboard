// // // import { PrismaClient } from "@prisma/client";

// // // const prisma = new PrismaClient();

// // // const main = async () => {
// // //   const store = await prisma.store.create({
// // //     data: {
// // //       name: "Main Store",
// // //       type: "HEADQUARTER",
// // //     },
// // //   });

// // //   const user = await prisma.user.create({
// // //     data: {
// // //       name: "Admin",
// // //       email: "admin@mail.com",
// // //       password: "$2a$10$zqgAMD5bVH5nnaN0NV7V6eYUjweRi4I7h1am3GpIwCAYrnWCuG4vO",
// // //       unity_id: store.id,
// // //       position: "Administration",
// // //       permissions:
// // //         "view_dashboard,view_financial,create_carrier,view_carrier,update_carrier,delete_carrier,create_category,view_category,update_category,delete_category,create_client,view_client,update_client,delete_client,create_register,view_register,update_register,delete_register,create_product,view_product,update_product,delete_product,create_provider,view_provider,update_provider,delete_provider,create_purchase,view_purchase,update_purchase,delete_purchase,create_sale,view_sale,update_sale,delete_sale,create_seller,view_seller,update_seller,delete_seller,create_store,view_store,update_store,delete_store,create_ticket,view_ticket,update_ticket,delete_ticket,create_user,view_user,update_user,delete_user,restrict_delete_store,",
// // //       active: true,
// // //     },
// // //   });
// // // };

// // // main()
// // //   .catch((e) => {
// // //     console.error(e);
// // //     process.exit(1);
// // //   })
// // //   .finally(async () => {
// // //     await prisma.$disconnect();
// // //   });

// // // /////////////////////////////////////////////
// // // /////////////////////////////////////////////
// // // /////////////////////////////////////////////
// // // /////////////////////////////////////////////

// // import { PrismaClient } from "@prisma/client";

// // const prisma = new PrismaClient();

// // const main = async () => {
// //   const store = await prisma.store.create({
// //     data: {
// //       name: "Store 2",
// //       type: "WAREHOUSE",
// //     },
// //   });

// //   const user = await prisma.user.create({
// //     data: {
// //       name: "test",
// //       email: "test@mail.com",
// //       password: "$2a$10$zqgAMD5bVH5nnaN0NV7V6eYUjweRi4I7h1am3GpIwCAYrnWCuG4vO",
// //       unity_id: store.id,
// //       position: "Administration",
// //       permissions:
// //         "view_dashboard,view_financial,create_carrier,view_carrier,update_carrier,delete_carrier,create_category,view_category,update_category,delete_category,create_client,view_client,update_client,delete_client,create_register,view_register,update_register,delete_register,create_product,view_product,update_product,delete_product,create_provider,view_provider,update_provider,delete_provider,create_purchase,view_purchase,update_purchase,delete_purchase,create_sale,view_sale,update_sale,delete_sale,create_seller,view_seller,update_seller,delete_seller,create_store,view_store,update_store,delete_store,create_ticket,view_ticket,update_ticket,delete_ticket,create_user,view_user,update_user,delete_user,restrict_delete_store,",
// //       active: true,
// //     },
// //   });

// //   // Create Categories
// //   const cat1 = await prisma.category.create({
// //     data: {
// //       title: "Drinks",
// //     },
// //   });

// //   const cat2 = await prisma.category.create({
// //     data: {
// //       title: "Food",
// //     },
// //   });

// //   // Create Providers
// //   const provider1 = await prisma.provider.create({
// //     data: {
// //       name: "Barista",
// //       email: "Barista@mail.com",
// //       tel: "123456789",
// //     },
// //   });

// //   const provider2 = await prisma.provider.create({
// //     data: {
// //       name: "Tannourine",
// //       email: "Tannourine@mail.com",
// //       tel: "987654321",
// //     },
// //   });

// //   // Create Products
// //   const product1 = await prisma.product.create({
// //     data: {
// //       name: "Water",
// //       description: "Minral Water.",
// //       purchase_price: 300,
// //       sale_price: 500,
// //       category_id: cat1.id,
// //       unity_id: store.id,
// //       provider_id: provider1.id,
// //       user_id: user.id,
// //       lot: 100,
// //       validity: new Date("2025-01-01"),
// //       quantity: 50,
// //     },
// //   });

// //   const product2 = await prisma.product.create({
// //     data: {
// //       name: "Office Chair",
// //       description: "Ergonomic office chair with adjustable height.",
// //       purchase_price: 50,
// //       sale_price: 100,
// //       category_id: cat2.id,
// //       unity_id: store.id,
// //       provider_id: provider2.id,
// //       user_id: user.id,
// //       lot: 200,
// //       validity: new Date("2024-12-01"),
// //       quantity: 30,
// //     },
// //   });
// // };

// // main()
// //   .catch((e) => {
// //     console.error(e);
// //     process.exit(1);
// //   })
// //   .finally(async () => {
// //     await prisma.$disconnect();
// //   });
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// const main = async () => {
//   // Create Store
//   const store = await prisma.store.create({
//     data: {
//       name: "Store 2",
//       type: "WAREHOUSE",
//     },
//   });

//   // Create User
//   const user = await prisma.user.create({
//     data: {
//       name: "test",
//       email: "test@mail.com",
//       password: "$2a$10$zqgAMD5bVH5nnaN0NV7V6eYUjweRi4I7h1am3GpIwCAYrnWCuG4vO", // Hashed password
//       unity_id: store.id,
//       position: "Administration",
//       permissions:
//         "view_dashboard,view_financial,create_carrier,view_carrier,update_carrier,delete_carrier,create_category,view_category,update_category,delete_category,create_client,view_client,update_client,delete_client,create_register,view_register,update_register,delete_register,create_product,view_product,update_product,delete_product,create_provider,view_provider,update_provider,delete_provider,create_purchase,view_purchase,update_purchase,delete_purchase,create_sale,view_sale,update_sale,delete_sale,create_seller,view_seller,update_seller,delete_seller,create_store,view_store,update_store,delete_store,create_ticket,view_ticket,update_ticket,delete_ticket,create_user,view_user,update_user,delete_user,restrict_delete_store,",
//       active: true,
//     },
//   });

//   // Create Categories
//   const cat1 = await prisma.category.create({
//     data: {
//       title: "Drinks",
//     },
//   });

//   const cat2 = await prisma.category.create({
//     data: {
//       title: "Food",
//     },
//   });

//   // Create Providers
//   const provider1 = await prisma.provider.create({
//     data: {
//       name: "Barista",
//       email: "Barista@mail.com",
//       tel: "123456789",
//     },
//   });

//   const provider2 = await prisma.provider.create({
//     data: {
//       name: "Tannourine",
//       email: "Tannourine@mail.com",
//       tel: "987654321",
//     },
//   });

//   // Create Products with provider_id references
//   const product1 = await prisma.product.create({
//     data: {
//       name: "Water",
//       description: "Mineral Water.",
//       purchase_price: 300,
//       sale_price: 500,
//       category_id: cat1.id,
//       unity_id: store.id,
//       provider_id: provider1.id,  // Reference to provider
//       user_id: user.id,
//       lot: 100,
//       validity: new Date("2025-01-01"),
//       quantity: 50,
//     },
//   });

//   const product2 = await prisma.product.create({
//     data: {
//       name: "Office Chair",
//       description: "Ergonomic office chair with adjustable height.",
//       purchase_price: 50,
//       sale_price: 100,
//       category_id: cat2.id,
//       unity_id: store.id,
//       provider_id: provider2.id,  // Reference to provider
//       user_id: user.id,
//       lot: 200,
//       validity: new Date("2024-12-01"),
//       quantity: 30,
//     },
//   });
// };

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // Create Branch
  const branch = await prisma.branch.create({
    data: {
      name: "Branch 1",
      store: {
        create: {
          name: "Store 2",
        },
      },
    },
  });

  // Create User
  const user = await prisma.user.create({
    data: {
      name: "nizar",
      email: "nizar@mail.com",
      password: "$2a$10$zqgAMD5bVH5nnaN0NV7V6eYUjweRi4I7h1am3GpIwCAYrnWCuG4vO", // Hashed password
      branch_id: branch.id, // Associate with the created branch
      position: "Administration",
      permissions:
        "view_dashboard,view_financial,create_carrier,view_carrier,update_carrier,delete_carrier,create_category,view_category,update_category,delete_category,create_client,view_client,update_client,delete_client,create_register,view_register,update_register,delete_register,create_product,view_product,update_product,delete_product,create_provider,view_provider,update_provider,delete_provider,create_purchase,view_purchase,update_purchase,delete_purchase,create_sale,view_sale,update_sale,delete_sale,create_seller,view_seller,update_seller,delete_seller,create_store,view_store,update_store,delete_store,create_ticket,view_ticket,update_ticket,delete_ticket,create_user,view_user,update_user,delete_user,restrict_delete_store,",
      active: true,
    },
  });

  console.log({ branch, user });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
