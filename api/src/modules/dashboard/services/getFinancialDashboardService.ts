// import { prisma } from "../../../database/prismaClient";

// export const getFinancialDashboardService = {
//   findFinancial: async (minDate: string) => {
//     return await prisma.financial.findMany({
//       where: {
//         updated_at: {
//           gte: new Date(minDate)
//         }
//       },
//       select: {
//         type: true,
//         value: true,
//         updated_at: true
//       },
//       orderBy: {
//         updated_at: 'asc'
//       }
//     });
//   },
// }

import { prisma } from "../../../database/prismaClient";

export const getFinancialDashboardService = {
  findFinancial: async (minDate: string) => {
    return await prisma.financial.findMany({
      where: {
        updated_at: {
          gte: new Date(minDate),
        },
      },
      select: {
        value: true,
        updated_at: true,
        unity: {
          // Selecting fields from the related unity (Store) table
          select: {
            name: true, // Assuming unity has a "name" field
          },
        },
        user: {
          // Selecting fields from the related user table
          select: {
            name: true, // Assuming user has a "name" field
          },
        },
      },
      orderBy: {
        updated_at: "asc",
      },
    });
  },
};
