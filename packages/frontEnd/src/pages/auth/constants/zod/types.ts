import { z } from 'zod'
import { authSchema } from '@/pages/auth/constants/zod/scheme'

export type TAuthSchema = z.infer<typeof authSchema>