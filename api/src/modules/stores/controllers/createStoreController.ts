// // import { Request, Response } from 'express';
// // import { createStoreService } from '../services/createStoreService';
// // import { v4 as uuidV4 } from 'uuid';

// // export const create = async (req: Request, res: Response) => {
// //   try {
// //     const { name, type } = req.body;

// //     if (!name || !type) {
// //       return res.status(400).json({ error: 'Incomplete data' });
// //     }

// //     const store = await createStoreService.create({
// //       id: uuidV4(),
// //       name,
// //       type
// //     });

// //     if (!store) {
// //       return res.status(500).json({ error: 'Internal server error' });
// //     }

// //     return res.status(201).json({ store });
// //   } catch (err) {
// //     console.log(err)
// //     return res.status(500).json({ error: 'InternalServerError' });
// //   }
// // }

// import { Request, Response } from "express";
// import { createStoreService } from "../services/createStoreService";

// export const create = async (req: Request, res: Response) => {
//   try {
//     const { name, type, branch, branchId } = req.body;

//     if (!name || (!branch && !branchId)) {
//       return res.status(400).json({ error: "Incomplete data" });
//     }

//     // Pass both branch and branchId to the service
//     const store = await createStoreService.create({
//       name,
//       type,
//       branchId: branchId || undefined, // Use branchId if provided
//       branchName: branch || undefined, // Use branch name if creating a new branch
//     });

//     if (!store) {
//       return res.status(500).json({ error: "Internal server error" });
//     }

//     return res.status(201).json({ store });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "InternalServerError" });
//   }
// };
import { Request, Response } from "express";
import { createStoreService } from "../services/createStoreService";

export const create = async (req: Request, res: Response) => {
  try {
    const { name, type, branchId, branchName } = req.body;

    if (!name || (!branchId && !branchName)) {
      return res.status(400).json({ error: "Incomplete data" });
    }

    // Pass branchId or branchName to the service
    const store = await createStoreService.create({
      name,
      type,
      branchId: branchId || undefined, // Use branchId if provided
      branchName: branchName || undefined, // Use branchName if provided
    });

    if (!store) {
      return res.status(500).json({ error: "Internal server error" });
    }

    return res.status(201).json({ store });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "InternalServerError" });
  }
};
