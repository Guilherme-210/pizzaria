'use server'

type RegisterState = {
    success: boolean;
    error: string | null;
}

export async function registerAction(
    prevState: RegisterState | null,
    formData: FormData
): Promise<RegisterState> {
    try {
        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        const confirmPassword = formData.get("confirmPassword") as string

        const data = {
            name,
            email,
            password,
            confirmPassword
        }

        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            const errorData = await response.json()
            return { success: false, error: errorData.message }
        }

        return { success: true, error: null }
    } catch (error) {
        return { success: false, error: 'Ocorreu um erro ao registrar o usuário.' + error }
    }
}

type LoginState = {
    success: boolean;
    error: string | null;
}

export async function LoginAction(
    prevState: LoginState | null,
    formData: FormData
): Promise<LoginState> {
    try {
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        const data = {
            email,
            password,
        }

        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            const errorData = await response.json()
            return { success: false, error: errorData.message }
        }

        return { success: true, error: null }
    } catch (error) {
        return { success: false, error: 'Ocorreu um erro ao registrar o usuário.' }
    }
}
