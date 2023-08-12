import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany({})
  await prisma.workspace.deleteMany({})
  await prisma.page.deleteMany({})

  const password = await hash("admin", 12);
  const admin = await prisma.user.create({
    data: {
      username: "admin",
      role: "admin",
      active: true,
      password: {
        create: {
          hash: password,
        },
      }
    },
  })
  const user = await prisma.user.create({
    data: {
      username: "user",
      role: "user",
      active: true,
      password: {
        create: {
          hash: password,
        },
      }
    },
  })

  const workspace = await prisma.workspace.create({
    data: {
      name: "My Workspace",
      description: "My Workspace Description",
      owner: {
        connect: {
          id: admin.id
        },
      },
      members: {
        connect: [
          {
            id: user.id
          },
        ]
      }
    }
  })
  const workspace2 = await prisma.workspace.create({
    data: {
      name: "My Workspace 2",
      description: "My Workspace Description 2",
      owner: {
        connect: {
          id: user.id
        },
      },
      members: {
        connect: [
          {
            id: admin.id
          },
        ]
      }
    }
  })
  const page = await prisma.page.create({
    data: {
      name: "My Page",
      description: "My Page Description",
      workspace: {
        connect: {
          id: workspace.id
        },
      },
      owner: {
        connect: {
          id: admin.id
        },
      },
    }
  })

}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });