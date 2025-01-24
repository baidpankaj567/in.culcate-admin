const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (params.model === "Article" && params.action === "create") {
    params.args.data.id = Math.floor(Math.random() * 1000000);
  }
  return next(params);
});

module.exports = prisma;

// prisma/schema.prisma
