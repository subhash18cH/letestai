"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readJSON = readJSON;
exports.writeJSON = writeJSON;
const promises_1 = __importDefault(require("fs/promises"));
//function to read a file
function readJSON(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield promises_1.default.readFile(filePath, "utf-8");
            return JSON.parse(data);
        }
        catch (_a) {
            return [];
        }
    });
}
//function to write to a file
function writeJSON(filePath, data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield promises_1.default.writeFile(filePath, JSON.stringify(data, null, 2));
    });
}
