import Welcometamplate from "../../email/welcome_tamplate.js";
import Sorrytamplate from "../../email/sorry_tamplate.js";
import Thankuh from "../../email/thankuh.js";

import { sendEmail } from "./email_helper.js";
import welcomeThankuhTemplate from "../../email/welcomeandthanku.js";


export const TosendWelcomeAndThankuh = async (user, amount) => {
  await sendEmail({
    to: user.email,
    subject: "Welcome & Thank You for Shopping 🎉🙏",
    html: welcomeThankuhTemplate(user.email, amount)
  });
};

export const Tosendwelcome = async (user) => {
  await sendEmail({
    to: user.email,
    subject: "Welcome 🎉",
    html: Welcometamplate(user.email)
  });
};



export const Tosendsorry = async (user) => {
  await sendEmail({
    to: user.email,
    subject: "Order failed ❌",
    html: Sorrytamplate(user.email)
  });
};

export const Tosendthankuh = async (user, amount) => {
  await sendEmail({
    to: user.email,
    subject: "Thank You for shopping with us🙏",
    html: Thankuh(user.email, amount)
  });


};
