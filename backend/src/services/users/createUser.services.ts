type createUserType = {
    name: string;
    email: string;
    password: string;
    age: number;
    role: string;
};

class CreateUserService {
    async execute(data: createUserType) {
        // Lógica para criar um novo usuário
        console.log(data);
        return { message: `Usuário ${data.name} criado com sucesso` };
    }
}

export { CreateUserService };