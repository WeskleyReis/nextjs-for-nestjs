import { hashPassword } from "@/lib/login/manage-login"

(async () => {
  const minhaSenha = '' // NÃO ESQUECER DE APAGAR A SUA SENHA DAQUI
  const hashDaSuaSenhaEmBase64 = await hashPassword(minhaSenha)

  console.log({ hashDaSuaSenhaEmBase64 })
})()
