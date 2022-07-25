export const getCurrentDate = (timestamp) => {
  if (!timestamp) return "";

  const date = new Date(timestamp);
  const formatDate = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);

  return formatDate;
};
