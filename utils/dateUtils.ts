// Utilidades de fecha personalizadas para evitar problemas con date-fns en React Native

export function formatDate(
  timestamp: number,
  formatStr: string = "LLL d yyyy, h:mm aaa"
): string {
  const date = new Date(timestamp);

  // Formato simple para mostrar la fecha
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  return date.toLocaleDateString("es-ES", options);
}

export function differenceInCalendarDays(
  dateLeft: number | Date,
  dateRight: number | Date
): number {
  const leftDate = typeof dateLeft === "number" ? new Date(dateLeft) : dateLeft;
  const rightDate =
    typeof dateRight === "number" ? new Date(dateRight) : dateRight;

  // Normalizar a medianoche para obtener la diferencia en días calendario
  const leftDateOnly = new Date(
    leftDate.getFullYear(),
    leftDate.getMonth(),
    leftDate.getDate()
  );
  const rightDateOnly = new Date(
    rightDate.getFullYear(),
    rightDate.getMonth(),
    rightDate.getDate()
  );

  const diffTime = leftDateOnly.getTime() - rightDateOnly.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}
