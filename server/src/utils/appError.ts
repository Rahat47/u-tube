class AppError extends Error {
    statusCode: number;

    status: string;

    isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.status = this.getStatusText(statusCode);
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }

    getStatusText(code: number) {
        if (code.toString().startsWith('4')) {
            return 'Client Error';
        }
        if (code.toString().startsWith('5')) {
            return 'Server Error';
        }
        if (code.toString().startsWith('2')) {
            return 'Success';
        }
        return 'Unknown Error';
    }
}

export default AppError;
