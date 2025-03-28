import { PrismaClient, type Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput = {
  login: 'admin',
  password: hashSync('parol123', 10)
}

async function main() {
  //
  await prisma.user.create({ data: userData })
}

export const runUser = async () => {
  await main()
    .then(() => {
      console.log(`User seeder successfully done!`)
    })
    .catch((e) => {
      console.log(`Error in User seeder: `, e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}
