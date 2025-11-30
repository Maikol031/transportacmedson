import { sendOTPEmail } from "./utils/sendEmail";

(async () => {
  try {
    await sendOTPEmail("matheusgomes110@hotmail.com", "123456");
    console.log("Email enviado!");
  } catch (err) {
    console.error(err);
  }
})();
