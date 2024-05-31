"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
// Auth Token Verification
const verifyToken = (req, res, next) => {
    try {
        // const token = req.headers['authorization'];
        // const decodedToken = decodeURI(token as string)
        //     .split('%2C')[0]
        //     .slice(2, -1);
        // jwt.verify(decodedToken, process.env.JWT_SECRET as Secret) as JwtPayload;
    }
    catch (err) {
        console.log('Error: ' + err);
        res.status(401).json({ error: 'Invalid `authorization` header' });
    }
    next();
};
exports.verifyToken = verifyToken;
