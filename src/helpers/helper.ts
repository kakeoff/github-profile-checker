export function formatDate(dateString: string | undefined) {
  if (!dateString) return "Date not found";
  const date = new Date(dateString);
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  return formattedDate;
}
