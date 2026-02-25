import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const { error } = await resend.emails.send({
      from: 'FreshtenOS <onboarding@resend.dev>',
      to: 'LacsonRosales@gmail.com',
      replyTo: email,
      subject: `[FreshtenOS] New contact from ${name}`,
      html: `
        <div style="font-family: monospace; background: #0f172a; color: #e2e8f0; padding: 32px; border-radius: 12px; max-width: 560px;">
          <div style="color: #38bdf8; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 20px;">
            FreshtenOS — Incoming Contact
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 8px 0; color: #64748b; font-size: 12px; width: 80px;">From</td>
              <td style="padding: 8px 0; color: #f1f5f9; font-size: 12px;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #1e293b;">
              <td style="padding: 8px 0; color: #64748b; font-size: 12px;">Email</td>
              <td style="padding: 8px 0; color: #38bdf8; font-size: 12px;">${email}</td>
            </tr>
          </table>
          <div style="margin-top: 20px;">
            <div style="color: #64748b; font-size: 11px; margin-bottom: 8px;">Message:</div>
            <div style="background: #1e293b; border-radius: 8px; padding: 16px; color: #cbd5e1; font-size: 13px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          </div>
          <div style="margin-top: 20px; color: #334155; font-size: 10px;">
            Sent via FreshtenOS ContactIDE — freshten-os portfolio
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
