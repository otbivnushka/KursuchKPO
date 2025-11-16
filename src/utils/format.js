function formatDateTime(isoString) {
  const date = new Date(isoString);

  if (isNaN(date)) return 'Invalid date';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

function averageToString(arr) {
  if (!arr || arr.length === 0) return 'нет оценок';

  const sum = arr.reduce((acc, val) => acc + val, 0);
  const avg = sum / arr.length;

  return avg.toFixed(1); // 1 знак после запятой
}

export { formatDateTime, averageToString };
