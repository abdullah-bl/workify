import { NextResponse } from "next/server"
import { prisma } from "~/lib/prisma"




export const GET = async (req: Request) => {
  const users = await prisma.user.findMany({
    where: {
      AND: [
        { NOT: { username: "admin" } },
        { NOT: { active: false } }
      ]
    },
    select: {
      id: true,
      username: true,
      name: true,
    }
  })
  return NextResponse.json(users)
}