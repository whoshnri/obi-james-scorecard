
export interface EmailPayload {
  firstName: string;
  email: string;
  role: string;
  organization: string;
  totalScore: number;
  level: string;
  dimensionScores: Record<string, number>;
}

const public_url = process.env.NEXT_PUBLIC_URL;

export function generateScorecardEmailHtml(data: EmailPayload): string {
  const { firstName, totalScore, level, dimensionScores } = data;

  const getLevelDescription = (l: string) => {
    switch (l) {
      case 'Emerging Leader': return 'Your leadership intentions are positive, but several behaviors may unintentionally limit openness and accountability within your team.';
      case 'Developing Leader': return 'You demonstrate awareness of inclusive leadership practices, but some leadership habits may still create uneven team experiences.';
      case 'Inclusive Leader': return 'Your leadership style supports trust and collaboration. Strengthening a few behaviors could significantly increase team performance.';
      case 'Empowering Leader': return 'Your leadership behaviors strongly support accountability, openness and empowerment. Your next opportunity is to scale this leadership style across larger teams.';
      default: return '';
    }
  };

  const getActionRecommendations = (l: string) => {
    if (l === 'Empowering Leader' || l === 'Inclusive Leader') {
      return 'Focus on scaling your leadership framework and expanding your coaching capabilities to grow other leaders within your organization.';
    }
    return 'Focus on creating systematic feedback loops and explicitly mapping accountability across team goals to improve operational alignment.';
  };

  const dimensionRows = Object.entries(dimensionScores)
    .map(([name, score]) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #edf2f7;">
          <div style="font-weight: 700; color: #303868; font-size: 14px; margin-bottom: 4px;">${name}</div>
          <div style="background-color: #f1f5f9; height: 6px; border-radius: 3px; overflow: hidden;">
            <div style="background-color: #00B4D8; width: ${score}%; height: 100%; border-radius: 3px;"></div>
          </div>
        </td>
        <td style="padding: 12px 0 12px 20px; text-align: right; font-weight: 800; color: #303868; font-size: 14px; border-bottom: 1px solid #edf2f7; vertical-align: bottom;">
          ${score}/100
        </td>
      </tr>
    `).join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Leadership Compass Results</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    body { font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
    .container { max-width: 650px; margin: 20px auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
    .header { background-color: #303868; padding: 40px 20px; text-align: center; }
    .content { padding: 40px; }
    .score-circle { width: 140px; height: 140px; margin: 0 auto 24px; border-radius: 50%; border: 10px solid #00B4D8; background-color: #ffffff; display: block; text-align: center; }
    .score-value { font-size: 42px; font-weight: 800; color: #303868; letter-spacing: -1px; line-height: 140px; margin: 0; }
    .cta-card { background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; margin-bottom: 20px; text-align: left; }
    .cta-card.primary { border: 2px solid #303868; }
    .btn { display: inline-block; padding: 14px 28px; background-color: #303868; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px; text-align: center; }
    .btn-outline { display: inline-block; padding: 12px 24px; background-color: transparent; color: #303868 !important; text-decoration: none; border: 1px solid #e2e8f0; border-radius: 8px; font-weight: 700; font-size: 14px; text-align: center; }
    @media only screen and (max-width: 600px) {
      .container { margin: 0; border-radius: 0; }
      .content { padding: 24px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://obi-james-scorecard.vercel.app/logo.webp" alt="Obi James" style="height: 50px; width: auto; margin-bottom: 10px;">
    </div>
    
    <div class="content">
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="margin: 0 0 10px; color: #303868; font-size: 28px; font-weight: 800; letter-spacing: -1px; font-family: 'Inter', Arial, sans-serif;">Hi ${firstName}, Here is Your Compass</h1>
        <p style="color: #64748b; font-size: 16px; font-weight: 300; line-height: 1.6; max-width: 450px; margin: 0 auto; font-family: 'Inter', Arial, sans-serif;">Your results reveal important insights about how your leadership style may be experienced by your team.</p>
      </div>

      <div style="text-align: center; margin-bottom: 48px;">
        <div class="score-circle">
          <p class="score-value" style="font-family: 'Inter', Arial, sans-serif;">${totalScore}%</p>
        </div>
        <h2 style="margin: 0 0 8px; color: #303868; font-size: 24px; font-weight: 800; font-family: 'Inter', Arial, sans-serif;">${level}</h2>
        <div style="font-style: italic; color: #475569; font-size: 15px; font-weight: 300; line-height: 1.6; border-top: 1px solid #f1f5f9; pt: 16px; max-width: 480px; margin: 16px auto 0; padding-top: 16px; font-family: 'Inter', Arial, sans-serif;">
          "${getLevelDescription(level)}"
        </div>
      </div>

      <div style="margin-bottom: 48px;">
        <h3 style="color: #303868; font-size: 18px; font-weight: 800; margin-bottom: 20px; font-family: 'Inter', Arial, sans-serif;">Score Breakdown</h3>
        <table style="width: 100%; border-collapse: collapse;">
          ${dimensionRows}
        </table>
      </div>

      <div style="background-color: rgba(0, 180, 216, 0.05); padding: 30px; border-radius: 20px; border: 1px solid rgba(0, 180, 216, 0.2); margin-bottom: 50px;">
        <h3 style="margin: 0 0 12px; color: #303868; font-size: 18px; font-weight: 800; font-family: 'Inter', Arial, sans-serif;">Your Recommended Focus</h3>
        <p style="margin: 0; color: #334155; font-size: 15px; line-height: 1.6; font-weight: 500; font-family: 'Inter', Arial, sans-serif;">
          ${getActionRecommendations(level)}
        </p>
      </div>

      <div style="text-align: center; border-top: 1px solid #f1f5f9; padding-top: 40px;">
        <h3 style="color: #303868; font-size: 22px; font-weight: 800; margin-bottom: 8px; font-family: 'Inter', Arial, sans-serif;">Your Next Steps</h3>
        <p style="color: #64748b; font-size: 14px; margin-bottom: 30px; font-family: 'Inter', Arial, sans-serif;">Select the path that accelerates your leadership growth.</p>

        <!-- CTA 1: Primary -->
        <div class="cta-card primary">
          <div style="background-color: #303868; color: #ffffff; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; padding: 4px 12px; border-radius: 4px; display: inline-block; margin-bottom: 16px; font-family: 'Inter', Arial, sans-serif;">Recommended</div>
          <h4 style="margin: 0 0 8px; color: #303868; font-size: 18px; font-weight: 700; font-family: 'Inter', Arial, sans-serif;">Book a Leadership Conversation with Obi</h4>
          <p style="margin: 0 0 20px; color: #64748b; font-size: 14px; line-height: 1.5; font-family: 'Inter', Arial, sans-serif;">A high-impact 30-minute conversation to explore your specific scorecard results.</p>
          <a href="https://calendly.com/obijames" class="btn" style="width: 100%; box-sizing: border-box; font-family: 'Inter', Arial, sans-serif;">Book Conversation</a>
        </div>

        <!-- CTA 2: Programme -->
        <div class="cta-card">
          <div style="color: #00B4D8; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; font-family: 'Inter', Arial, sans-serif;">Programme</div>
          <h4 style="margin: 0 0 8px; color: #303868; font-size: 18px; font-weight: 700; font-family: 'Inter', Arial, sans-serif;">Join the Leadership Catalyst Programme</h4>
          <p style="margin: 0 0 20px; color: #64748b; font-size: 14px; line-height: 1.5; font-family: 'Inter', Arial, sans-serif;">Join a cohort of senior leaders in this transformative 12-week journey.</p>
          <a href="https://obijames.com" class="btn-outline" style="width: 100%; box-sizing: border-box; font-family: 'Inter', Arial, sans-serif;">Learn More</a>
        </div>

        <!-- CTA 3: Resource -->
        <div class="cta-card">
          <div style="color: #00B4D8; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; font-family: 'Inter', Arial, sans-serif;">Resource</div>
          <h4 style="margin: 0 0 8px; color: #303868; font-size: 18px; font-weight: 700; font-family: 'Inter', Arial, sans-serif;">Get 'Let Go Leadership'</h4>
          <p style="margin: 0 0 20px; color: #64748b; font-size: 14px; line-height: 1.5; font-family: 'Inter', Arial, sans-serif;">Read the core framework behind Let Go Leadership and empower your team.</p>
          <a href="https://obijames.com/the-book/" class="btn-outline" style="width: 100%; box-sizing: border-box; font-family: 'Inter', Arial, sans-serif;">Get the Book</a>
        </div>
      </div>
    </div>
    
    <div style="padding: 40px; text-align: center; font-size: 12px; color: #94a3b8; background-color: #f8fafc; border-top: 1px solid #f1f5f9; font-family: 'Inter', Arial, sans-serif;">
      <p style="margin: 0 0 10px;">&copy; 2024 Obi James Ltd. All rights reserved.</p>
      <p style="margin: 0;">Leadership Advisory & Development</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

export async function sendScorecardEmail(data: EmailPayload) {
  const APPSCRIPT_URL = process.env.APPSCRIPT_URL;

  if (!APPSCRIPT_URL) {
    console.warn('[EMAIL_ACTION]: APPSCRIPT_URL is not defined in environment variables.');
    return { success: false, error: 'Configuration error' };
  }

  const htmlBody = generateScorecardEmailHtml(data);
  const payload = {
    emailTo: data.email,
    subject: `Your Leadership Scorecard Results - ${data.firstName}`,
    htmlBody: htmlBody
  };

  try {
    const response = await fetch(APPSCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error('[EMAIL_ACTION]: Failed to parse Apps Script response as JSON.');
      console.error('[EMAIL_ACTION]: Response status:', response.status);
      console.error('[EMAIL_ACTION]: Raw response start:', responseText.substring(0, 200));
      return { 
        success: false, 
        error: `Invalid response from Apps Script (Status: ${response.status}). Check if the script is properly deployed as a web app.` 
      };
    }

    if (result && result.success) {
      console.log(`[EMAIL_ACTION]: Email successfully forwarded to ${data.email}`);
      return { success: true };
    } else {
      const errorMsg = result?.message || result?.error || 'Unknown error';
      console.error('[EMAIL_ACTION]: Apps Script returned an error:', errorMsg);
      return { success: false, error: errorMsg };
    }
  } catch (error) {
    console.error('[EMAIL_ACTION]: Failed to send request to Apps Script:', error);
    return { success: false, error: 'Network error or invalid response' };
  }
}
