import { NextResponse } from 'next/server';

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

    // 2. Mock Email Automation Trigger
    console.log('[EMAIL AUTOMATION TRIGGERED] Sending sequences to:', data.email);
    
    console.log(`
      [EMAIL 1 - Sent Immediately]
      Subject: Your Leadership Scorecard Results
      To: ${data.email}
      Content: Thank you for completing the leadership diagnostic...
    `);
    
    console.log(`
      [EMAIL 2 - Queued 24h]
      Subject: The leadership blind spot most managers miss
      Content: Many leaders focus on strategy and results...
    `);

    console.log(`
      [EMAIL 3 - Queued 48h]
      Subject: How leaders build high trust teams
      Content: High performing teams rarely happen by accident...
    `);

    console.log(`
      [EMAIL 4 - Queued 72h]
      Subject: How leaders transform team performance
      Content: Many leaders who take this diagnostic discover one or two behavioral shifts...
    `);

    return NextResponse.json({ success: true, message: 'Lead captured and emails queued' });
  } catch (error) {
    console.error('Failed to process lead:', error);
    return NextResponse.json({ success: false, error: 'Failed to process lead' }, { status: 500 });
  }
}
