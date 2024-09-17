// import { Request, Response, NextFunction } from "express";
// import { decode, verify } from "jsonwebtoken";
// import { getUserService } from "../../modules/users/services/getUserService";
// import logger from "../../helpers/logger";

// export const ensureAuthenticated = () => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     const authHeaders = req.headers.authorization;

//     if (!authHeaders) {
//       return res.status(401).json({ error: "Token is missing" });
//     }

//     const [, token] = authHeaders.split(" ");

//     try {
//       verify(token, process.env.SECRET_JWT as string);
//       const { sub }: any = decode(token);
//       req.userId = sub.toString();
//       return next();
//     } catch (err) {
//       if (err instanceof Error) {
//         logger.error(
//           `Authentication failed: ${err.message}, Stack: ${err.stack}`
//         );
//       } else {
//         logger.error(`Authentication failed: ${String(err)}`);
//       }
//       return res.status(401).json({ error: "Unauthorized" });
//     }
//   };
// };

// export const validateToken = async (req: Request, res: Response) => {
//   const authHeaders = req.headers.authorization;

//   if (!authHeaders) {
//     return res.status(401).json({ error: "Token is missing" });
//   }

//   const [, token] = authHeaders.split(" ");

//   try {
//     verify(token, process.env.SECRET_JWT as string);

//     const { sub }: any = decode(token);
//     const user = await getUserService.findOne(sub);

//     if (!user) {
//       return res.status(500).json({ error: "Internal server error" }).end();
//     }

//     return res.status(200).json({ user }).end();
//   } catch (err) {
//     if (err instanceof Error) {
//       logger.error(`Validation failed: ${err.message}, Stack: ${err.stack}`);
//     } else {
//       logger.error(`Validation failed: ${String(err)}`);
//     }
//     return res.status(401).json({ isValid: false }).end();
//   }
// };

import { Request, Response, NextFunction } from "express";
import { decode, verify } from "jsonwebtoken";
import { getUserService } from "../../modules/users/services/getUserService";
import logger from "../../helpers/logger";

export const ensureAuthenticated = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeaders = req.headers.authorization;

    // Check if authorization header is present
    if (!authHeaders) {
      return res.status(401).json({ error: "Token is missing" });
    }

    const [, token] = authHeaders.split(" ");

    try {
      // Verify the token using the secret key
      verify(token, process.env.SECRET_JWT as string);

      // Decode the token and extract the subject (user id)
      const { sub }: any = decode(token);

      // Ensure 'sub' exists and is a string
      if (sub && typeof sub === "string") {
        req.userId = sub;
        return next(); // Proceed to the next middleware
      } else {
        return res.status(401).json({ error: "Invalid token structure" });
      }
    } catch (err) {
      // Handle any verification or decoding errors
      if (err instanceof Error) {
        logger.error(
          `Authentication failed: ${err.message}, Stack: ${err.stack}`
        );
      } else {
        logger.error(`Authentication failed: ${String(err)}`);
      }
      return res.status(401).json({ error: "Unauthorized" });
    }
  };
};
export const validateToken = async (req: Request, res: Response) => {
  const authHeaders = req.headers.authorization;

  // Check if the authorization header is provided
  if (!authHeaders) {
    return res.status(401).json({ error: "Token is missing" });
  }

  const [, token] = authHeaders.split(" ");

  try {
    // Verify the token with the secret key
    verify(token, process.env.SECRET_JWT as string);

    // Decode the token to extract the subject (user id)
    const { sub }: any = decode(token);

    if (!sub) {
      return res.status(401).json({ error: "Invalid token structure" });
    }

    // Fetch the user based on the token's subject (user id)
    const user = await getUserService.findOne(sub);

    if (!user) {
      return res.status(500).json({ error: "User not found" });
    }

    // Return user data if valid
    return res.status(200).json({ user }).end();
  } catch (err) {
    // Log and return appropriate error responses
    if (err instanceof Error) {
      logger.error(`Validation failed: ${err.message}, Stack: ${err.stack}`);
    } else {
      logger.error(`Validation failed: ${String(err)}`);
    }
    return res.status(401).json({ isValid: false }).end();
  }
};
