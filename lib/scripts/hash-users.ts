import 'dotenv/config'

import bcrypt from 'bcrypt'
import { prisma } from '@/lib/prisma'

async function main() {
  const users = await prisma.user.findMany()

  for (const user of users) {
    if (user.password.startsWith('$2')) {
      continue
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: await bcrypt.hash(user.password, 12),
      },
    })
  }

  console.log('Passwords migrated')
}

main()
