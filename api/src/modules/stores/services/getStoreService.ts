import { prisma } from "../../../database/prismaClient";
import logger from "../../../helpers/logger";

export const getStoreService = {
  findAll: async () => {
    try {
      return await prisma.store.findMany({});
    } catch (err) {
      logger.error(`Error in findAll: ${err.message}, Stack: ${err.stack}`);
      throw err;
    }
  },

  findOne: async (id: string) => {
    try {
      return await prisma.store.findUnique({
        where: { id },
      });
    } catch (err) {
      logger.error(`Error in findOne: ${err.message}, Stack: ${err.stack}`);
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
        }),
      ]);
    } catch (err) {
      logger.error(`Error in listAll: ${err.message}, Stack: ${err.stack}`);
      throw err;
    }
  },
};

// export const getStoreService = {

//   findAll: async () => {
//     return await prisma.store.findMany({});
//   },

//   findOne: async (id: string) => {
//     return await prisma.store.findUnique({
//       where: { id }
//     });
//   },

//   //list with pagination
//   listAll: async (name: string, page: number) => {
//     return await prisma.$transaction([
//       prisma.store.count({
//         where: {
//           name: {
//             contains: name,
//             mode: 'insensitive'
//           }
//         }
//       }),
//       prisma.store.findMany({
//         where: {
//           name: {
//             contains: name,
//             mode: 'insensitive'
//           }
//         },
//         skip: page * 10,
//         take: 10,
//         orderBy: {
//           updated_at: 'desc'
//         }
//       })
//     ]);
//   },

// }
