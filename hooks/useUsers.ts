import { User } from "@prisma/client"
import { use, useEffect, useState } from "react"



export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const users = await (await fetch("/api/users")).json()
      setUsers(users as User[])
    } catch (err: any) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }

  return { users, isLoading, error }
}