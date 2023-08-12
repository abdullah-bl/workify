'use server'

import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { authOptions } from "~/lib/auth"
import { prisma } from "~/lib/prisma"


export const revalidate_path = (path: string) => {
  console.log(' Revalidate Path ', { path })
  return revalidatePath(path)
}


export const deleteWorkspace = async (id: string) => {
  console.log('Delete workspace', { id })
  const session = await getServerSession(authOptions)
  const user = session?.user as { id: string }
  if (!user) {
    return null
  }
  try {
    await prisma.workspace.delete({
      where: {
        id: id,
        owner: { id: user.id }
      }
    })
    revalidatePath('/')
    return { status: 'success' }
  } catch (error) {
    console.log('Error deleting workspace', { error })
    return { status: 'fail', message: 'Error deleting workspace' }
  }
}


export const createWorkspace = async (formData: FormData) => {
  try {
    const session = await getServerSession(authOptions)
    const user = session?.user as { id: string }
    if (!user) {
      return null
    }

    const workspace = await prisma.workspace.create({
      data: {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        owner: { connect: { id: user.id } },
      }
    })
    revalidatePath('/')
    return { status: 'success', workspace }
  } catch (error) {
    console.log('Error creating workspace', { error })
    return { status: 'fail', message: 'Error creating workspace' }
  }
}

export const updateWorkspace = async (id: string, formData: FormData) => {
  try {
    const session = await getServerSession(authOptions)
    const user = session?.user as { id: string }
    if (!user) {
      return { status: 'fail', message: 'Unauthorized' }
    }

    const workspace = await prisma.workspace.update({
      where: { id: id },
      data: {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
      }
    })
    revalidatePath('/')
    return { status: 'success', workspace }
  } catch (error) {
    console.log('Error updating workspace', { error })
    return { status: 'fail', message: 'Error updating workspace' }
  }
}



export const createPage = async (workspaceId: string, formData: FormData) => {
  try {
    const session = await getServerSession(authOptions)
    const user = session?.user as { id: string }
    if (!user) {
      return null
    }

    const page = await prisma.page.create({
      data: {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        type: formData.get('type') as string,
        workspace: { connect: { id: workspaceId } },
        owner: { connect: { id: user.id } },
      }
    })
    revalidatePath(`/ws/${workspaceId}`)
    return { status: 'success', page }
  } catch (error) {
    console.log('Error creating page', { error })
    return { status: 'fail', message: 'Error creating page' }
  }
}