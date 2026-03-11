export type Dimension = 'feedbackCulture' | 'sharedAccountability' | 'adaptiveLeadership' | 'humanConnection' | 'empowerment';

export interface Question {
  id: number;
  text: string;
  dimension: Dimension;
}

export const LEADERSHIP_QUESTIONS: Question[] = [
  // Feedback Culture
  { id: 1, text: "I regularly invite my team to challenge my decisions and ideas.", dimension: 'feedbackCulture' },
  { id: 2, text: "My team members feel safe enough to admit mistakes without fear of blame.", dimension: 'feedbackCulture' },
  { id: 3, text: "Constructive feedback flows freely in all directions within my team.", dimension: 'feedbackCulture' },
  { id: 4, text: "I actively seek out dissenting opinions when making critical team decisions.", dimension: 'feedbackCulture' },
  { id: 5, text: "Our team meetings are spaces where 'brutal honesty' is practiced respectfully.", dimension: 'feedbackCulture' },
  { id: 6, text: "I prioritize psychological safety as much as I prioritize performance metrics.", dimension: 'feedbackCulture' },

  // Shared Accountability
  { id: 7, text: "Every team member can clearly articulate the team's top priorities.", dimension: 'sharedAccountability' },
  { id: 8, text: "Accountability is seen as a team responsibility rather than just my job.", dimension: 'sharedAccountability' },
  { id: 9, text: "My team members hold each other accountable for high standards of work.", dimension: 'sharedAccountability' },
  { id: 10, text: "Responsibilities and ownership of tasks are transparent to everyone.", dimension: 'sharedAccountability' },
  { id: 11, text: "We have clear mechanisms for tracking and reviewing our collective progress.", dimension: 'sharedAccountability' },
  { id: 12, text: "The team takes collective ownership of failures instead of pointing fingers.", dimension: 'sharedAccountability' },

  // Adaptive Leadership
  { id: 13, text: "I consciously adjust my communication style to suit different team members.", dimension: 'adaptiveLeadership' },
  { id: 14, text: "I am flexible in changing my leadership approach based on the situation.", dimension: 'adaptiveLeadership' },
  { id: 15, text: "I spend significant time understanding the unique strengths of each individual.", dimension: 'adaptiveLeadership' },
  { id: 16, text: "I can pivot the team's direction quickly when external conditions change.", dimension: 'adaptiveLeadership' },
  { id: 17, text: "I encourage my team to experiment and learn from small failures.", dimension: 'adaptiveLeadership' },
  { id: 18, text: "I avoid a 'one-size-fits-all' approach to managing my direct reports.", dimension: 'adaptiveLeadership' },

  // Human Connection
  { id: 19, text: "I know what motivates my team members beyond their job descriptions.", dimension: 'humanConnection' },
  { id: 20, text: "I regularly check in on my team's wellbeing, not just their tasks.", dimension: 'humanConnection' },
  { id: 21, text: "I have built genuine trust with every person I lead.", dimension: 'humanConnection' },
  { id: 22, text: "I understand the personal challenges that might be affecting my team's work.", dimension: 'humanConnection' },
  { id: 23, text: "My team members feel seen and valued as individuals by me.", dimension: 'humanConnection' },
  { id: 24, text: "I foster a sense of belonging and community within the team.", dimension: 'humanConnection' },

  // Empowerment
  { id: 25, text: "I delegate significant decision-making authority to my team members.", dimension: 'empowerment' },
  { id: 26, text: "My team members feel they have full ownership over their specific areas.", dimension: 'empowerment' },
  { id: 27, text: "I avoid micromanaging, even when tasks are complex or high-stakes.", dimension: 'empowerment' },
  { id: 28, text: "I provide the resources my team needs and then get out of their way.", dimension: 'empowerment' },
  { id: 29, text: "My team is comfortable making decisions without asking for my approval first.", dimension: 'empowerment' },
  { id: 30, text: "I measure success by the team's ability to thrive when I am not present.", dimension: 'empowerment' },
];
