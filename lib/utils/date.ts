type DateFormatOptions = {
  locale?: string;
  showTime?: boolean;
};

export function formatDate(
  date: Date | string,
  options: DateFormatOptions = {}
) {
  const { locale = "pt-BR", showTime = true } = options;

  const dateObject = date instanceof Date ? date : new Date(date);

  const config: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...(showTime && {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  return new Intl.DateTimeFormat(locale, config).format(dateObject);
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

export function isYesterday(date: Date): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
}

export function getRelativeTime(date: Date): string {
  if (isToday(date)) {
    return "Hoje";
  }
  if (isYesterday(date)) {
    return "Ontem";
  }
  return formatDate(date);
}
