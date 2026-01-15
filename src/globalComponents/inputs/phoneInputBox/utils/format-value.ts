export default function formatValue(value: string): string {
  if (!value) return '';
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
};
