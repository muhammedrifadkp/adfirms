import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fname, phone, pkg } = body;

    if (!fname || !phone) {
      return NextResponse.json(
        { error: 'Name and phone number are required.' },
        { status: 400 }
      );
    }

    const googleSheetsUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.TO_EMAIL || 'info@ad-firms.com';
    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';

    let sheetsSuccess = false;
    let emailSuccess = false;
    let sheetsError = '';
    let emailError = '';

    // 1. Submit to Google Sheets
    if (googleSheetsUrl) {
      try {
        console.log("Submitting to Google Sheets webhook:", googleSheetsUrl);
        // Prepend a single quote to prevent Google Sheets from interpreting +phone as a formula (which causes #ERROR!)
        const formattedPhoneForSheets = phone.trim().startsWith('+') ? `'${phone.trim()}` : phone;
        
        const response = await fetch(googleSheetsUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fname, phone: formattedPhoneForSheets, pkg }),
        });
        
        if (response.ok) {
          sheetsSuccess = true;
          console.log("Google Sheets submission succeeded!");
        } else {
          sheetsError = `Status: ${response.status}`;
          console.error("Google Sheets submission returned non-OK status:", response.status);
        }
      } catch (err: any) {
        sheetsError = err.message || String(err);
        console.error("Google Sheets fetch failed:", err);
        if (err.cause) {
          console.error("Google Sheets fetch cause:", err.cause);
        }
      }
    } else {
      sheetsError = 'GOOGLE_SHEET_WEBHOOK_URL environment variable is not defined.';
      console.warn(sheetsError);
    }

    // 2. Submit to Resend
    if (resendApiKey) {
      try {
        console.log("Submitting to Resend API...");
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: `Adfirms Leads <${fromEmail}>`,
            to: [toEmail],
            subject: `New Lead: ${fname} - Business Setup Dubai`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
                <h2 style="color: #0b1f3a; border-bottom: 2px solid #f2b724; padding-bottom: 10px; margin-top: 0;">New Lead Inquiry</h2>
                <p style="font-size: 16px; color: #4a5568; margin-bottom: 20px;">A new lead has submitted a callback request on <strong>Adfirms</strong>.</p>
                
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                  <tr style="background-color: #f7fafc;">
                    <td style="padding: 10px; border: 1px solid #edf2f7; font-weight: bold; width: 30%; color: #4a5568;">Full Name:</td>
                    <td style="padding: 10px; border: 1px solid #edf2f7; color: #2d3748;">${fname}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border: 1px solid #edf2f7; font-weight: bold; color: #4a5568;">Phone / WhatsApp:</td>
                    <td style="padding: 10px; border: 1px solid #edf2f7; color: #2d3748;">
                      <a href="tel:${phone}" style="color: #1153a0; text-decoration: none; font-weight: bold;">${phone}</a>
                      &nbsp;|&nbsp;
                      <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" target="_blank" style="color: #25d366; text-decoration: none; font-weight: bold;">Chat on WhatsApp</a>
                    </td>
                  </tr>
                  <tr style="background-color: #f7fafc;">
                    <td style="padding: 10px; border: 1px solid #edf2f7; font-weight: bold; color: #4a5568;">Industry / Package:</td>
                    <td style="padding: 10px; border: 1px solid #edf2f7; color: #2d3748;">${pkg || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border: 1px solid #edf2f7; font-weight: bold; color: #4a5568;">Submission Date:</td>
                    <td style="padding: 10px; border: 1px solid #edf2f7; color: #2d3748;">${new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' })} GST</td>
                  </tr>
                </table>
                
                <div style="text-align: center; margin-top: 30px;">
                  <p style="font-size: 12px; color: #a0aec0; margin: 0;">This email was automatically generated by the Adfirms website lead portal.</p>
                </div>
              </div>
            `,
          }),
        });

        if (response.ok) {
          emailSuccess = true;
          console.log("Resend email submission succeeded!");
        } else {
          const errData = await response.json();
          emailError = `Status: ${response.status} - ${JSON.stringify(errData)}`;
          console.error("Resend email submission returned non-OK status:", response.status, errData);
        }
      } catch (err: any) {
        emailError = err.message || String(err);
        console.error("Resend email fetch failed:", err);
        if (err.cause) {
          console.error("Resend email fetch cause:", err.cause);
        }
      }
    } else {
      emailError = 'RESEND_API_KEY environment variable is not defined.';
      console.warn(emailError);
    }

    // Return success if at least one submission succeeded
    const isSuccess = sheetsSuccess || emailSuccess;

    if (!isSuccess) {
      return NextResponse.json({
        success: false,
        errors: {
          sheets: sheetsError,
          email: emailError,
        }
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      sheetsSuccess,
      emailSuccess,
      errors: {
        sheets: sheetsError,
        email: emailError,
      }
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error.' },
      { status: 500 }
    );
  }
}
