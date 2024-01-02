const getJwtToken = require('../helpers/getJwtToken')

const cookieToken = (user, res) => {
    const token = getJwtToken(user.id)
    const options = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    user.password = undefined
    res.status(200).cookie('jwt', token, options).json({
        status: true,
        token,
        user
    })

}

module.exports = cookieToken