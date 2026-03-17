import { NextResponse } from 'next/server';
import { sendScorecardEmail } from '@/lib/actions/email';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 1. In a real app, save `data` to a database (e.g. Prisma or Firebase)
    console.log('[LEAD CAPTURED]:', {
      name: data.firstName,
      email: data.email,
      role: data.role,
      organization: data.organization,
      score: data.totalScore,
      level: data.level
    });

    // 2. Trigger Email Forwarding
    try {
      const emailPayload = {
        firstName: data.firstName,
        email: data.email,
        role: data.role,
        organization: data.organization,
        totalScore: data.totalScore,
        level: data.level,
        dimensionScores: data.dimensionScores
      };

      await sendScorecardEmail(emailPayload);
    } catch (emailError) {
      console.error('[API_ROUTE]: Failed to trigger email forwarding:', emailError);
      // We don't want to fail the whole request if email fails, but we log it
    }

    return NextResponse.json({ success: true, message: 'Lead captured and results forwarded' });
  } catch (error) {
    console.error('Failed to process lead:', error);
    return NextResponse.json({ success: false, error: 'Failed to process lead' }, { status: 500 });
  }
}
