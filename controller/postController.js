const prisma = require('../prisma/index');

exports.createPost = async (req, res, next) => {
    try {
        const { slug, title, body, authorId } = req.body;

        if (!title || !body) {
            throw new Error('Please provide all fields');
        }

        const post = await prisma.post.create({
            data: {
                slug,
                title,
                body,
                author: {
                    connect: {
                        id: authorId
                    }
                }
            }
        });

        res.status(200).json({
            success: true,
            data: post
        })

    } catch (error) {
        throw new Error(error.message);
    }
}

exports.updatePost = async (req, res, next) => {

    const { id } = req.params;
    const { title, body } = req.body;

    try {

        const post = await prisma.post.update({
            where: {
                id: id
            },
            data: {
                title,
                body
            }
        });

        res.status(200).json({
            success: true,
            data: post
        })

    } catch (error) {
        throw new Error(error.message);
    }
}

exports.deletePost = async (req, res, next) => {
    const { id } = req.params;

    try {
        await prisma.post.delete({
            where: {
                id: id
            }
        });

        res.status(200).json({
            success: true,
            data: {}
        })

    } catch (error) {
        throw new Error(error.message);
    }
}

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await prisma.post.findMany()

        res.status(200).json({
            success: true,
            data: posts
        })
    } catch (error) {
        throw new Error(error.message);
    }
}



