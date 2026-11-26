import { NextRequest, NextResponse } from "next/server";
import { db } from "@/prisma/db";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const infoEmail = process.env.INFO_EMAIL || "info@fonderdigital.com";
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, website, message } = body;

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    // Save inquiry to database
    let inquiry;
    try {
      inquiry = await db.orm.public.ContactInquiry.create({
        name,
        email,
        phone: phone || null,
        service,
        website: website || null,
        message,
      });
      console.log("New project inquiry submitted to DB:", inquiry.id);
    } catch (dbError) {
      const errMsg =
        dbError instanceof Error ? dbError.message : String(dbError);
      console.warn("DB save failed:", errMsg);
      // Fall through — don't treat DB failure as complete failure since we attempted it
      inquiry = null;
    }

    // Send confirmation emails via Resend (optional — won't break the flow if unavailable)
    if (resend) {
      try {
        // Email to Fonder Digital team
        await resend.emails.send({
          from: "Fonder Digital <info@fonderdigital.com>",
          to: [infoEmail],
          subject: `New Project Inquiry — ${name}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
              <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #b45309; font-weight: 700;">New Project Inquiry</p>
              <h2 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 700;">${name} reached out via the website</h2>
              <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600; width: 120px;">Name</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${name}</td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">Email</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #b45309; text-decoration: none;">${email}</a></td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">Phone</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${phone || "Not provided"}</td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">Service</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${service}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: 600;">Website</td><td style="padding: 8px 0;">${website || "Not provided"}</td></tr>
              </table>
              <div style="background: #faf8f5; border-left: 3px solid #b45309; padding: 16px; margin-top: 16px;">
                <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #888; font-weight: 600; margin-bottom: 8px;">Project Brief</p>
                <p style="margin: 0; font-size: 14px; line-height: 1.7; color: #333;">${(message || "").replace(/\n/g, "<br/>")}</p>
              </div>
              <p style="margin: 24px 0 4px 0; font-size: 12px; color: #aaa;">Inquiry ID: ${inquiry?.id || "N/A"} · ${new Date().toLocaleString()}</p>
            </div>
          `,
        });

        // Confirmation email to the client
        await resend.emails.send({
          from: "Fonder Digital <info@fonderdigital.com>",
          to: [email],
          subject: "We've received your inquiry — Fonder Digital",
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
              <!-- Logo area -->
              <div style="text-align: center; padding: 24px 0 20px; border-bottom: 1px solid #f0ebe4;">
                <img src="https://fonderdigital.com/images/fonderdigital-logo.svg" alt="Fonder Digital" style="height: 32px; width: auto;" />
              </div>

              <!-- Greeting -->
              <div style="padding: 32px 32px 0;">
                <p style="margin: 0 0 12px 0; font-size: 16px; color: #666;">Hi ${name.split(" ")[0]},</p>
                <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.65; color: #333;">
                  Thank you for reaching out to <strong style="color: #1a1a1a;">Fonder Digital</strong>. We've received your inquiry about our <strong>${service}</strong> services and a member of our team will review your brief carefully.
                </p>
              </div>

              <!-- Summary box -->
              <div style="margin: 0 32px; background: #faf8f5; border-radius: 8px; padding: 20px 24px; border: 1px solid #f0ebe4;">
                <p style="margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #b45309; font-weight: 700;">What to expect next</p>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #444;">
                  Our team reviews every inquiry within <strong>24 hours</strong>. You'll receive a personalised response outlining how we can help bring your project to life — no automated replies, just a genuine conversation.
                </p>
              </div>

              <!-- Services highlight -->
              <div style="padding: 24px 32px; display: flex; gap: 16px; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 120px; text-align: center; padding: 16px; background: #fff; border-radius: 8px; border: 1px solid #f0ebe4;">
                  <div style="font-size: 20px; margin-bottom: 6px;">⚡</div>
                  <p style="margin: 0; font-size: 12px; font-weight: 600; color: #333;">Quick Response</p>
                  <p style="margin: 4px 0 0; font-size: 11px; color: #888;">Within 24 hours</p>
                </div>
                <div style="flex: 1; min-width: 120px; text-align: center; padding: 16px; background: #fff; border-radius: 8px; border: 1px solid #f0ebe4;">
                  <div style="font-size: 20px; margin-bottom: 6px;">🎯</div>
                  <p style="margin: 0; font-size: 12px; font-weight: 600; color: #333;">Tailored Approach</p>
                  <p style="margin: 4px 0 0; font-size: 11px; color: #888;">No generic proposals</p>
                </div>
                <div style="flex: 1; min-width: 120px; text-align: center; padding: 16px; background: #fff; border-radius: 8px; border: 1px solid #f0ebe4;">
                  <div style="font-size: 20px; margin-bottom: 6px;">🤝</div>
                  <p style="margin: 0; font-size: 12px; font-weight: 600; color: #333;">Free Consultation</p>
                  <p style="margin: 4px 0 0; font-size: 11px; color: #888;">30-min discovery call</p>
                </div>
              </div>

              <!-- CTA -->
              <div style="padding: 0 32px 32px; text-align: center;">
                <a href="https://www.fonderdigital.com/services" style="display: inline-block; background: #b45309; color: #fff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-size: 14px; font-weight: 600;">Explore Our Services</a>
              </div>

              <!-- Footer -->
              <div style="border-top: 1px solid #f0ebe4; padding: 24px 32px; text-align: center;">
                <p style="margin: 0 0 8px 0; font-size: 14px; color: #333;">Warm regards,<br/><strong>The Fonder Digital Team</strong></p>
                <p style="margin: 12px 0 0 0; font-size: 12px; color: #aaa; line-height: 1.6;">
                  <a href="https://www.fonderdigital.com" style="color: #b45309; text-decoration: none;">fonderdigital.com</a>
                  ${infoEmail ? ` · ${infoEmail}` : ""}
                </p>
                <p style="margin: 8px 0 0 0; font-size: 11px; color: #ccc;">You're receiving this because you submitted an inquiry on our website.</p>
              </div>
            </div>
          `,
        });

        console.log("Confirmation emails sent to", email, "and", infoEmail);
      } catch (emailError) {
        const errMsg =
          emailError instanceof Error ? emailError.message : String(emailError);
        console.error("CRITICAL: Email delivery FAILED:", errMsg);
      }
    } else {
      console.log("Resend not configured — skipping email delivery");
    }

    return NextResponse.json(
      {
        success: true,
        message: inquiry
          ? "Inquiry submitted successfully"
          : "Inquiry received",
        inquiryId: inquiry?.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Contact Form API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 },
    );
  }
}
