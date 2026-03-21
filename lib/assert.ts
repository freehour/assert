export interface AssertionErrorOptions extends ErrorOptions {
    /**
     * Additional context for the error.
     */
    context?: unknown;
}

/**
 * Error indicating that an assertion has failed.
 */
export class AssertionError extends Error {
    /**
     * Additional context for the error.
     */
    readonly context?: unknown;

    /**
     * Creates a new AssertionError.
     * @param message The error message.
     * @param context Additional context for the error.
     */
    constructor(
        message?: string,
        {
            context,
            ...options
        }: AssertionErrorOptions = {},
    ) {
        super(message, options);
        this.context = context;
        this.name = this.constructor.name;
    }
}


export type AssertFn = (condition: boolean, message?: string, context?: unknown) => asserts condition;

export interface Assert extends AssertFn {
    /**
     * Asserts that a value is not `null` or `undefined`.
     * @param value The value to assert.
     * @param message The error message to throw if the assertion fails.
     * @param context Additional context to include in the error.
     * @returns The value if it is not `null` or `undefined`.
     * @throws {AssertionError} If the value is `null` or `undefined`.
     */
    value: <T>(value: T | null | undefined, message?: string, context?: unknown) => T;

    /**
     * Asserts that a value is defined (not `undefined`).
     * **Note**: If you dont care about the distinction between `null` and `undefined`, use `assert(value)` instead.
     * @param value The value to assert.
     * @param message The error message to throw if the assertion fails.
     * @param context Additional context to include in the error.
     * @returns The value if it is defined.
     * @throws {AssertionError} If the value is `undefined`.
     */
    defined: <T>(value: T | undefined, message?: string, context?: unknown) => T;

    /**
     * Asserts that a value is not `null`.
     * **Note**: If you dont care about the distinction between `null` and `undefined`, use `assert(value)` instead.
     * @param value The value to assert.
     * @param message The error message to throw if the assertion fails.
     * @param context Additional context to include in the error.
     * @returns The value if it is not `null`.
     * @throws {AssertionError} If the value is `null`.
     */
    notNull: <T>(value: T | null, message?: string, context?: unknown) => T;
}


const assertFn: AssertFn = (condition, message = 'Assertion failed', context = undefined): asserts condition => {
    if (!condition) {
        throw new AssertionError(message, { context });
    }
};

/**
 * Asserts that a condition is true. Throws an error otherwise.
 * @param condition The condition to assert.
 * @param message The error message to throw if the assertion fails.
 * @param context Additional context to include in the error.
 * @throws {AssertionError} If the assertion fails.
 */
export const assert: Assert = Object.assign(assertFn, {
    value<T>(value: T | null | undefined, message = 'Value is null or undefined', context?: unknown): T {
        if (value === null || value === undefined) {
            throw new AssertionError(message, { context });
        }
        return value;
    },

    defined<T>(value: T | undefined, message = 'Value is undefined', context?: unknown): T {
        if (value === undefined) {
            throw new AssertionError(message, { context });
        }
        return value;
    },

    notNull<T>(value: T | null, message = 'Value is null', context?: unknown): T {
        if (value === null) {
            throw new AssertionError(message, { context });
        }
        return value;
    },
});

