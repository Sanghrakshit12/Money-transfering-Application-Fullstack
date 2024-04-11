import z, { string } from 'zod'

export const userSchema = z.object({
    Username: string().min(3, { message: " UserName must be of length 3" }).email("Invalid email"),
    firstName: string().min(3, { message: "firstName must be of length 3" }),
    lastName: string().min(3, { message: "lastName must be of length 3" }),
    password: string().min(6, { message: "password must be of length 6" })
})