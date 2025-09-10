import { sendEmailService } from "../services/emailServices.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, business, message } = req.body;

    const data = await sendEmailService({ name, email, business, message });

    if (!data.success) {
      return res.status(500).json({ error: data.message });
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("Handler error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
