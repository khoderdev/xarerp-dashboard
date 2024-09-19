// import { Request, Response } from "express";
// import { getStoreService } from "../services/getStoreService";
// import logger from "../../../helpers/logger";

// // Type guard to check if `err` is an instance of Error
// function isError(err: unknown): err is Error {
//   return err instanceof Error;
// }

// export const getAll = async (req: Request, res: Response) => {
//   try {
//     const { page, q } = req.query;
//     const stores = await getStoreService.listAll(String(q), Number(page));

//     if (!stores) {
//       return res.status(404).json({ error: "Not found" });
//     }

//     return res.status(200).json({ stores });
//   } catch (err) {
//     if (isError(err)) {
//       logger.error(`Error in getAll: ${err.message}, Stack: ${err.stack}`);
//     } else {
//       logger.error(`Unknown error occurred: ${String(err)}`);
//     }
//     return res.status(500).json({ error: "InternalServerError" });
//   }
// };

// export const getRegisters = async (req: Request, res: Response) => {
//   try {
//     const { page, q } = req.query;

//     const stores = await getStoreService.listAll(String(q), Number(page));

//     if (!stores) {
//       return res.status(404).json({ error: "Not found" });
//     }

//     return res.status(200).json({ stores });
//   } catch (err) {
//     if (isError(err)) {
//       console.log(`Error in getRegisters: ${err.message}, Stack: ${err.stack}`);
//     } else {
//       console.log(`Unknown error occurred: ${String(err)}`);
//     }
//     return res.status(500).json({ error: "InternalServerError" });
//   }
// };

// export const getOne = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const store = await getStoreService.findOne(id);

//     if (!store) {
//       return res.status(404).json({ error: "Not found" });
//     }

//     return res.status(200).json({ store });
//   } catch (err) {
//     if (isError(err)) {
//       console.log(`Error in getOne: ${err.message}, Stack: ${err.stack}`);
//     } else {
//       console.log(`Unknown error occurred: ${String(err)}`);
//     }
//     return res.status(500).json({ error: "InternalServerError" });
//   }
// };

import { Request, Response } from "express";
import { getStoreService } from "../services/getStoreService";
import logger from "../../../helpers/logger";

// Type guard to check if `err` is an instance of Error
function isError(err: unknown): err is Error {
  return err instanceof Error;
}

export const getAll = async (req: Request, res: Response) => {
  try {
    const { page, q } = req.query;
    const stores = await getStoreService.listAll(String(q), Number(page));

    if (!stores) {
      return res.status(404).json({ error: "Not found" });
    }

    return res.status(200).json({ stores });
  } catch (err) {
    if (isError(err)) {
      logger.error(`Error in getAll: ${err.message}, Stack: ${err.stack}`);
    } else {
      logger.error(`Unknown error occurred: ${String(err)}`);
    }
    return res.status(500).json({ error: "InternalServerError" });
  }
};

export const getRegisters = async (req: Request, res: Response) => {
  try {
    const { page, q } = req.query;

    const stores = await getStoreService.listAll(String(q), Number(page));

    if (!stores) {
      return res.status(404).json({ error: "Not found" });
    }

    return res.status(200).json({ stores });
  } catch (err) {
    if (isError(err)) {
      console.log(`Error in getRegisters: ${err.message}, Stack: ${err.stack}`);
    } else {
      console.log(`Unknown error occurred: ${String(err)}`);
    }
    return res.status(500).json({ error: "InternalServerError" });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const store = await getStoreService.findOne(id);

    if (!store) {
      return res.status(404).json({ error: "Not found" });
    }

    return res.status(200).json({ store });
  } catch (err) {
    if (isError(err)) {
      console.log(`Error in getOne: ${err.message}, Stack: ${err.stack}`);
    } else {
      console.log(`Unknown error occurred: ${String(err)}`);
    }
    return res.status(500).json({ error: "InternalServerError" });
  }
};
