export const calculateProgressPercentage = (
  currentStep: number,
  stepPercentage: number
): number => {
  return Math.ceil(currentStep * stepPercentage);
};
