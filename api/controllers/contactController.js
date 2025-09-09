import { sendEmailService } from "../services/emailServices.js";

export const handleContact = async (req, res, next) => {
  try {
    const { name, email, business, message } = req.body;

    const data = await sendEmailService({
      name,
      email,
      business,
      message,
    });

    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
