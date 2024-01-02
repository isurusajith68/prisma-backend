//bring in prisma and cookieToken
const prisma = require('../prisma/index');
const cookieToken = require('../utils/cookieToken');

//user signUp 
exports.signUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            throw new Error('Please provide all fields');
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        });
        cookieToken(user, res);

    } catch (error) {
        throw new Error(error.message);
    }
}

//login user
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error('Please provide all fields');
        }

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            throw new Error('Invalid credentials');
        }

        //check if password matches
        if (user.password !== password) {
            throw new Error('Invalid credentials');
        }

      

        cookieToken(user, res);

    } catch (error) {
        throw new Error(error.message);
    }
}

//logout user
exports.logout = async (req, res, next) => {
    try {
        res.clearCookie('jwt');

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        throw new Error(error.message);
    }
}