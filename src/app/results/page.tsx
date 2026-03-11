"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Shield, Zap, Users, Heart, ArrowRight, Download, Calendar, BookOpen, Code, School } from 'lucide-react';
import Link from 'next/link';

interface ResultData {
  firstName: string;
  email: string;
  role: string;
  organization: string;
  teamSize: string;
  totalScore: number;
  level: 'Emerging Leader' | 'Developing Leader' | 'Inclusive Leader' | 'Empowering Leader';
  dimensionScores: Record<string, number>;
}

interface ReportDetails {
  overallLeadershipLevel: string;
  overallLeadershipDescription: string;
  dimensionInsights: Record<string, string>;
  actionRecommendations: string;
  ctas: {
    primary: string;
    secondary: string[];
  };
}

export default function ResultsPage() {
  const router = useRouter();
  const [report, setReport] = useState<ReportDetails | null>(null);
  const [inputData, setInputData] = useState<ResultData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const data = sessionStorage.getItem('leadership_report_input');
    if (!data) {
      router.push('/');
      return;
    }

    try {
      const parsedData: ResultData = JSON.parse(data);
      setInputData(parsedData);

      // Generate report locally
      const generatedReport: ReportDetails = {
        overallLeadershipLevel: parsedData.level,
        overallLeadershipDescription: getLevelDescription(parsedData.level),
        dimensionInsights: {
          'Feedback Culture': 'Your ability to foster open dialogue shapes team psychological safety.',
          'Shared Accountability': 'Clear expectations drive ownership across your team.',
          'Adaptive Leadership': 'Flexibility in command allows your team to navigate ambiguity effectively.',
          'Human Connection': 'Building genuine relationships fosters deeper trust and commitment.',
          'Empowerment': 'Delegating authority builds confidence and operational scalability.',
        },
        actionRecommendations: getActionRecommendations(parsedData.level),
        ctas: {
          primary: "Book a Leadership Conversation with Obi",
          secondary: ["Join the Leadership Catalyst Programme", "Get  'Let Go Leadership'"],
        }
      };

      setReport(generatedReport);
    } catch (err) {
      console.error("Error generating report:", err);
      setError("Failed to generate your personalized report. Please try again.");
    }
  }, [router]);

  function getLevelDescription(level: string) {
    switch (level) {
      case 'Emerging Leader':
        return 'Your leadership intentions are positive, but several behaviors may unintentionally limit openness and accountability within your team.';
      case 'Developing Leader':
        return 'You demonstrate awareness of inclusive leadership practices, but some leadership habits may still create uneven team experiences.';
      case 'Inclusive Leader':
        return 'Your leadership style supports trust and collaboration. Strengthening a few behaviors could significantly increase team performance.';
      case 'Empowering Leader':
        return 'Your leadership behaviors strongly support accountability, openness and empowerment. Your next opportunity is to scale this leadership style across larger teams.';
      default:
        return 'Analyzing your leadership profile based on 5 core dimensions.';
    }
  }

  function getActionRecommendations(level: string) {
    if (level === 'Empowering Leader' || level === 'Inclusive Leader') {
      return 'Focus on scaling your leadership framework and expanding your coaching capabilities to grow other leaders within your organization.';
    }
    return 'Focus on creating systematic feedback loops and explicitly mapping accountability across team goals to improve operational alignment.';
  }

  if (error) {
    return (
      <>
        <div className="fixed top-0 left-0 right-0 h-16 bg-[#303868] flex items-center justify-center z-50">
          <img src="/logo.webp" alt="Obi James Logo" className="h-8 object-contain" />
        </div>
        <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-20 bg-gray-50">
          <div className="text-center space-y-4 max-w-md">
            <h2 className="text-2xl font-bold text-red-600">Something went wrong</h2>
            <p className="text-gray-500">{error}</p>
            <Button onClick={() => window.location.reload()} className="bg-[#303868] text-white hover:bg-[#202545]">Try Again</Button>
          </div>
        </div>
      </>
    );
  }

  if (!report || !inputData) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 pb-24 font-body">
        <div className="container mx-auto px-4 max-w-5xl space-y-8">
          <div className="text-center space-y-4">
            <Skeleton className="h-12 w-64 mx-auto bg-gray-200" />
            <Skeleton className="h-6 w-96 mx-auto bg-gray-200" />
          </div>
          <Card className="border border-gray-100  bg-white">
            <CardHeader>
              <Skeleton className="h-8 w-48 bg-gray-200" />
              <Skeleton className="h-4 w-full bg-gray-200" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-20 w-full bg-gray-200" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-24 w-full bg-gray-200" />
                <Skeleton className="h-24 w-full bg-gray-200" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

    );
  }

  const getDimensionIcon = (key: string) => {
    switch (key) {
      case 'Feedback Culture': return <MessageSquare className="w-5 h-5 text-[#303868]" />;
      case 'Shared Accountability': return <Shield className="w-5 h-5 text-[#303868]" />;
      case 'Adaptive Leadership': return <Zap className="w-5 h-5 text-[#303868]" />;
      case 'Human Connection': return <Users className="w-5 h-5 text-[#303868]" />;
      case 'Empowerment': return <Heart className="w-5 h-5 text-[#303868]" />;
      default: return <Zap className="w-5 h-5 text-[#303868]" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-body animate-in fade-in duration-500">
      <div className="w-full bg-[#303868] flex items-center justify-center z-50">
        <img src="/logo.webp" alt="Obi James Logo" className="h-28 object-contain" />
      </div>
      <div className="container mx-auto px-4 max-w-4xl space-y-8">

        {/* Header Summary */}
        <div className="text-center space-y-4 pt-8">

          <h1 className="text-3xl md:text-4xl font-extrabold text-[#303868] tracking-tight">
            Hi {inputData.firstName}, Here is Your Compass
          </h1>
          <p className="text-gray-500 text-sm md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Your results reveal important insights about how your leadership style may be experienced by your team.
          </p>
        </div>

        {/* Overall Score Section */}
        <Card className="border border-gray-100  overflow-hidden bg-white mt-12">
          <CardHeader className="text-center pt-10 pb-8">
            <div className="flex justify-center mb-8">
              <div className="relative w-48 h-48 flex items-center justify-center ">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="84"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="84"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={527}
                    strokeDashoffset={527 - (527 * inputData.totalScore) / 100}
                    strokeLinecap="round"
                    className="text-[#00B4D8] transition-all duration-1500 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-extrabold text-[#303868] tracking-tighter">{inputData.totalScore}%</span>

                </div>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-[#303868] mb-4 tracking-tight">{report.overallLeadershipLevel}</CardTitle>
            <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed border-t border-gray-100 pt-6 italic font-light">
              "{report.overallLeadershipDescription}"
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Breakdown & Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Dimension Breakdown */}
          <Card className="border border-gray-100  bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-[#303868]">Score Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(inputData.dimensionScores).map(([key, score]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between items-end text-sm font-medium">
                    <div className="flex items-center gap-2">
                      {/* {getDimensionIcon(key)} */}
                      <span className="text-gray-700 font-semibold">{key}</span>
                    </div>
                    <span className="text-sm font-bold text-[#303868]">{score}/100</span>
                  </div>
                  <Progress value={score} className="h-1.5 bg-gray-100" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Key Insights */}
          <Card className="border border-gray-100  bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-[#303868]">Key Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(report.dimensionInsights).slice(0, 3).map(([key, insight]) => (
                <div key={key} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex items-start gap-3">

                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-[#303868]">{key}</h4>
                      <p className="text-sm text-gray-600 font-light ">{insight}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Action Recommendations */}
        <Card className="border border-[#00B4D8]/20 bg-[#00B4D8]/5  rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-[#303868]">
              Your Recommended Focus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed font-medium">
              {report.actionRecommendations}
            </p>
          </CardContent>
        </Card>

        {/* CTAs */}
        <div className="pt-12 text-center space-y-8 border-t border-gray-200">
          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-[#303868] tracking-tight">Your Next Steps</h3>
            <p className="text-gray-500 text-sm">Select the path that accelerates your leadership growth.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">

            <Card className="border-2 border-[#303868]  bg-white transition-all  rounded-2xl overflow-hidden group">
              <div className="bg-[#303868] py-2 px-6">
                <p className="text-[10px] uppercase font-bold tracking-widest text-white flex items-center justify-center gap-2">
                  <Calendar className="w-3 h-3" /> Recommended
                </p>
              </div>
              <CardContent className="pt-6 space-y-3 pb-0">
                <p className="font-bold leading-tight text-lg text-[#303868]">{report.ctas.primary}</p>
                <p className="text-sm text-gray-500 font-light leading-relaxed">A high-impact 30-minute conversation to explore your specific scorecard results.</p>
              </CardContent>
              <CardFooter className="pt-6 pb-6">
                <Button className="w-full font-bold h-12 bg-[#303868] hover:bg-[#202545] text-white">
                  Book Conversation
                </Button>
              </CardFooter>
            </Card>

            <Card className="border border-gray-200  bg-white transition-all  rounded-2xl">
              <CardContent className="pt-6 space-y-3 pb-0">
                <p className="text-xs uppercase font-bold tracking-widest text-[#00B4D8] flex items-center gap-2">
                  <School className="w-3 h-3" /> Programme
                </p>
                <p className="font-bold leading-tight text-lg text-[#303868]">{report.ctas.secondary[0]}</p>
                <p className="text-sm text-gray-500 font-light leading-relaxed">Join a cohort of senior leaders in this transformative 12-week journey.</p>
              </CardContent>
              <CardFooter className="pt-6 pb-6">
                <Button variant="outline" className="w-full font-bold h-12 border-gray-200 text-[#303868] hover:bg-gray-50">
                  Learn More
                </Button>
              </CardFooter>
            </Card>

            <Card className="border border-gray-200  bg-white transition-all  rounded-2xl">
              <CardContent className="pt-6 space-y-3 pb-0">
                <p className="text-xs uppercase font-bold tracking-widest text-[#00B4D8] flex items-center gap-2">
                  <Download className="w-3 h-3" /> Resource
                </p>
                <p className="font-bold leading-tight text-lg text-[#303868]">{report.ctas.secondary[1]}</p>
                <p className="text-sm text-gray-500 font-light leading-relaxed">Read the core framework behind Let Go Leadership and empower your team.</p>
              </CardContent>
              <CardFooter className="pt-6 pb-6">
                <Button variant="outline" className="w-full font-bold h-12 border-gray-200 text-[#303868] hover:bg-gray-50">
                  <Link href="https://obijames.com/the-book/" target="_blank">
                    Get the Book
                  </Link>
                </Button>
              </CardFooter>
            </Card>

          </div>
        </div>
      </div>
      <div className="w-full py-2 mt-20 bg-[#303868] flex items-center justify-between px-32 z-50">
        <img src="/footer_logo.webp" alt="Obi James Logo" className="h-36 object-contain" />

        <p>© 2023 by Obi James Consultancy Limited. All rights reserved.</p>
      </div>
    </div>
  );
}
