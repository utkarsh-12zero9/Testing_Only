export default function getStarUnit(property: number, type = 'mini'): string {
  const  percentage = property * 25;
  
  const roundedPercentage = Math.round(percentage / 25) * 25;
  
  const clampedValue = Math.max(0, Math.min(100, roundedPercentage));
  
  return `/reviewIcons/${type}/star${clampedValue}.svg`;
}