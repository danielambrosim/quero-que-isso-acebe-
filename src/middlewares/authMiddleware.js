// middlewares/authMiddleware.js
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        // Verifique a validade do token (por exemplo, usando JWT)
        // Se válido, chame next()
        // Se não, retorne um erro
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = authMiddleware;