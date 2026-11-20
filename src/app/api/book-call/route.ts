import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/prisma/db';
import { Resend } from 'resend';
import { siteConfig } from '@/config/site';

const resend = new Resend(process.env.RESEND_API_KEY);
const logoUrl = `${siteConfig.url}/images/fonderdigital-logo.svg`;

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
      duration
    } = body;

    if (!name || !email || !service || !bookingDate || !duration) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
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
      status: 'pending',
    });

    console.log('New strategy session scheduled:', booking);

    try {
      const formattedDate = new Date(bookingDate).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      const durationText = `${duration} minutes`;

      await resend.emails.send({
        from: 'FonderDigital Sessions <onboarding@resend.dev>',
        to: [siteConfig.infoEmail],
        subject: `New Strategic Session Request - ${name}`,
        html: `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
            <img src="${logoUrl}" alt="FonderDigital Logo" style="width: 150px; margin-bottom: 20px;" />
            <h2 style="color: #111;">New Strategic Consultation Request</h2>

            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Client Details</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
              <p><strong>Service Focus:</strong> ${service}</p>
              <p><strong>Website:</strong> ${website || 'Not provided'}</p>
            </div>

            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Session Details</h3>
              <p><strong>Preferred Date & Time:</strong> ${formattedDate} (IST)</p>
              <p><strong>Duration:</strong> ${durationText}</p>
            </div>

            ${message ? `
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Notes / Message</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            ` : ''}

            <div style="margin-top: 30px;">
              <p style="margin-bottom: 5px;">Regards,</p>
              <table style="border-collapse: collapse; width: 100%;">
                <tr>
                  <td style="width: 160px; vertical-align: middle;">
                    <img src="${logoUrl}" alt="FonderDigital" style="width: 140px;" />
                  </td>
                  <td style="vertical-align: middle; border-left: 1px solid #ddd; padding-left: 15px;">
                    <p style="margin: 0; font-weight: bold; font-size: 16px;">Co-Founder</p>
                    <p style="margin: 0; color: #666;">${siteConfig.infoEmail}</p>
                  </td>
                </tr>
              </table>
            </div>

            <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; color: #999; font-size: 12px;">
              <p>Session ID: ${booking.id}</p>
            </div>
          </div>
        `,
      });
      console.log('Session email sent to info@fonderdigital.com');
    } catch (emailError) {
      console.error('Failed to send session email:', emailError);
    }

    try {
      const formattedDate = new Date(bookingDate).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      await resend.emails.send({
        from: 'FonderDigital <onboarding@resend.dev>',
        to: [email],
        subject: `Strategic Consultation Request Received - FonderDigital`,
        html: `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
            <img src="${logoUrl}" alt="FonderDigital Logo" style="width: 150px; margin-bottom: 20px;" />
            <h2 style="color: #111;">Consultation Request Received</h2>

            <p>Hi ${name},</p>

            <p>Thank you for requesting a strategic consultation session with FonderDigital. We're excited to learn more about your project goals.</p>

            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Requested Session Details</h3>
              <p><strong>Preferred Time:</strong> ${formattedDate} (IST)</p>
              <p><strong>Duration:</strong> ${duration} minutes</p>
              <p><strong>Focus Area:</strong> ${service}</p>
            </div>

            <p>Our team is reviewing your request and will follow up with a confirmed Google Meet link and calendar invitation shortly.</p>

            <div style="margin-top: 30px;">
              <p style="margin-bottom: 5px;">Regards,</p>
              <table style="border-collapse: collapse; width: 100%;">
                <tr>
                  <td style="width: 160px; vertical-align: middle;">
                    <img src="${logoUrl}" alt="FonderDigital" style="width: 140px;" />
                  </td>
                  <td style="vertical-align: middle; border-left: 1px solid #ddd; padding-left: 15px;">
                    <p style="margin: 0; font-weight: bold; font-size: 16px;">Co-Founder</p>
                    <p style="margin: 0; color: #666;">${siteConfig.infoEmail}</p>
                  </td>
                </tr>
              </table>
            </div>

            <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; color: #999; font-size: 12px;">
              <p>Reference: ${booking.id}</p>
            </div>
          </div>
        `,
      });
      console.log('Confirmation email sent to client:', email);
    } catch (emailError) {
      console.error('Failed to send confirmation to client:', emailError);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Strategic session request received. We will contact you shortly.',
        bookingId: booking.id
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Session Scheduling Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to schedule session. Please try again.' },
      { status: 500 }
    );
  }
}