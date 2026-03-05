import Subscriber from "../models/subscriber.model.js";

export const subscribeUser = async (req, res, next) => {
    const { email } = req.body;
    try {
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const subscriber = await Subscriber.create({ email });

        return res.status(201).json({
            success: true,
            message: "Subscribed successfully",
            data: subscriber
        });
    } catch (error) {
        // Handle duplicate email gracefully
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "This email is already subscribed"
            });
        }
        console.error(`Error subscribing user: ${error.message}`);
        next(error);
    }
};