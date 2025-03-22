
import { Button } from "@/components/ui/button";
import { ChevronRight, Check } from 'lucide-react';

interface TestControlsProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  isAnswered: boolean;
  showHint: boolean;
  onToggleHint: () => void;
  onNext: () => void;
}

const TestControls = ({
  currentQuestionIndex,
  totalQuestions,
  isAnswered,
  showHint,
  onToggleHint,
  onNext
}: TestControlsProps) => {
  return (
    <div className="mt-6 flex justify-between">
      <Button
        variant="outline"
        onClick={onToggleHint}
        disabled={showHint || !isAnswered}
      >
        Show Hint
      </Button>
      
      <Button
        onClick={onNext}
        disabled={!isAnswered}
      >
        {currentQuestionIndex < totalQuestions - 1 ? (
          <>
            Next Question
            <ChevronRight className="ml-2 h-4 w-4" />
          </>
        ) : (
          <>
            Complete Test
            <Check className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};

export default TestControls;
