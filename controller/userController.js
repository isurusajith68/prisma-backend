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