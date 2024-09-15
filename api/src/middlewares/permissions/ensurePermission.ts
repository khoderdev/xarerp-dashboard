import { Request, Response, NextFunction } from "express";
import { getUserService } from "../../modules/users/services/getUserService";
function can(role: string) {
  const roleAuthorized = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.userId;
    const hasUser = await getUserService.findOne(userId);

    if (!hasUser) {
      return res.status(404).json({ error: "Not found" });
    }

    const userPermissions = hasUser.permissions.split(",");

    if (role === "delete_store") {
      if (
        hasUser.position === "Administrator" &&
        userPermissions.includes("restrict_delete_store")
      ) {
        return res
          .status(403)
          .json({
            error: "Deletion of this store is restricted for administrators",
          });
      }
    }

    if (!userPermissions.includes(role)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    return next();
  };

  return roleAuthorized;
}

export { can };
