
interface QuestionWithShuffledOptions {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
  originalIndex: number[];
}

export function shuffleQuestionOptions(question: {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
}): QuestionWithShuffledOptions {
  // Create a mapping array to track original positions
  const originalIndex = [...Array(question.options.length).keys()];
  
  // Pair options with their original indices
  const optionsWithIndices = question.options.map((option, index) => ({
    option,
    originalIndex: index
  }));
  
  // Shuffle the pairs
  for (let i = optionsWithIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [optionsWithIndices[i], optionsWithIndices[j]] = [optionsWithIndices[j], optionsWithIndices[i]];
  }
  
  // Update the original index mapping and extract shuffled options
  const shuffledOptions = optionsWithIndices.map((pair, index) => {
    originalIndex[index] = pair.originalIndex;
    return pair.option;
  });
  
  // Find the new position of the correct answer
  const newCorrectAnswerIndex = originalIndex.findIndex(index => index === question.correctAnswer);
  
  return {
    ...question,
    options: shuffledOptions,
    correctAnswer: newCorrectAnswerIndex,
    originalIndex
  };
}
