import jwt from 'jsonwebtoken';

export const fetchUserInfo = (req, res, next) => {
    const currToken = req.header('token');
    if (!currToken) {
        return res.status(401).send({ error: "Invalid authentication token" });
    }
    try {
        const data = jwt.verify(currToken, "jsonsecretkeyisasecretkey");
        req.user = data.currUser;
        next();
    } catch (error) {
        return res.status(401).send({ error: "Invalid authentication token" });
    }
}