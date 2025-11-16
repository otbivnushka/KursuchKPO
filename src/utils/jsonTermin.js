function createTermPayload(userInput, currentUser = 'anonymous') {
  if (!userInput.term || !userInput.definition) {
    throw new Error('Term и definition обязательны');
  }

  const now = new Date().toISOString();

  return {
    termData: {
      term: userInput.term,
      definition: userInput.definition,
      category: userInput.category || 'General',
      tags: userInput.tags || [],
      popularity: 0,
      addedDate: now,
      lastAccessed: '0001-01-01T00:00:00Z',
      letter: userInput.term.charAt(0).toUpperCase(),
      translations: userInput.translations || {},
      difficultyRatings: [],
      difficultyLevel: userInput.difficultyLevel,
      relatedTerms: userInput.relatedTerms || [],
      history: [],
      media: userInput.media || [],
      author: currentUser,
      source: userInput.source || '',
    },
  };
}

export default createTermPayload;
