
export const generateOTP = async () => {
  try {
    let otp = Math.random();
    otp = otp * 10000000;
    otp = Math.trunc(otp);
    otp = otp + "";
    otp = otp.slice(0, 6);
    otp = otp * 1;
    return otp;
  } catch (error) {
    console.log(error.message);
  }
}