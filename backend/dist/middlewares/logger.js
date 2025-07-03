"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRequests = void 0;
//helper logger function
const logRequests = (req, res, next) => {
    console.log(`[${req.method}] ${req.path}`);
    next();
};
exports.logRequests = logRequests;
