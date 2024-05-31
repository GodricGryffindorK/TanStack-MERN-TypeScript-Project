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
exports.instance = exports.server = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
;
const auth_verification_1 = require("./middleware/auth-verification");
const auth_1 = __importDefault(require("./routes/auth"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.server = app;
const port = process.env.PORT || 3000;
console.log(1);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const allowedOrigins = ['http://localhost:9999'];
app.use((0, cors_1.default)());
app.use(auth_verification_1.verifyToken);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.use("/auth", auth_1.default);
// Connect to MongoDB server
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect('mongodb://127.0.0.1:27017/login_system');
        console.log('Connected to database');
    }
    catch (err) {
        console.log('Connection to database failed. Error: ' + err);
    }
}))();
const instance = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
exports.instance = instance;
