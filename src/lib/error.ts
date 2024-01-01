export interface FuckingError extends Error {
    error?: string;
    statuscode?: number;
}

export function createFuckingError(error: FuckingError): FuckingError {
    return error;
}
