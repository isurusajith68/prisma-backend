const prisma = require('@prisma/client')

const jwt = require('jsonwebtoken');

const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            res.send('Not authorized');
            throw new Error('Not authorized');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await prisma.user.findUnique({
            where: {
                id: decoded.userId
            }
        });

        next()


    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = isLoggedIn;