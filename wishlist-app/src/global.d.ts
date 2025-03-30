import { MongooseCache } from "./lib/mongo";

declare global {
  namespace NodeJS {
    interface Global {
      mongooseCache: MongooseCache | undefined;
    }
  }
}

export {};