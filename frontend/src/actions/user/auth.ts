'use server'

type RegisterState = {
    success: boolean;
    error: string | null;
}

export async function registerAction(
    prevState: RegisterState | null,
    formData: FormData
): Promise<RegisterState> {
    console.log("Usuario logado.")
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    console.log('name', name)
    console.log('email', email)
    console.log('password', password)
    console.log('confirmPassword', confirmPassword)

    return { success: true, error: null }
}
