import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/prisma/db';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const infoEmail = process.env.INFO_EMAIL || 'info@fonderdigital.com';
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const logoUrl = 'https://fonderdigital.com/images/fonderdigital-logo.svg';
const primaryColor = '#b45309';

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, subscribed } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    if (subscribed === undefined) {
      return NextResponse.json(
        { success: false, message: 'Subscribed status is required' },
        { status: 400 }
      );
    }

    const status = subscribed ? 'subscribed' : 'unsubscribed';

    if (resend) {
      try {
        const emailContent = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
  <!-- Header with Logo -->
  <div style="text-align: center; padding: 24px 0 20px; border-bottom: 1px solid #f0ebe4;">
    <a href="https://fonderdigital.com" style="text-decoration: none;">
      <img src="${logoUrl}" alt="FonderDigital" style="height: 32px; width: auto; display: inline-block;" />
    </a>
  </div>

  <!-- Main Content -->
  <div style="padding: 32px;">

    <!-- Greeting -->
    <p style="margin: 0 0 12px 0; font-size: 16px; color: #666;">Hi there,</p>

    <!-- Subscription Status Message -->
    <div style="padding: 20px 24px; border-radius: 8px; margin: 16px 0; background: ${subscribed ? '#e8f5e9' : '#ffebee'}; border-left: 4px solid ${subscribed ? '#43a047' : '#e53935'};">
      <h2 style="margin: 0; font-size: 18px; color: ${subscribed ? '#2e7d32' : '#c62828'}; font-weight: 600;">
        ${subscribed ? 'Welcome to FonderDigital Newsletter!' : 'Unsubscribed from Newsletter'}
      </h2>
    </div>

    <!-- Professional Company Lines -->
    <div style="margin: 24px 0;">
      <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.65; color: #444;">
        FonderDigital is a strategic product design agency helping startups and scale-ups build
        <strong style="color: #1a1a1a;">digital products</strong> that users love and investors believe in.
      </p>
      <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.65; color: #444;">
        We specialize in UI/UX design, product strategy, and development workflows that
        accelerate time-to-market for US and UK-based founders.
      </p>
      <p style="margin: 0; font-size: 15px; line-height: 1.65; color: #444;">
        Join 2,000+ founders who receive our weekly insights on product growth and design strategy.
      </p>
    </div>

    <!-- CTA for subscribed users -->
    ${subscribed ? `
    <div style="text-align: center; margin: 24px 0;">
      <a href="https://www.fonderdigital.com/blog" style="display: inline-block; background: ${primaryColor}; color: #fff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-size: 14px; font-weight: 600;">Explore Latest Insights</a>
    </div>
    ` : ''}

    <!-- Footer Note -->
    <div style="padding-top: 24px; border-top: 1px solid #f0ebe4; margin-top: 32px; font-size: 14px; color: #888;">
      <p style="margin: 0;">If you have any questions, simply reply to this email — we're always happy to help.</p>
      <p style="margin: 8px 0 0 0; font-size: 12px; color: #aaa;">
        <a href="https://www.fonderdigital.com/privacy" style="color: #aaa; text-decoration: underline;">View our privacy policy</a> · Update preferences · Unsubscribe anytime
      </p>
    </div>
  </div>

  <!-- Footer -->
  <div style="border-top: 1px solid #f0ebe4; padding: 24px 32px; text-align: center; font-size: 12px; color: #999;">
    <p style="margin: 0 0 8px 0;">FonderDigital · 10th Floor, business hub · ${infoEmail}</p>
    <p style="margin: 0;">© ${new Date().getFullYear()} FonderDigital. All rights reserved.</p>
  </div>
</div>
`;

        await resend.emails.send({
          from: 'FonderDigital <onboarding@resend.dev>',
          to: [email],
          subject: `${subscribed ? 'Welcome' : 'Goodbye'} — FonderDigital Newsletter`,
          html: emailContent,
        });

        console.log(`Newsletter ${status} email sent to: ${email}`);
      } catch (emailError) {
        const errMsg = emailError instanceof Error ? emailError.message : String(emailError);
        console.warn('Newsletter email delivery failed (non-fatal):', errMsg);
      }
    } else {
      console.log('Resend not configured — skipping newsletter email');
    }

    return NextResponse.json({
      success: true,
      message: subscribed ? 'Subscribed to newsletter' : 'Unsubscribed from newsletter',
      email,
      status,
    });
  } catch (error) {
    console.error('Newsletter update error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update newsletter subscription' },
      { status: 500 }
    );
  }
}