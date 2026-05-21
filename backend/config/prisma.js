const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres:prabhleen@localhost:5432/postgres"
    }
  }
});

module.exports = prisma;