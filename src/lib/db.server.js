import { PrismaClient } from "@prisma/client";

let prismadb;

if (process.env.NODE_ENV === 'production') {
  prismadb = new PrismaClient()
} else {
  if (!global.prismadb) {
    global.prismadb = new PrismaClient()
  }
  prismadb = global.prismadb
}

export { prismadb }

