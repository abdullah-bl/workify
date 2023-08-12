import { prisma } from "./prisma"


export const getWorkspace = async (id: string) => {
  return await prisma.workspace.findUnique({
    where: { id },
    include: {
      members: true,
      owner: true,
    }
  })
}

