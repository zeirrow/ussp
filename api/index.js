import express from "express";
import serverless from "serverless-http";

import contactRoutes from "./routes/contactRoute.js";

const app = express();

app.use(express.json());

// Your routes
app.post("/contact", contactRoutes);

// Export the app wrapped
export default serverless(app);


