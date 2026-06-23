export enum HttpStatus {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

/**
 * Classe para representar erros personalizados na aplicação
 *
 * @param message - Mensagem de erro
 * @param statusCode - Código de status HTTP (padrão: 400)
 *
 * Códigos de status HTTP:
 *
 * 400 → dados inválidos
 * 401 → não autenticado
 * 403 → sem permissão
 * 404 → não encontrado
 * 409 → conflito (usuário/produto já existe)
 *
 * 500 → erro interno
 */

class AppError extends Error {
  constructor(
    message: string,
    public statusCode = 400,
  ) {
    super(message);

    this.name = "AppError";

    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export { AppError };
