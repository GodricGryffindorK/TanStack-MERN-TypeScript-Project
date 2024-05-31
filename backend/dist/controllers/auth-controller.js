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
exports.deleteUser = exports.home = exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const user_1 = require("../models/user");
// Register
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Hash email and password before saving to DB
        console.log(req.body);
        let hashEmail = crypto_js_1.default.SHA256(req.body.email).toString(crypto_js_1.default.enc.Base64);
        let hashPassword = crypto_js_1.default.SHA256(req.body.password).toString(crypto_js_1.default.enc.Base64);
        yield user_1.User.create({
            name: req.body.name,
            email: hashEmail,
            password: hashPassword
        });
        res.status(201).json({ message: 'account created' });
    }
    catch (err) {
        console.log('Error: ' + err);
        res.status(409).json({ error: 'account exists already' });
    }
});
exports.registerUser = registerUser;
// Login
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Hash requested email before checking DB
        const user = yield user_1.User.findOne({
            email: crypto_js_1.default.SHA256(req.body.email).toString(crypto_js_1.default.enc.Base64),
        });
        if (!user) {
            console.log('User not found');
            res.status(404).send('User not found');
            return;
        }
        // Hash requested password and compare with password in DB
        let isPasswordValid = crypto_js_1.default.SHA256(req.body.password).toString(crypto_js_1.default.enc.Base64) === user.password;
        // Create jwt if requested email and password are valid 
        if (isPasswordValid) {
            const token = jsonwebtoken_1.default.sign({
                name: user.name,
                email: user.email
            }, process.env.JWT_SECRET, {
                expiresIn: '24h'
            });
            res.status(200).json({ message: 'account found', user: token, username: user.name.toLowerCase() });
        }
        else {
            res.status(400).json({ error: 'incorrect password', user: false });
        }
    }
    catch (err) {
        console.log('Error: ' + err);
        res.status(404).json({ error: 'account does not exist' });
    }
});
exports.loginUser = loginUser;
// Home
const home = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers['authorization'];
        const decodedToken = decodeURI(token)
            .split('%2C')[0]
            .slice(2, -1);
        const user = yield user_1.User.findOne({ email: jsonwebtoken_1.default.decode(decodedToken).email });
        if (user) {
            res.status(200).json({ username: user.name });
        }
    }
    catch (err) {
        console.log('Error: ' + err);
        res.status(404).json({ error: 'user not found' });
    }
});
exports.home = home;
// Delete User
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers['authorization'];
        const decodedToken = decodeURI(token)
            .split('%2C')[0]
            .slice(2, -1);
        yield user_1.User.deleteOne({ email: jsonwebtoken_1.default.decode(decodedToken).email });
        res.status(200).json({ message: 'account deleted successfully' });
    }
    catch (err) {
        console.log('Error: ' + err);
        res.status(500);
    }
});
exports.deleteUser = deleteUser;
