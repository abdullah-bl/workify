




export const formatDate = (date: Date | string) => new Intl.DateTimeFormat("en-SA", {
  year: "numeric",
  month: "long",
  day: "numeric",
}).format(new Date(date));
