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
  if (!arr || arr.length === 0) return '_';

  const sum = arr.reduce((acc, val) => acc + val, 0);
  const avg = sum / arr.length;

  return avg.toFixed(1); // 1 знак после запятой
}

function parseLine(str) {
  if (!str) return [];
  const match = str.match(/^\((.+?)\):\s*(.+)$/);
  if (!match) return [];

  const [, first, second] = match;
  return [first.trim(), second.trim()];
}

function parseTerms(arr) {
  return arr.map((item) => {
    const [term, id] = item.split('/');
    return { term, id };
  });
}

function formatRelatedTerms(arr) {
  return arr.map((item) => {
    // удаляем все символы "/" из term
    const cleanTerm = item.term.replace(/\//g, '');
    return `${cleanTerm}/${item.id}`;
  });
}

function parseRelatedTerms(arr) {
  return arr.map((str) => {
    const lastSlashIndex = str.lastIndexOf('/');

    return {
      term: str.slice(0, lastSlashIndex), // всё до последнего "/"
      id: str.slice(lastSlashIndex + 1), // всё после него
    };
  });
}

export {
  formatDateTime,
  averageToString,
  parseLine,
  parseTerms,
  formatRelatedTerms,
  parseRelatedTerms,
};
