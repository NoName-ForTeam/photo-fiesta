import {
  ABOUT_ME_REGEX,
  DATE_OF_BIRTH_REGEX,
  FIRST_NAME_REGEX,
  LAST_NAME_REGEX,
  PASSWORD_REGEX,
  USERNAME_REGEX,
} from '@/shared/config'
import { z } from 'zod'

//Auth
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

//Profile settings
export const commonAboutMeSchema = z
  .string()
  .min(0, 'Minimum number of characters 0')
  .max(200, 'Maximum number of characters 200')
  .regex(ABOUT_ME_REGEX)

export const commonFirstNameSchema = z
  .string()
  .min(1, 'Minimum number of characters 1')
  .max(50, 'Maximum number of characters 50')
  .regex(FIRST_NAME_REGEX)

export const commonLastNameSchema = z
  .string()
  .min(1, 'Minimum number of characters 1')
  .max(50, 'Maximum number of characters 50')
  .regex(LAST_NAME_REGEX)

export const commonDateOfBirthSchema = z.string().regex(DATE_OF_BIRTH_REGEX)
