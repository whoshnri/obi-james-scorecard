export type Dimension = 
  | 'Feedback Culture'
  | 'Shared Accountability'
  | 'Adaptive Leadership'
  | 'Human Connection'
  | 'Empowerment';

export interface Question {
  id: number;
  dimension: Dimension;
  text: string;
}

export const options = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' }
];

export const questions: Question[] = [
  // 1. Feedback Culture (6 questions)
  { id: 1, dimension: 'Feedback Culture', text: 'My team members consistently share dissenting opinions during meetings without hesitation.' },
  { id: 2, dimension: 'Feedback Culture', text: 'I proactively seek out constructive criticism from those I lead, rather than waiting for formal reviews.' },
  { id: 3, dimension: 'Feedback Culture', text: 'When a mistake is made, the immediate focus of the team is on learning rather than finding someone to blame.' },
  { id: 4, dimension: 'Feedback Culture', text: 'I am explicitly aware of my own leadership blind spots because my team feels safe pointing them out to me.' },
  { id: 5, dimension: 'Feedback Culture', text: 'Team members freely challenge my ideas and proposals, and I handle these moments with open curiosity.' },
  { id: 6, dimension: 'Feedback Culture', text: 'I reward and validate individuals who speak up against the consensus.' },

  // 2. Shared Accountability (6 questions)
  { id: 7, dimension: 'Shared Accountability', text: 'Each team member understands exactly how their specific goals connect to our broader organisational objectives.' },
  { id: 8, dimension: 'Shared Accountability', text: 'When a project fails or stalls, the team collectively takes responsibility rather than looking at individual fault.' },
  { id: 9, dimension: 'Shared Accountability', text: 'Expectations for quality and deadlines are clearly understood before any work begins.' },
  { id: 10, dimension: 'Shared Accountability', text: 'Team members hold each other accountable for delivering results, requiring minimal intervention from me.' },
  { id: 11, dimension: 'Shared Accountability', text: 'I ensure that ownership of a task remains with the person doing it, even when unexpected challenges arise.' },
  { id: 12, dimension: 'Shared Accountability', text: 'We regularly review our successes and failures as a group to improve our collective processes.' },

  // 3. Adaptive Leadership (6 questions)
  { id: 13, dimension: 'Adaptive Leadership', text: 'I adjust my communication style to suit the varying preferences and needs of individual team members.' },
  { id: 14, dimension: 'Adaptive Leadership', text: 'When faced with sudden changes or crises, I quickly pivot my approach rather than rigidly sticking to the plan.' },
  { id: 15, dimension: 'Adaptive Leadership', text: 'I provide different levels of support and autonomy depending on a team member’s current skill and confidence level.' },
  { id: 16, dimension: 'Adaptive Leadership', text: 'I am comfortable letting go of traditional methods if a team member suggests an unconventional but viable approach.' },
  { id: 17, dimension: 'Adaptive Leadership', text: 'During times of high ambiguity, I balance providing clear direction with making space for collaborative problem-solving.' },
  { id: 18, dimension: 'Adaptive Leadership', text: 'I regularly reassess and update my leadership tactics based on the evolving context of our organisation.' },

  // 4. Human Connection (6 questions)
  { id: 19, dimension: 'Human Connection', text: 'I dedicate an appropriate amount of time in 1-on-1s to discuss well-being and personal development, not just tasks.' },
  { id: 20, dimension: 'Human Connection', text: 'I am aware of the personal challenges and motivations that drive each member of my team.' },
  { id: 21, dimension: 'Human Connection', text: 'My team members would say that I care about them as people first, and employees second.' },
  { id: 22, dimension: 'Human Connection', text: 'I actively work to ensure every team member feels a sense of true belonging within the group.' },
  { id: 23, dimension: 'Human Connection', text: 'I model vulnerability by appropriately sharing my own challenges and uncertainties with the team.' },
  { id: 24, dimension: 'Human Connection', text: 'I consistently recognise and celebrate both the professional milestones and personal wins of my team members.' },

  // 5. Empowerment (6 questions)
  { id: 25, dimension: 'Empowerment', text: 'I comfortably delegate significant decision-making authority, not just basic administrative tasks.' },
  { id: 26, dimension: 'Empowerment', text: 'My team feels confident progressing with their work without needing constant signs of approval from me.' },
  { id: 27, dimension: 'Empowerment', text: 'I provide the necessary resources and context for my team to succeed, then step out of their way.' },
  { id: 28, dimension: 'Empowerment', text: 'When a team member brings me a problem, my first response is to ask for their proposed solution rather than solving it for them.' },
  { id: 29, dimension: 'Empowerment', text: 'I encourage my team to take calculated risks and support them fully when those risks don’t map perfectly to positive outcomes.' },
  { id: 30, dimension: 'Empowerment', text: 'If I were unexpectedly absent for two weeks, my team would continue operating efficiently and making key decisions.' },
];

export function calculateScore(answers: Record<number, number>): {
  totalScore: number;
  level: 'Emerging Leader' | 'Developing Leader' | 'Inclusive Leader' | 'Empowering Leader';
  dimensionScores: Record<Dimension, number>;
} {
  const dimensionScores = {
    'Feedback Culture': 0,
    'Shared Accountability': 0,
    'Adaptive Leadership': 0,
    'Human Connection': 0,
    'Empowerment': 0,
  };

  let rawTotal = 0;

  for (const q of questions) {
    const rawValue = answers[q.id] || 3; // Default to neutral (3) if omitted
    rawTotal += rawValue;
    dimensionScores[q.dimension] += rawValue;
  }

  // Max raw total is 30 * 5 = 150, Min raw total is 30 * 1 = 30
  // Scale to 0-100%
  const totalScore = Math.max(0, Math.min(100, Math.round(((rawTotal - 30) / 120) * 100)));

  // Convert dimension scores to a solid percentage
  // (6 questions * 5 max = 30 max per dimension, min is 6)
  (Object.keys(dimensionScores) as Dimension[]).forEach((dim) => {
    dimensionScores[dim] = Math.max(0, Math.min(100, Math.round(((dimensionScores[dim] - 6) / 24) * 100)));
  });

  let level: 'Emerging Leader' | 'Developing Leader' | 'Inclusive Leader' | 'Empowering Leader' = 'Emerging Leader';
  if (totalScore >= 80) level = 'Empowering Leader';
  else if (totalScore >= 60) level = 'Inclusive Leader';
  else if (totalScore >= 40) level = 'Developing Leader';

  return { totalScore, level, dimensionScores };
}
