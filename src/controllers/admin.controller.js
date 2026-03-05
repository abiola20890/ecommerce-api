import Subscriber from "../models/subscriber.model.js";
import { sendEmail } from "../services/emailService.js";

export const getSubscribers = async (req, res, next) => {
    try {
        const subscribers = await Subscriber.find({}, "email subscribedAt").lean();
        return res.status(200).json({
            success: true,
            message: `${subscribers.length} subscribers found`,
            data: subscribers
        });
    } catch (error) {
        console.error(`Error fetching subscribers: ${error.message}`);
        next(error);
    }
};

export const sendPromotion = async (req, res, next) => {
    try {
        const { subject, message } = req.body;

        if (!subject || !message) {
            return res.status(400).json({
                success: false,
                message: "Subject and message are required"
            });
        }

        const subscribers = await Subscriber.find({}, "email").lean();

        if (subscribers.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No subscribers found"
            });
        }

        const results = await Promise.allSettled(
            subscribers.map(sub =>
                sendEmail(sub.email, subject, {
                    text: message,
                    html: `<p>${message}</p>`
                })
            )
        );

        const failed = results.filter(r => r.status === "rejected").length;
        const succeeded = results.filter(r => r.status === "fulfilled").length;

        return res.status(200).json({
            success: true,
            message: `Promotion sent — ${succeeded} succeeded, ${failed} failed`,
            data: {
                sentTo: subscribers.map(sub => sub.email),
                succeeded,
                failed
            }
        });
    } catch (error) {
        console.error(`Error sending promotion: ${error.message}`);
        next(error);
    }
};