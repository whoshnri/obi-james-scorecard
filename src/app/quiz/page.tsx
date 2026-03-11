"use client";

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { questions as LEADERSHIP_QUESTIONS, Dimension } from '@/data/questions';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ChevronRight, ChevronLeft, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { calculateScore } from '@/data/questions';
import Footer from '@/components/ui/Footer';
import Header from '@/components/ui/Header';

type Step = 'quiz' | 'lead-capture';

function QuizContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const initialQ = searchParams.get('q');
  const initialA = searchParams.get('a');
  const initialStep = searchParams.get('step');

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const q = initialQ ? parseInt(initialQ, 10) : 0;
    return isNaN(q) ? 0 : Math.min(Math.max(0, q), LEADERSHIP_QUESTIONS.length - 1);
  });
  const [answers, setAnswers] = useState<Record<number, number>>(() => {
    if (initialA) {
      try {
        return JSON.parse(initialA);
      } catch (e) {
        return {};
      }
    }
    return {};
  });
  const [step, setStep] = useState<Step>(() => {
    return initialStep === 'lead-capture' ? 'lead-capture' : 'quiz';
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const updateUrl = (newIndex: number, newAnswers: Record<number, number>, newStep: Step) => {
    const params = new URLSearchParams(window.location.search);
    params.set('q', newIndex.toString());
    params.set('a', JSON.stringify(newAnswers));
    if (newStep === 'lead-capture') {
      params.set('step', 'lead-capture');
    } else {
      params.delete('step');
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    role: '',
    organization: '',
    teamSize: '',
    industry: '',
    biggestLeadershipChallenge: '',
  });

  const progress = ((currentQuestionIndex) / LEADERSHIP_QUESTIONS.length) * 100;
  const currentQuestion = LEADERSHIP_QUESTIONS[currentQuestionIndex];

  const handleAnswer = (value: number) => {
    setDirection('next');
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);
    updateUrl(currentQuestionIndex, newAnswers, step);

    // Smooth delay before transition to allow user to see their selection
    setTimeout(() => {
      let nextIndex = currentQuestionIndex;
      let nextStep = step;
      if (currentQuestionIndex < LEADERSHIP_QUESTIONS.length - 1) {
        nextIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIndex);
      } else {
        nextStep = 'lead-capture';
        setStep(nextStep);
      }
      updateUrl(nextIndex, newAnswers, nextStep);
    }, 500);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setDirection('prev');
      const nextIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(nextIndex);
      updateUrl(nextIndex, answers, step);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Instead of doing arbitrary math, use the central calculateScore function
    const resultsData = {
      ...formData,
      answers,
      ...calculateScore(answers)
    };

    // Store in session storage to pass to results page
    sessionStorage.setItem('leadership_report_input', JSON.stringify(resultsData));

    // Simulate an API call to save lead data
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resultsData)
      });
    } catch (err) {
      console.error('Failed to submit lead data', err);
    }

    setTimeout(() => {
      router.push('/results');
    }, 1200);
  };

  const getEncouragement = () => {
    if (currentQuestionIndex === 10) return "Great progress. These insights are shaping your profile.";
    if (currentQuestionIndex === 20) return "Almost there. The most honest answers yield the best results.";
    return null;
  };

  const encouragement = getEncouragement();

  if (step === 'quiz') {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100 overflow-x-hidden font-body">
        <Header />
        <div className="flex-grow w-full max-w-xl mx-auto py-10 px-4 flex flex-col justify-center">
          <div className="w-full mb-10 space-y-4">
            <div className="flex justify-between items-end text-xs font-semibold tracking-tight text-gray-500 uppercase">
              <span className="flex items-center gap-2">
                Progress
              </span>
              <span>Question {currentQuestionIndex + 1} <span className="text-[#303868]/40">/</span> {LEADERSHIP_QUESTIONS.length}</span>
            </div>
            <div className="relative pt-1">
              <Progress value={progress} className="h-1.5 transition-all duration-700 ease-in-out bg-gray-200" />
            </div>
          </div>

          <Card className="border-none ring-1 ring-black/5 overflow-hidden bg-white text-[#303868]">
            {/* The key on this div ensures animations trigger on every question change */}
            <div
              key={currentQuestionIndex}
              className={cn(
                "p-6 md:p-10 transition-all duration-500",
                direction === 'next'
                  ? "animate-in fade-in slide-in-from-right-8 duration-500"
                  : "animate-in fade-in slide-in-from-left-8 duration-500"
              )}
            >
              <CardHeader className="p-0 mb-8">
                {encouragement && (
                  <div className="mb-8 p-4 bg-[#303868]/5 text-[#303868] text-center rounded-xl border border-[#303868]/10 animate-in zoom-in-95 duration-700">
                    <p className="text-sm font-medium tracking-tight">"{encouragement}"</p>
                  </div>
                )}
                <CardTitle className="text-xl md:text-2xl font-headline font-extrabold text-[#303868] leading-[1.15] tracking-tight">
                  {currentQuestion.text}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0 space-y-3">
                {[
                  { label: 'Strongly Disagree', value: 1 },
                  { label: 'Disagree', value: 2 },
                  { label: 'Neutral', value: 3 },
                  { label: 'Agree', value: 4 },
                  { label: 'Strongly Agree', value: 5 },
                ].map((option, idx) => (
                  <Button
                    key={option.value}
                    variant="outline"
                    className={cn(
                      "w-full p-6 text-sm justify-start px-8 rounded-xl transition-all duration-200 border-2",
                      "active:scale-[0.98]",
                      "animate-in slide-in-from-bottom-4",
                      answers[currentQuestion.id] === option.value
                        ? 'border-[#303868] shadow-md bg-[#303868] text-white'
                        : 'border-[#303868]/60 text-[#303868] hover:border-[#303868] hover:bg-gray-50'
                    )}
                    style={{ animationDelay: `${idx * 50}ms` }}
                    onClick={() => handleAnswer(option.value)}
                  >
                    <span className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center mr-6 text-[10px] font-black tracking-tighter shrink-0 transition-colors",
                      answers[currentQuestion.id] === option.value
                        ? 'border-white bg-[#303868] text-white'
                        : 'border-gray-500 text-gray-500'
                    )}>
                      {option.value}
                    </span>
                    <span className="font-bold tracking-tight">{option.label}</span>
                  </Button>
                ))}
              </CardContent>
            </div>

            <CardFooter className="flex justify-between items-center border-t border-gray-100 p-4 md:p-6 bg-gray-50/80 text-gray-500">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentQuestionIndex === 0}
                className="gap-2 font-bold tracking-tight hover:text-[#303868] text-gray-500 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </Button>
              <div className="text-xs font-bold text-gray-400 ">
                Auto-advancing on selection
              </div>
            </CardFooter>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 fade-in duration-400 font-body">
      <Header />
      <div className="flex-grow w-full max-w-xl mx-auto py-12 px-4 flex flex-col justify-center">
        <Card className="border-none ring-1 ring-black/5 overflow-hidden bg-white w-full">
          <CardHeader className="text-center space-y-3 p-6 md:p-10">
            <CardTitle className="text-3xl md:text-3xl font-headline font-black text-[#303868] ">
              Scorecard Complete!
            </CardTitle>
            <p className="text-gray-500 text-sm font-medium leading-relaxed tracking-tight">
              Submit your details to receive your <span className="text-[#303868] font-bold underline decoration-[#00B4D8]/50 underline-offset-4">Deep Insights Report</span>.
            </p>
          </CardHeader>
          <CardContent className="px-6 md:px-10 pb-6 md:pb-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="font-bold text-xs uppercase  text-gray-500">First Name</Label>
                  <Input
                    id="firstName"
                    required
                    placeholder="Sarah"
                    className="h-12 border-2 border-gray-200 focus-visible:ring-[#303868]/20 bg-gray-50 font-medium text-gray-900 placeholder:text-gray-400"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-bold text-xs uppercase  text-gray-500">Work Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="sarah@company.com"
                    className="h-12 border-2 border-gray-200 focus-visible:ring-[#303868]/20 bg-gray-50 font-medium text-gray-900 placeholder:text-gray-400"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="font-bold text-xs uppercase  text-gray-500">Your Professional Role</Label>
                <Input
                  id="role"
                  required
                  placeholder="Senior Product Manager"
                  className="h-12 border-2 border-gray-200 focus-visible:ring-[#303868]/20 bg-gray-50 font-medium text-gray-900 placeholder:text-gray-400"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="organization" className="font-bold text-xs uppercase  text-gray-500">Organization</Label>
                  <Input
                    id="organization"
                    required
                    placeholder="Microsoft"
                    className="h-12 border-2 border-gray-200 focus-visible:ring-[#303868]/20 bg-gray-50 font-medium text-gray-900 placeholder:text-gray-400"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teamSize" className="font-bold text-xs uppercase  text-gray-500">Team Size</Label>
                  <Select
                    required
                    onValueChange={(v) => setFormData({ ...formData, teamSize: v })}
                  >
                    <SelectTrigger className="h-12 border-2 border-gray-200 focus:ring-[#303868]/20 bg-gray-50 font-medium text-gray-900">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-gray-900 border-gray-200">
                      <SelectItem value="1-5">1-5 people</SelectItem>
                      <SelectItem value="6-15">6-15 people</SelectItem>
                      <SelectItem value="16-50">16-50 people</SelectItem>
                      <SelectItem value="51+">51+ people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry" className="font-bold text-xs uppercase  text-gray-500">Industry (Optional)</Label>
                <Input
                  id="industry"
                  placeholder="Technology"
                  className="h-12 border-2 border-gray-200 focus-visible:ring-[#303868]/20 bg-gray-50 font-medium text-gray-900 placeholder:text-gray-400"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="challenge" className="font-bold text-xs uppercase  text-gray-500">Biggest Leadership Challenge (Optional)</Label>
                <Textarea
                  id="challenge"
                  placeholder="What is your current top hurdle?"
                  className="resize-none border-2 border-gray-200 focus-visible:ring-[#303868]/20 bg-gray-50 font-medium min-h-[100px] text-gray-900 placeholder:text-gray-400"
                  value={formData.biggestLeadershipChallenge}
                  onChange={(e) => setFormData({ ...formData, biggestLeadershipChallenge: e.target.value })}
                />
              </div>

              <Button
                type="submit"
                className="w-full h-16 text-sm font-bold rounded-sm transition-all active:scale-[0.99] group bg-[#303868] hover:bg-[#202545] text-white border-none"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-3">
                    <span className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing Assessment...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Get My Personalized Report
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center text-xs text-gray-400 px-8 py-4 bg-gray-50  border-t border-gray-100">
            Your privacy is respected. Data is used solely for the Leadership Compass diagnostic.
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-body text-[#303868] font-bold">
        Loading...
      </div>
    }>
      <QuizContent />
    </Suspense>
  );
}
