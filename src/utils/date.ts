export const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  const dateStr = `${day}/${month}/${year}`;

  return `${dateStr}`.trim();
};
