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

export const getCurrentName = (path) => {
  const cutName = path.indexOf("/")
  const name = path.slice(cutName + 1)
  return name
}
