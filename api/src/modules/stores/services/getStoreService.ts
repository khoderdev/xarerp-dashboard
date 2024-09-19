// // // import { prisma } from "../../../database/prismaClient";
// // // import logger from "../../../helpers/logger";

// // // export const getStoreService = {
// // //   hasAssociatedAdministrators: async (storeId: string): Promise<boolean> => {
// // //     try {
// // //       const count = await prisma.administrator.count({
// // //         where: {
// // //           storeId,
// // //         },
// // //       });
// // //       return count > 0;
// // //     } catch (err) {
// // //       if (err instanceof Error) {
// // //         logger.error(
// // //           `Error in hasAssociatedAdministrators: ${err.message}, Stack: ${err.stack}`
// // //         );
// // //       } else {
// // //         logger.error("Unknown error occurred in hasAssociatedAdministrators");
// // //       }
// // //       throw err;
// // //     }
// // //   },

// // //   findAll: async () => {
// // //     try {
// // //       return await prisma.store.findMany({});
// // //     } catch (err) {
// // //       if (err instanceof Error) {
// // //         logger.error(`Error in findAll: ${err.message}, Stack: ${err.stack}`);
// // //       } else {
// // //         logger.error("Unknown error occurred in findAll");
// // //       }
// // //       throw err;
// // //     }
// // //   },

// // //   findOne: async (id: string) => {
// // //     try {
// // //       return await prisma.store.findUnique({
// // //         where: { id },
// // //       });
// // //     } catch (err) {
// // //       if (err instanceof Error) {
// // //         logger.error(`Error in findOne: ${err.message}, Stack: ${err.stack}`);
// // //       } else {
// // //         logger.error("Unknown error occurred in findOne");
// // //       }
// // //       throw err;
// // //     }
// // //   },

// // //   listAll: async (name: string, page: number) => {
// // //     try {
// // //       return await prisma.$transaction([
// // //         prisma.store.count({
// // //           where: {
// // //             name: {
// // //               contains: name,
// // //               mode: "insensitive",
// // //             },
// // //           },
// // //         }),
// // //         prisma.store.findMany({
// // //           where: {
// // //             name: {
// // //               contains: name,
// // //               mode: "insensitive",
// // //             },
// // //           },
// // //           skip: page * 10,
// // //           take: 10,
// // //           orderBy: {
// // //             updated_at: "desc",
// // //           },
// // //         }),
// // //       ]);
// // //     } catch (err) {
// // //       if (err instanceof Error) {
// // //         logger.error(`Error in listAll: ${err.message}, Stack: ${err.stack}`);
// // //       } else {
// // //         logger.error("Unknown error occurred in listAll");
// // //       }
// // //       throw err;
// // //     }
// // //   },
// // // };
// // import { prisma } from "../../../database/prismaClient";
// // import logger from "../../../helpers/logger";

// // export const getStoreService = {
// //   hasAssociatedAdministrators: async (storeId: string): Promise<boolean> => {
// //     try {
// //       const count = await prisma.administrator.count({
// //         where: {
// //           storeId,
// //         },
// //       });
// //       return count > 0;
// //     } catch (err) {
// //       if (err instanceof Error) {
// //         logger.error(
// //           `Error in hasAssociatedAdministrators: ${err.message}, Stack: ${err.stack}`
// //         );
// //       } else {
// //         logger.error("Unknown error occurred in hasAssociatedAdministrators");
// //       }
// //       throw err;
// //     }
// //   },

// //   findAll: async () => {
// //     try {
// //       return await prisma.store.findMany({
// //         include: {
// //           storeTypes: true, // Include storeTypes in the result
// //         },
// //       });
// //     } catch (err) {
// //       if (err instanceof Error) {
// //         logger.error(`Error in findAll: ${err.message}, Stack: ${err.stack}`);
// //       } else {
// //         logger.error("Unknown error occurred in findAll");
// //       }
// //       throw err;
// //     }
// //   },

// //   findOne: async (id: string) => {
// //     try {
// //       return await prisma.store.findUnique({
// //         where: { id },
// //         include: {
// //           storeTypes: true, // Include storeTypes in the result
// //         },
// //       });
// //     } catch (err) {
// //       if (err instanceof Error) {
// //         logger.error(`Error in findOne: ${err.message}, Stack: ${err.stack}`);
// //       } else {
// //         logger.error("Unknown error occurred in findOne");
// //       }
// //       throw err;
// //     }
// //   },

