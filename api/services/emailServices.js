import { Resend } from "resend";
import config from "../config/env.config.js";

const resend = new Resend(config.RESEND_API_KEY);

export const sendEmailService = async ({
  name,
  email,
  business,
  message,
}) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Zeirrow.dev <onboarding@resend.dev>",
      to: "udodirimwisdom@gmail.com",
      subject: `New project inquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 1rem; background-color: #f9fafb; color: #111827;">
          <h2 style="color: #06b6d4;">New Project Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Business Name:</strong> ${business}</p>
          <p style="margin-top:1rem;"><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background-color: #e5e7eb; padding: 1rem; border-radius: 0.5rem;">
            ${message}
          </p>
          <hr style="margin-top: 2rem;" />
          <p style="font-size: 0.875rem; color: #6b7280;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, message: "Failed to send email", error };
    }

    return { success: true, message: "Message sent successfully!", data };
  } catch (error) {
    console.error("Server error:", error);
    return { success: false, message: "Internal server error", error };
  }
};
