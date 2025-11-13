'use server'

import { createLoginSessionFromApi } from "@/lib/login/manage-login"
import { LoginSchema } from "@/lib/login/schemas"
import { apiRequest } from "@/utils/api-request"
import { asyncDelay } from "@/utils/async-delay"
import { getZodErrorMessages } from "@/utils/get-zoid-error-messages"
import { verifyHoneypotInput } from "@/utils/verify-honeypot-input"
import { redirect } from "next/navigation"


type LoginActionState = {
  email: string
  errors: string[]
}

export async function loginAction(state: LoginActionState, formData: FormData) {
  const allowlogin = Boolean(Number(process.env.ALLOW_LOGIN))

  if (!allowlogin) {
    return {
      email: '',
      errors: ['Login not allowed'],
    }
  }

  const isBot = await verifyHoneypotInput(formData, 5000);

  if (isBot) {
    return {
      email: '',
      errors: ['nice'],
    };
  }

  if (!(formData instanceof FormData)) {
    return {
      email: '',
      errors: ['Dados inválidos'],
    }
  }

 const formObj = Object.fromEntries(formData.entries())
 const formEmail = formObj?.email?.toString() || ''
 const parsedFormData = LoginSchema.safeParse(formObj)

 if (!parsedFormData.success) {
  return {
    email: formEmail,
    errors: getZodErrorMessages(parsedFormData.error.format())
  }
 }

 const loginReponse = await apiRequest<{ accessToken: string }>(
  '/auth/login',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parsedFormData.data),
  },
 )

 if (!loginReponse.success) {
  return {
    email: formEmail,
    errors: loginReponse.errors,
  }
 }

 await createLoginSessionFromApi(loginReponse.data.accessToken)
 redirect('/admin/post')
}
