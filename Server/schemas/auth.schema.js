const zod = require("zod");

const registerSchema = zod.object({
    username: zod.string({
        required_error: 'Username is required'
    }),
    email: zod.string({
        required_error: 'Email is required'
    }).email({
        message: 'Email is not invalid'
    }),
    password: zod.string({
        required_error: 'Password is required'
    })
    .min(6, {
        message: "Password must be at least 6 characters",
    }),
});

const loginSchema = zod.object({
    email: zod.string({
        required_error: "Email is required",
    }).email({
        message: 'Email is not invalid',
    }),
    password: zod.string({
        required_error: "Password is required",
    }).min(6, {
        message: "Password must be at least 6 characters",
    })
})

module.exports = {
    registerSchema,
    loginSchema
}