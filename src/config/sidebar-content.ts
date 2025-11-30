import type { IconName } from '../components/ui/Icon';

export type FeatureItem = {
  id: string;
  icon: IconName;
  heading: string;
  text: string;
};

export type MotivationCard = {
  icon: IconName;
  heading: string;
  text: string;
};

export type SidebarContent = {
  heading: string;
  description: string;
  motivationCard: MotivationCard;
  features: FeatureItem[];
  footer: string;
};

const sharedFooter =
  'Join 50,000+ athletes and fitness enthusiasts achieving their goals with ScholarFit';

export const loginSidebarContent: SidebarContent = {
  heading: 'Welcome Back!',
  description:
    'Your fitness journey continues. Track your progress and keep pushing towards your goals.',

  motivationCard: {
    icon: 'fire',
    heading: "Today's Motivation",
    text: 'Consistency beats intensity. Show up today — your future self will be glad you did.',
  },

  features: [
    {
      id: 'strengthProgression',
      icon: 'dumbbell',
      heading: 'Strength Progression',
      text: 'Monitor your strength gains and volume progression across all major lifts with detailed analytics.',
    },
    {
      id: 'trainingMilestones',
      icon: 'trophy',
      heading: 'Training Milestones',
      text: 'Track your consistency and unlock achievements based on your personalized fitness goals.',
    },
    {
      id: 'programAdherence',
      icon: 'calendar',
      heading: 'Program Adherence',
      text: 'View your scheduled workouts and track adherence to your customized training program.',
    },
  ],

  footer: sharedFooter,
};

export const registrationSidebarContent: SidebarContent = {
  heading: 'Start Your Fitness Journey',
  description:
    'Join thousands who have transformed their lives through structured fitness tracking and education.',

  motivationCard: {
    icon: 'quoteLeft',
    heading: 'Fitness Starts Today',
    text: 'The best time to plant a tree was 20 years ago. The second best time is now. Your fitness journey begins with this single step.',
  },

  features: [
    {
      id: 'learnProperForm',
      icon: 'brain',
      heading: 'Learn Proper Form',
      text: 'Access our extensive exercise library with video tutorials and form guides.',
    },
    {
      id: 'trackYourProgress',
      icon: 'chart',
      heading: 'Track Your Progress',
      text: 'Monitor strength gains, body measurements, and workout consistency with detailed analytics.',
    },
    {
      id: 'personalizedPrograms',
      icon: 'userCheck',
      heading: 'Personalized Programs',
      text: 'Get workout plans tailored to your goals, equipment, and experience level.',
    },
    {
      id: 'earnAchievements',
      icon: 'medal',
      heading: 'Earn Achievements',
      text: 'Stay motivated with badges and milestones celebrating your fitness journey.',
    },
  ],

  footer: sharedFooter,
};
