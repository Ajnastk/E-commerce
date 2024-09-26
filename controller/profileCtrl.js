const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel"); // Your user model
const {
  sendEmail,
  generateToken,
  verifyToken,
} = require("../utils/emailUtils"); // Import the email utility
const bcrypt = require("bcryptjs");

// --------- Get forgot password page -----------
const forgotpasswordGet = (req, res) => {
  res.render("forgot-password");
};

// --------- POST forgot password -----------
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Check if email is provided
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Generate OTP (One-Time Password)
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP in the session (with expiry of 5 minutes)
    req.session.otp = otp;
    req.session.email = email;
    req.session.otpExpiresAt = Date.now() + 300000; // Expires in 5 minutes

    // Construct the HTML content for the email
    const htmlContent = `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2 style="color: #000; text-align: center;">Reset Your Password</h2>
                <p style="text-align: center; font-size: 16px;">
                    Dear Customer,
                </p>
                <p style="text-align: center; font-size: 16px;">
                    We received a request to reset the password for your <strong>MaleFashion Clothing Store</strong> account.
                </p>
                <div style="text-align: center; padding: 20px; background-color: #f4f4f4; margin: 20px 0; border-radius: 8px;">
                    <p style="font-size: 18px; margin: 0;">Your OTP is:</p>
                    <p style="font-size: 24px; font-weight: bold; color: #333; margin: 0;">${otp}</p>
                    <p style="font-size: 14px; color: #777;">(It is valid for 5 minutes)</p>
                </div>
                <p style="text-align: center; font-size: 16px;">
                    If you did not request this, please ignore this email or
                    <a href="https://localhost:3005/contact" style="color: #000; text-decoration: underline;">contact our support team</a>.
                </p>
                <p style="text-align: center; font-size: 16px;">
                    Thank you,<br />
                    <strong>MaleFashion Clothing Store Team</strong>
                </p>
                <hr />
                <p style="text-align: center; font-size: 12px; color: #777;">
                    © 2024 MaleFashion Clothing Store. All rights reserved.
                </p>
            </div>
        `;

    // Send email with the OTP
    await sendEmail(
      email,
      "Password Reset Request",
      `Your requested password reset OTP is: ${otp}`,
      htmlContent
    );

    return res
      .status(200)
      .json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    console.error("Error during password reset request:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});
//------get verify otp page----
const verifyotpGet = (req, res) => {
  res.render("verify-otp");
};

//----post verify otp ---------

const verifyOtp = asyncHandler(async (req, res) => {
  try {
    const { otp } = req.body;

    const sessionOtp = req.session.otp;
    const sessionOtpExpiry = req.session.otpExpiresAt;

    const errorMessages = {
      missingOtp: "No OTP found in session.",
      invalidOtp: "Invalid OTP.",
      expiredOtp: "OTP has expired.",
    };

    // Check if OTP or its expiry is missing
    if (!sessionOtp || !sessionOtpExpiry) {
      return res
        .status(400)
        .json({ success: false, message: errorMessages.missingOtp });
    }

    // Check if the OTP is incorrect
    if (sessionOtp !== otp) {
      return res
        .status(400)
        .json({ success: false, message: errorMessages.invalidOtp });
    }

    // Check if the OTP has expired
    if (Date.now() > sessionOtpExpiry) {
      return res
        .status(400)
        .json({ success: false, message: errorMessages.expiredOtp });
    }

    // OTP is valid, clear it from the session
    req.session.otp = null;
    req.session.otpExpiresAt = null;

    // Send success response
    res.status(200).json({
      success: true,
      message: "OTP verified successfully.",
    });
  } catch (error) {
    console.error("Error during OTP verification:", error);

    // Send an error response
    res.status(500).json({
      success: false,
      message: "An error occurred during OTP verification. Please try again.",
    });
  }
});
//-------get reset password-----

const resetpasswordGet = (req, res) => {
  res.render("reset-password");
};

//------post reset password

const resetPassword = asyncHandler(async (req, res) => {
  try {
    const { newPassword } = req.body;

    // Check if email is in session
    const sessionEmail = req.session.email;
    if (!sessionEmail) {
      res
        .status(400)
        .json({
          success: false,
          message:
            "Session expired or no email found. Please verify OTP again.",
        });
    } else {
      // Find the user by email
      const user = await User.findOne({ email: sessionEmail });
      if (!user) {
        res.status(404).json({ success: false, message: "User not found." });
      } else {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password in database
        user.password = hashedPassword;
        await user.save();

        // Clear session and respond
        req.session.email = null;
        req.session.otp = null;
        req.session.otpExpiresAt = null;

        res.status(200).json({
          success: true,
          message: "Password reset successfully.",
        });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred during password reset. Please try again.",
      });
  }
});

module.exports = {
  forgotpasswordGet,
  forgotPassword,
  verifyotpGet,
  verifyOtp,
  resetpasswordGet,
  resetPassword,
};
