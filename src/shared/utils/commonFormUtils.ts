import { PASSWORD_REGEX, USERNAME_REGEX } from '@/shared/config'
import { z } from 'zod'

export const commonPasswordSchema = z
  .string()
  .min(6, 'Minimum number of characters 6')
  .max(20, 'Maximum number of characters 20')
  .regex(
    PASSWORD_REGEX,
    'Password must contain 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~}'
  )

export const commonUsernameSchema = z
  .string()
  .min(6, 'Username must be at least 6 characters long')
  .max(30, 'Username must not exceed 30 characters')
  .regex(USERNAME_REGEX)

export const commonEmailSchema = z
  .string()
  .email('The email must match the format example@example.com')

export const createBadRequestSchema = (fields: string[]) =>
  z.object({
    messages: z.array(
      z.object({
        field: z.enum(fields as [string, ...string[]]),
        message: z.string(),
      })
    ),
  })
