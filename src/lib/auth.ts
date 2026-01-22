import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  trustedOrigins: [process.env.APP_URL || "http://localhost:4000"],

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn :false,
    requireEmailVerification : true
  },

  emailVerification: {
    sendOnSignUp:true,
    sendVerificationEmail: async ( { user, url, token }, request) => {

      try {
        const verificationURL = `${process.env.APP_URL}/verifyemail?token=${token}`
      const info = await transporter.sendMail({
        from: '"devBlogX" <uttamrohit4545@gmail.com>',
        to: user.email,
        subject: "Please Verify your email",
        html: `
<div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 30px;">
  <div style="max-width: 520px; margin: auto; background: #ffffff; padding: 25px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.08);">
    
    <h2 style="color: #333; text-align: center;">Verify Your Email</h2>

    <p style="font-size: 15px; color: #555;">
      Hello <strong>${user.name || "User"}</strong>,
    </p>

    <p style="font-size: 14px; color: #555;">
      Thanks for signing up on <strong>DevBlogX</strong>! Please confirm your email address by clicking the button below:
    </p>

    <div style="text-align: center; margin: 25px 0;">
      <a href="${verificationURL}" 
         style="background-color: #2563eb; color: #ffffff; padding: 12px 22px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
         Verify Email
      </a>
    </div>

    <p style="font-size: 13px; color: #777;">
      If the button doesn't work, copy and paste this link into your browser:
    </p>

    <p style="font-size: 12px; word-break: break-all;">
  <a href="${verificationURL}" style="color: #2563eb;">
    ${verificationURL}
    
  </a>
</p>


    <hr style="margin: 25px 0; border: none; border-top: 1px solid #ddd;" />

    <p style="font-size: 12px; color: #999; text-align: center;">
      If you did not create an account, please ignore this email.<br/>
      © ${new Date().getFullYear()} DevBlogX. All rights reserved.
    </p>

  </div>
</div>
`

      });
    
      console.log("Message sent:", info.messageId);

      }catch(error){
        console.error("Failed to send verification email:", error);
      }
    }
  }


});
