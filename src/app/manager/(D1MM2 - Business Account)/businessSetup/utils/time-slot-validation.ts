function parseTime(time: string) {
  // Convert "HH:MM AM/PM" → 24-hour time
  const [timePart, modifier] = time.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  return new Date(0, 0, 0, hours, minutes);
};

export default function isClosingAfterOpening(opening: string, closing: string): boolean {
  const openTime = parseTime(opening);
  const closeTime = parseTime(closing);

  // Special case: 00:00 means midnight end-of-day → treat as valid but still enforce 1 hour rule
  if (closeTime.getHours() === 0 && closeTime.getMinutes() === 0) {
    closeTime.setHours(openTime.getHours() + 23); // Adjust to 23 hours after opening for comparison
  }

  // Normal case: closing must be >= opening + 1 hour
  openTime.setHours(openTime.getHours() + 1); // Adjust opening time forward by 1 hour for comparison

  return closeTime >= openTime;
}
