const API_URL =
  (process.env.NEXT_PUBLIC_API_URL as string) || 'http://localhost:3334/api';

/**
 * Returns the base URL used for API requests.
 *
 * @returns The application's API base URL.
 */
export function getApiUrl() {
  return API_URL;
}

type ApiErrorResponse = {
  message?: string;
  error?: string;
  details?:
    | string
    | Array<{
        campo?: string;
        mensagem?: string;
      }>;
  mensage?: string;
};

/**
 * Extracts a readable error message from the API error response.
 *
 * @param error - Error response returned by the API.
 * @param status - HTTP status code returned by the response.
 * @returns A readable error message.
 */
function getApiErrorMessage(error: ApiErrorResponse, status: number) {
  if (typeof error.message === 'string') {
    return error.message;
  }

  if (typeof error.error === 'string' && !error.details) {
    return error.error;
  }

  if (typeof error.details === 'string') {
    return error.details;
  }

  if (Array.isArray(error.details) && error.details.length > 0) {
    const messages = error.details
      .map((detail) => detail.mensagem)
      .filter(Boolean)
      .join(', ');

    if (messages) {
      return messages;
    }
  }

  if (typeof error.error === 'string') {
    return error.error;
  }

  return error.mensage || `Erro HTTP: ${status}`;
}

async function parseJsonResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();

  if (!text) {
    return undefined as T;
  }

  return JSON.parse(text) as T;
}

interface FetchOptions extends RequestInit {
  token?: string;
  cache?: RequestCache;
  next?: {
    revalidate?: false | 0 | number;
    tags?: string[];
  };
}
/**
 * Sends an HTTP request to the application's API.
 *
 * Automatically:
 * - prefixes the request with the API base URL;
 * - adds the `Content-Type: application/json` header by default;
 * - includes the `Authorization` header when a token is provided;
 * - throws an `Error` when the request is unsuccessful.
 *
 * @template T Type expected in the response body.
 * @param endpoint - Relative API endpoint (e.g. `/users`).
 * @param options - Fetch request configuration.
 * @returns A promise that resolves with the parsed response body.
 *
 * @throws {Error} If the request fails or the API returns a non-success status.
 *
 * @example
 * const users = await apiClient<User[]>('/users');
 */
export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { token, method, ...fetchOptions } = options;
  const isFormData = fetchOptions.body instanceof FormData;

  const headers = new Headers(fetchOptions.headers);

  if (isFormData) {
    headers.delete('Content-Type');
  } else if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    method: method || 'GET',
    headers: {
      'content-type': 'application/json',
      ...Object.fromEntries(headers.entries()),
    },
  });

  if (!response.ok) {
    const error = await parseJsonResponse<ApiErrorResponse>(response).catch(
      () => ({
        message: 'Erro HTTP: ' + response.status,
      }),
    );

    console.error(getApiErrorMessage(error, response.status));
  }

  return parseJsonResponse<T>(response);
}
