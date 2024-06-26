import z, { number, string } from 'zod'

export const signupuserSchema = z.object({
    userName: string().min(3, { message: " UserName must be of length 3" }).email("Invalid email"),
    firstName: string().min(3, { message: "firstName must be of length 3" }),
    lastName: string().min(3, { message: "lastName must be of length 3" }),
    password: string().min(6, { message: "password must be of length 6" })
})

export const signinuserSchema = z.object({
    userName: string().email(),
    password: string()
})

export const updateBody = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
})

export const transferBody = z.object({
    to: string(),
    amount: number()
})