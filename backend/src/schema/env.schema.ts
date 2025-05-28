import {z} from 'zod'

export const envSchema = z.object({
    NODE_ENV:z.enum(['development' , 'production']),
    PORT:z.string(),
    GOOGLE_APPLICATION_CREDENTIALS:z.string()
})