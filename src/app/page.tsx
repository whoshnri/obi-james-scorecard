'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, MessageSquare, Users, Zap, Heart, Shield, ArrowRight, CheckSquare, Headphones, LeafyGreen, HandHelping } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

export default function Home() {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const challenges = [
    { title: 'Silence in meetings', icon: MessageSquare },
    { title: 'Low psychological safety', icon: Shield },
    { title: 'Lack of ownership', icon: Users },
    { title: 'Hidden disengagement', icon: Heart },
    { title: 'Unclear accountability', icon: Zap },
  ];

  return (
    <>
      {/* ── HERO ── */}
      <div className='bg-gray-100 min-h-screen w-full p-4'>
        <div className='bg-[#303868] min-h-[calc(100vh-2rem)] relative w-full rounded-3xl overflow-hidden flex flex-col lg:flex-row'>

          {/* Left: Hero Content */}
          <div className='flex flex-col justify-center px-8 md:px-16 py-16 lg:py-0 w-full lg:w-[62%] z-10'>
            <div className="mb-12">
              <img src="/logo.webp" alt="Obi James" className="h-24 w-auto object-contain" />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground mb-6 leading-tight tracking-tight">
              How Inclusive Is Your <br className="hidden sm:block" />
              <span className="text-gradient">Leadership</span> Really?
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed font-light max-w-xl">
              Leadership today requires more than authority and expertise. It requires{' '}
              <span className="font-semibold text-foreground">trust, accountability, openness,</span> and{' '}
              <span className="font-semibold text-foreground">empowerment.</span>
            </p>

            <Link href="/quiz">
              <button className="px-6 text-sm py-4 flex items-center rounded-sm transition-all bg-primary hover:bg-primary/90 text-white font-medium group w-fit">
                Take The Leadership Scorecard
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-10 text-sm font-medium text-foreground/80">
              {['30 leadership questions', '5 leadership dimensions', 'Instant personalized report'].map((text, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-secondary shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          <div className='md:bottom-2 md:overflow-hidden w-full h-80 md:absolute md:right-2 md:h-[80%] md:w-[38%] md:rounded-3xl bg-black'>
            <img src="/hero.png" alt="Leadership hero" className="aspect-square object-top opacity-90" />
          </div>

        </div>
      </div>

      {/* ── CHALLENGE SECTION ── */}
      <div className='bg-gray-100 w-full px-4 pb-4'>
        <div className='bg-[#0F172A] relative w-full rounded-3xl overflow-hidden px-8 md:px-16  py-20'>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className=" mx-auto"
          >
            {/* Header */}
            <motion.p variants={fadeInUp} className="text-xs uppercase tracking-widest text-secondary font-semibold mb-4">
              The Problem
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
              The Leadership Challenge
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-400 font-light mb-14 max-w-2xl leading-relaxed">
              Many leaders believe they lead inclusive, empowered teams. But below the surface, teams often experience:
            </motion.p>

            {/* Challenge Cards - List */}
            <motion.div variants={staggerContainer} className="flex flex-col gap-4 mb-14 max-w-2xl">
              {challenges.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="text-white/90 flex items-center gap-4 font-medium text-lg"
                >
                  <CheckSquare />
                  <span className="">{item.title}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Callout */}
            <motion.div variants={fadeInUp} className=" border-secondary py-2">
              <p className="text-sm md:text-lg text-slate-300 font-light leading-relaxed">
                These problems are rarely caused by intention. They are usually caused by{' '}
                <strong className="font-semibold text-white">leadership habits leaders cannot see themselves.</strong>{' '}
                This scorecard helps you identify those hidden patterns.
              </p>
            </motion.div>

          <div className='md:absolute top-60 hidden md:block right-20'>
            <img src={"/challenges.webp"}/>
          </div>

          </motion.div>
        </div>
      </div>
      {/* ── DIMENSIONS SECTION ── */}
      <div className='bg-gray-100 w-full px-4 pb-4'>
        <div className='bg-white relative w-full rounded-3xl overflow-hidden px-8 md:px-16 py-20 border border-gray-200'>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-16">
            
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-extrabold text-[#303868] tracking-tight mb-6">
                Five Leadership Dimensions
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-[#303868] font-light max-w-2xl mx-auto leading-relaxed">
                We measure the key pillars of high-performing, inclusive leadership to help you uncover your true impact.
              </motion.p>
            </div>

            {/* Dimension Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              <DimensionCard
                icon={<Headphones className="w-8 h-8 text-white" />}
                title="Feedback Culture"
                subtitle="Do people feel safe speaking honestly?"
                description="Strong leaders actively invite feedback and create environments where people can challenge ideas without fear."
                lowScore="Low scores often indicate silence, hesitation, or unspoken disagreement within teams."
              />
              <DimensionCard
                icon={<Shield className="w-8 h-8 text-white" />}
                title="Shared Accountability"
                subtitle="Are expectations clear and owned?"
                description="Effective leaders ensure accountability is shared and visible."
                lowScore="Low scores often indicate confusion about responsibilities or uneven ownership."
              />
              <DimensionCard
                icon={<LeafyGreen className="w-8 h-8 text-white" />}
                title="Adaptive Leadership"
                subtitle="Do you adjust your leadership style depending on the person or situation?"
                description="Strong leaders adapt their approach based on context, personalities and challenges."
                lowScore="Low scores may indicate rigid leadership behaviours."
              />
              <DimensionCard
                icon={< Heart className="w-8 h-8 text-white" />}
                title="Human Connection"
                subtitle="Do you genuinely understand the people you lead?"
                description="Effective leaders build relationships beyond task management."
                lowScore="Low scores often reflect distance between leaders and teams."
              />
              <DimensionCard
                icon={<HandHelping className="w-8 h-8 text-white" />}
                title="Empowerment"
                subtitle="Do people feel ownership or dependency?"
                description="Empowering leaders trust people with responsibility and decision making."
                lowScore="Low scores often show over-control or micromanagement."
              />
            </div>

            <motion.div variants={fadeInUp} className="text-center mt-12">
              <Link href="/quiz">
                <Button className="px-6 py-4 h-auto text-sm md:text-base rounded-sm transition-all bg-[#303868] hover:bg-[#202545] text-white uppercase font-bold">
                  Take The Leadership Scorecard
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

function DimensionCard({ icon, title, subtitle, description, lowScore }: { icon: React.ReactNode, title: string, subtitle: string, description: string, lowScore: string }) {
  return (
    <Card className="bg-gray-50 border border-[#303868]/10  transition-all duration-300 rounded-2xl overflow-hidden group">
      <CardContent className="p-8 flex flex-col h-full">
        {/* <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-6  transition-transform duration-300">
          {icon}
        </div> */}
        <h3 className="text-2xl font-bold mb-2 text-[#303868] tracking-tight">{title}</h3>
        <p className="text-sm font-semibold text-primary mb-4 pb-4 border-b border-[#303868]/10">{subtitle}</p>
        
        <div className="space-y-4 flex-grow">
          <div>
            <p className="text-[#303868]/90 font-medium text-sm leading-relaxed">{description}</p>
          </div>
          <div className="bg-[#303868]/5 p-3 rounded-lg ">
            <p className="text-[#303868]/70 font-light text-sm italic">{lowScore}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}