// //   listAll: async (name: string, page: number) => {
// //     try {
// //       return await prisma.$transaction([
// //         prisma.store.count({
// //           where: {
// //             name: {
// //               contains: name,
// //               mode: "insensitive",
// //             },
// //           },
// //         }),
// //         prisma.store.findMany({
// //           where: {
// //             name: {
// //               contains: name,
// //               mode: "insensitive",
// //             },
// //           },
// //           skip: page * 10,
// //           take: 10,
// //           orderBy: {
// //             updated_at: "desc",
// //           },
// //           include: {
// //             storeTypes: true, // Include storeTypes in the result
// //           },
// //         }),
// //       ]);
// //     } catch (err) {
// //       if (err instanceof Error) {
// //         logger.error(`Error in listAll: ${err.message}, Stack: ${err.stack}`);
// //       } else {
// //         logger.error("Unknown error occurred in listAll");
// //       }
// //       throw err;
// //     }
// //   },
// // };
// import { prisma } from "../../../database/prismaClient";
// import logger from "../../../helpers/logger";

// export const getStoreService = {
//   hasAssociatedAdministrators: async (storeId: string): Promise<boolean> => {
//     try {
//       const count = await prisma.administrator.count({
//         where: {
//           storeId,
//         },
//       });
//       return count > 0;
//     } catch (err) {
//       if (err instanceof Error) {
//         logger.error(
//           `Error in hasAssociatedAdministrators: ${err.message}, Stack: ${err.stack}`
//         );
//       } else {
//         logger.error("Unknown error occurred in hasAssociatedAdministrators");
//       }
//       throw err;
//     }
//   },

//   findAll: async () => {
//     try {
//       return await prisma.store.findMany({
//         include: {
//           branches: true, // Include storeTypes (formerly branches) in the result
//         },
//       });
//     } catch (err) {
//       if (err instanceof Error) {
//         logger.error(`Error in findAll: ${err.message}, Stack: ${err.stack}`);
//       } else {
//         logger.error("Unknown error occurred in findAll");
//       }
//       throw err;
//     }
//   },

//   findOne: async (id: string) => {
//     try {
//       return await prisma.store.findUnique({
//         where: { id },
//         include: {
//           branches: true, // Include storeTypes (formerly branches) in the result
//         },
//       });
//     } catch (err) {
//       if (err instanceof Error) {
//         logger.error(`Error in findOne: ${err.message}, Stack: ${err.stack}`);
//       } else {
//         logger.error("Unknown error occurred in findOne");
//       }
//       throw err;
//     }
//   },

//   listAll: async (name: string, page: number) => {
//     try {
//       return await prisma.$transaction([
//         prisma.store.count({
//           where: {
//             name: {
//               contains: name,
//               mode: "insensitive",
//             },
//           },
//         }),
//         prisma.store.findMany({
//           where: {
//             name: {
//               contains: name,
//               mode: "insensitive",
//             },
//           },
//           skip: page * 10,
//           take: 10,
//           orderBy: {
//             updated_at: "desc",
//           },
//           include: {
//             branches: true, // Include storeTypes (formerly branches) in the result
//           },
//         }),
//       ]);
//     } catch (err) {
//       if (err instanceof Error) {
//         logger.error(`Error in listAll: ${err.message}, Stack: ${err.stack}`);
//       } else {
//         logger.error("Unknown error occurred in listAll");
//       }
//       throw err;
//     }
//   },
// };
import { prisma } from "../../../database/prismaClient";
import logger from "../../../helpers/logger";

export const getStoreService = {
  hasAssociatedAdministrators: async (storeId: string): Promise<boolean> => {
    try {
      const count = await prisma.administrator.count({
        where: {
          storeId,
        },
      });
      return count > 0;
    } catch (err) {
      if (err instanceof Error) {
        logger.error(
          `Error in hasAssociatedAdministrators: ${err.message}, Stack: ${err.stack}`
        );
      } else {
        logger.error("Unknown error occurred in hasAssociatedAdministrators");
      }
      throw err;
    }
  },

  findAll: async () => {
    try {
      return await prisma.store.findMany({
        include: {
          branch: true, // Include branch in the result
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        logger.error(`Error in findAll: ${err.message}, Stack: ${err.stack}`);
      } else {
        logger.error("Unknown error occurred in findAll");
      }
      throw err;
    }
  },

  findOne: async (id: string) => {
    try {
      return await prisma.store.findUnique({
        where: { id },
        include: {
          branch: true, // Include branch in the result
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        logger.error(`Error in findOne: ${err.message}, Stack: ${err.stack}`);
      } else {
        logger.error("Unknown error occurred in findOne");
      }
      throw err;
    }
  },

  listAll: async (name: string, page: number) => {
    try {
      return await prisma.$transaction([
        prisma.store.count({
          where: {
            name: {
              contains: name,
              mode: "insensitive",
            },
          },
        }),
        prisma.store.findMany({
          where: {
            name: {
              contains: name,
              mode: "insensitive",
            },
          },
          skip: page * 10,
          take: 10,
          orderBy: {
            updated_at: "desc",
          },
          include: {
            branch: true, // Include branch in the result
          },
        }),
      ]);
    } catch (err) {
      if (err instanceof Error) {
        logger.error(`Error in listAll: ${err.message}, Stack: ${err.stack}`);
      } else {
        logger.error("Unknown error occurred in listAll");
      }
      throw err;
    }
  },
};
