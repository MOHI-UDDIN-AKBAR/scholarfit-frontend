export const getString = (data: FormData, key: string): string => {
  const raw = data.get(key);
  return typeof raw === 'string' ? raw.trim() : '';
};

export const getNumber = (data: FormData, key: string, defaultValue = 0): number => {
  const value = data.get(key);
  if (!value) return defaultValue;

  const num = parseFloat(value.toString());
  if (isNaN(num)) return defaultValue;

  const isInteger = Number.isInteger(num);

  return isInteger ? num : parseFloat(num.toFixed(2));
};

export const generateMeta = () => ({
  id: crypto.randomUUID() as string,
  createdAt: new Date().toISOString(),
});
