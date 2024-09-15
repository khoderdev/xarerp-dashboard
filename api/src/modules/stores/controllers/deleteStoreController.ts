import { Request, Response } from "express";
import { getStoreService } from "../services/getStoreService";
import { deleteStoreService } from "../services/deleteStoreService";
export const deleteOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if the store exists
    const store = await getStoreService.findOne(id);

    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }

    // Check if the store has associated administrators
    const hasAdmins = await getStoreService.hasAssociatedAdministrators(id);

    if (hasAdmins) {
      return res
        .status(400)
        .json({ error: "Cannot delete store with associated administrators" });
    }

    // Proceed with deletion
    await deleteStoreService.delete(id);

    return res.status(200).json({ status: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "InternalServerError" });
  }
};
