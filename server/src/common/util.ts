export const formatDateUtil = (dateString) => {
  const date = new Date(dateString);

  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const formattedDate = `${month}.${day} ${hours}:${minutes}`;

  return formattedDate;
};
