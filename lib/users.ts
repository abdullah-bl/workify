import { prisma } from "./prisma"



export const getUsers = async () => {
  return await prisma.user.findMany({
    where: {
      AND: [
        {
          NOT: {
            username: "admin"
          }
        },
        {
          NOT: {
            active: false
          }
        }
      ]
    }
  })
}