import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/prisma/db';
import { Resend } from 'resend';
import { siteConfig } from '@/config/site';

const resend = new Resend(process.env.RESEND_API_KEY);
const logoUrl = `${siteConfig.url}/images/fonderdigital-logo.svg`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, website, message } = body;

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const inquiry = await db.orm.public.ContactInquiry.create({
      name,
      email,
      phone: phone || null,
      service,
      website: website || null,
      message,
    });

    console.log('New project inquiry submitted:', inquiry.id);

    await resend.emails.send({
      from: 'FonderDigital Inquiries <onboarding@resend.dev>',
      to: [siteConfig.infoEmail],
      subject: `New Project Inquiry - ${name}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
          <img src="${logoUrl}" alt="FonderDigital Logo" style="width: 150px; margin-bottom: 20px;" />
          <h2 style="color: #111;">New Project Inquiry</h2>

          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Client Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Service Interest:</strong> ${service}</p>
            <p><strong>Website:</strong> ${website || 'Not provided'}</p>
          </div>

          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Project Brief</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

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
            <p>Inquiry ID: ${inquiry.id}</p>
          </div>
        </div>
      `,
    });

    await resend.emails.send({
      from: 'FonderDigital <onboarding@resend.dev>',
      to: [email],
      subject: `We've received your project inquiry - FonderDigital`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
          <img src="${logoUrl}" alt="FonderDigital Logo" style="width: 150px; margin-bottom: 20px;" />
          <h2 style="color: #111;">Thanks for reaching out!</h2>

          <p>Hi ${name},</p>

          <p>We've received your project inquiry. Our team will review your goals and project details, and get back to you within 24 hours with a tailored response.</p>

          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Your Inquiry Summary</h3>
            <p><strong>Service Interest:</strong> ${service}</p>
            <p><strong>Brief:</strong> ${message.replace(/\n/g, '<br/>')}</p>
          </div>

          <p>If you have any additional details to share, feel free to reply directly to this email.</p>

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
            <p>Reference: ${inquiry.id}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: 'Inquiry submitted!' }, { status: 201 });
  } catch (error) {
    console.error('Contact Form API Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to submit.' }, { status: 500 });
  }
}