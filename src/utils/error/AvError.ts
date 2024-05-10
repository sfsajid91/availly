export class AvError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export type AvErrorType = typeof AvError;
