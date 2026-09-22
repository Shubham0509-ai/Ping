import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "../emails/emailTemplates.js";
import { ApiError } from "../utils/ApiError.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
    if (!resendClient) {
        console.warn("Resend client is not configured (RESEND_API_KEY is missing). Skipping welcome email.");
        return;
    }

    const { data, error } = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: "Welcome to Ping!",
        html: createWelcomeEmailTemplate(name, clientURL)
    });

    if (error) {
        console.error("Error sending welcome email: ", error);
        throw new ApiError(405, "Failed to send welcome email");
    }

    console.log("Welcome email sent successfully ", data);
};