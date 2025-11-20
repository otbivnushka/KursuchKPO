function sortItems(items, sortBy) {
  const arr = [...items]; // чтобы не мутировать исходный массив

  return arr.sort((a, b) => {
    switch (sortBy) {
      case 'date':
        // Чем позже дата — тем выше в списке
        return new Date(b.addedDate) - new Date(a.addedDate);

      case 'rate':
        // Среднее значение difficultyRatings
        const avgA = a.difficultyRatings.reduce((s, n) => s + n, 0) / a.difficultyRatings.length;
        const avgB = b.difficultyRatings.reduce((s, n) => s + n, 0) / b.difficultyRatings.length;
        return avgA - avgB;

      case 'popularity':
        return b.popularity - a.popularity;

      case 'name':
        return a.term.localeCompare(b.term);

      default:
        return 0;
    }
  });
}

export default sortItems;
