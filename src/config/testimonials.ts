export type TestimonialType = {
  id: number;
  name: string;
  profession: string;
  review: string;
  reviewRate: number;
};

export const testimonials: TestimonialType[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    profession: 'Fitness Coach',
    review: `"ScholarFit has transformed how I design programs for my clients. The volume tracking and progress analytics are game-changers for measuring real progress"`,
    reviewRate: 5,
  },
  {
    id: 2,
    name: 'Mike Chen',
    profession: 'Strength Athlete',
    review: `"As a competitive powerlifter, the detailed tracking and analytics help me optimize my training cycles. I've added 50kg to my total in 6 months using ScholarFit."`,
    reviewRate: 5,
  },
  {
    id: 3,
    name: 'Jessica Williams',
    profession: 'Yoga Instructor',
    review: `"I love how ScholarFit adapts to my changing goals. When I wanted to build strength, it gave me the perfect plan. Now I'm focusing on mobility with equally great results."`,
    reviewRate: 5,
  },
];
