import { NextRequest, NextResponse } from "next/server";
import { db } from "@/prisma/db";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const infoEmail = process.env.INFO_EMAIL || "info@fonderdigital.com";
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const logoUrl = "https://fonderdigital.com/images/fonderdigital-logo.svg";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      service,
      website,
      message,
      bookingDate,
      duration,
    } = body;

    if (!name || !email || !service || !bookingDate || !duration) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    const booking = await db.orm.public.Booking.create({
      name,
      email,
      phone: phone || null,
      service,
      website: website || null,
      message: message || null,
      bookingDate: new Date(bookingDate),
      duration: parseInt(duration),
      status: "pending",
    });

    console.log("New strategy session scheduled:", booking);

    if (resend) {
      try {
        const formattedDate = new Date(bookingDate).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          weekday: "long",
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        const durationText = `${duration} minutes`;

        // Email to FonderDigital team
        await resend.emails.send({
          from: "FonderDigital <info@fonderdigital.com>",
          to: [infoEmail],
          subject: `New Strategic Session Request — ${name}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
              <div style="text-align: center; padding: 24px 0 20px; border-bottom: 1px solid #f0ebe4;">
                <img src="${logoUrl}" alt="FonderDigital" style="height: 32px; width: auto;" />
              </div>

              <div style="padding: 32px;">
                <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #b45309; font-weight: 700;">New Strategic Session Request</p>
                <h2 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 700;">${name} booked a ${duration}-minute session</h2>

                <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600; width: 140px;">Name</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${name}</td></tr>
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">Email</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #b45309; text-decoration: none;">${email}</a></td></tr>
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">Phone</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${phone || "Not provided"}</td></tr>
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">Service</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${service}</td></tr>
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">Website</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${website || "Not provided"}</td></tr>
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">Preferred Time</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${formattedDate} (IST)</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: 600;">Duration</td><td style="padding: 8px 0;">${durationText}</td></tr>
                </table>

                ${
                  message
                    ? `
                <div style="background: #faf8f5; border-left: 3px solid #b45309; padding: 16px; margin-top: 16px;">
                  <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #888; font-weight: 600;">Notes</p>
                  <p style="margin: 0; font-size: 14px; line-height: 1.7; color: #333;">${message.replace(/\n/g, "<br/>")}</p>
                </div>
                `
                    : ""
                }

                <p style="margin: 24px 0 4px 0; font-size: 12px; color: #aaa;">Booking ID: ${booking.id} · ${new Date().toLocaleString()}</p>
              </div>

              <div style="border-top: 1px solid #f0ebe4; padding: 16px 32px; text-align: center; font-size: 12px; color: #999;">
                FonderDigital · ${infoEmail}
              </div>
            </div>
          `,
        });

        // Confirmation email to client
        await resend.emails.send({
          from: "FonderDigital <info@fonderdigital.com>",
          to: [email],
          subject: "Strategic Consultation Request Received — FonderDigital",
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
              <div style="text-align: center; padding: 24px 0 20px; border-bottom: 1px solid #f0ebe4;">
                <img src="${logoUrl}" alt="FonderDigital" style="height: 32px; width: auto;" />
              </div>

              <div style="padding: 32px;">
                <p style="margin: 0 0 12px 0; font-size: 16px; color: #666;">Hi ${name.split(" ")[0]},</p>
                <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.65; color: #333;">
                  Thanks for booking a <strong>${duration}-minute strategic consultation</strong> with FonderDigital. We've received your request for <strong>${formattedDate} (IST)</strong> focusing on <strong>${service}</strong>.
                </p>

                <div style="background: #faf8f5; border-radius: 8px; padding: 20px 24px; margin: 20px 0; border: 1px solid #f0ebe4;">
                  <p style="margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #b45309; font-weight: 700;">What happens next</p>
                  <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #444;">
                    Our team will review your request and follow up within <strong>24 hours</strong> with a confirmed Google Meet link and calendar invitation.
                  </p>
                </div>

                <div style="margin: 24px 0; padding-top: 16px; border-top: 1px solid #f0ebe4;">
                  <p style="margin: 0 0 8px 0; font-size: 14px; color: #333;">Warm regards,<br/><strong>The FonderDigital Team</strong></p>
                  <p style="margin: 0; font-size: 12px; color: #aaa;">
                    <a href="https://www.fonderdigital.com" style="color: #b45309; text-decoration: none;">fonderdigital.com</a> · ${infoEmail}
                  </p>
                </div>
              </div>

              <div style="border-top: 1px solid #f0ebe4; padding: 16px 32px; text-align: center; font-size: 11px; color: #ccc;">
                Reference: ${booking.id}
              </div>
            </div>
          `,
        });

        console.log("Session emails sent to", infoEmail, "and", email);
      } catch (emailError) {
        const errMsg =
          emailError instanceof Error ? emailError.message : String(emailError);
        console.error("CRITICAL: Session email delivery FAILED:", errMsg);
      }
    } else {
      console.log("Resend not configured — skipping session emails");
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Strategic session request received. We will contact you shortly.",
        bookingId: booking.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Session Scheduling Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to schedule session. Please try again.",
      },
      { status: 500 },
    );
  }
}
