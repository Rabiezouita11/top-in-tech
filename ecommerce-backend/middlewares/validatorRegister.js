
const yup = require("yup");
const validate = async (req, res, next) => {
    try {
        const schema = yup.object().shape({
            nom: yup.string().required(),
            prenom: yup.string().required(),
            cin:   yup.string().required().min(8).max(8),
            email: yup.string().email().required(),
            password: yup.string().required(),
            phone:yup.string().required().min(8).max(8),

        });
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        res.status(400).json({
            error: error.errors,
        });
    }
};
module.exports = validate;