import * as express from 'express'
import { Role } from '@prisma/client';
export type User = {
  id: string,
  email: string,
  role: Role,
  Merchant?: {
    id: string,
  },
  Customer?: {
    id: string,
  },
  Admin?: {
    id: string,
  }
}


// declare global {
//   namespace Express {
//       export interface Request {
//           user?: User;
//       }
//   }
// }

declare module 'express-serve-static-core' {
  interface Request {
      user?: User
  }
}