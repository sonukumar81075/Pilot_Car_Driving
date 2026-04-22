import api from "@/services/api";

const SEND_OTP_URL = process.env.NEXT_PUBLIC_SEND_OTP_URL || "/auth/update-otp";
const VERIFY_OTP_URL = process.env.NEXT_PUBLIC_VERIFY_OTP_URL || "/auth/verify-otp";

// Send OTP for login flow using full contact info format (+91xxxxxxxxxx).
export const sendOtp = async (contactInfo) => {
  const payload = {
    contactInfo,
    type: "Learner",
    purpose: "login",
  };

  const response = await api.patch(SEND_OTP_URL, payload);
  return response.data;
};

// Verify entered OTP with only required login fields.
export const verifyOtp = async ({ contactInfo, otp }) => {
  const payload = {
    contactInfo,
    type: "Learner",
    otp,
  };

  const response = await api.patch(VERIFY_OTP_URL, payload);
  return response.data;
};
