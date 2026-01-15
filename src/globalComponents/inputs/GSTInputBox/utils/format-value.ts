export default function formatValue(value: string, shouldMask: boolean) {
  if (!value) return '';
  const raw = value.replace(/-/g, "").slice(0, 15);
  if (shouldMask) {
    return value.slice(0, 4) + "******" + value.slice(10);
  } else {
    if(raw.length <= 5){
      return raw;
    } else if(raw.length <= 10){
      return `${raw.slice(0, 5)}-${raw.slice(5)}`;
    } else{
      return `${raw.slice(0, 5)}-${raw.slice(5, 10)}-${raw.slice(10)}`;
    }
  }
}