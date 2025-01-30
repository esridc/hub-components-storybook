'use strict';

const getWithDefault = require('./get-with-default-d1b1754d.js');

/* Copyright (c) 2018-2020 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Generic Solution Error with an Error stack as well
 * as an optional serialized OperationStack.
 *
 * Also accepts a `rootCause` Error object
 */
class OperationError extends Error {
    /**
     * Creates an instance of OperationError.
     * @param {string} operation
     * @param {string} [message]
     * @param {Error} [rootCause]
     * @memberof OperationError
     */
    constructor(operation, message, rootCause) {
        message = message || "UNKNOWN_ERROR";
        // if the rootCause has a .rootCause, use that so we don't deeply nest
        rootCause = getWithDefault.getWithDefault(rootCause, "rootCause", rootCause);
        super(message);
        this.operation = operation;
        this.name = "OperationError";
        this.rootCause = rootCause;
        Object.setPrototypeOf(this, OperationError.prototype);
        // using rootCause.stack ensures that the resulting error will have the original
        // message + call stack. If that's not an option, we create a new
        // stack... which is better than nothing, but it will look like
        // OperationError is the source of the error
        this.stack = getWithDefault.getWithDefault(rootCause, "stack", new Error().stack);
    }
}

exports.OperationError = OperationError;
