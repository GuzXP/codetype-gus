
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface TestResultsProps {
  wpm: number;
  accuracy: number;
  time: number;
  onRestart: () => void;
}

const TestResults: React.FC<TestResultsProps> = ({
  wpm,
  accuracy,
  time,
  onRestart,
}) => {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Your Results</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
            <span className="text-xs text-muted-foreground mb-1">Speed</span>
            <span className="text-4xl font-bold text-accent">{wpm}</span>
            <span className="text-sm text-muted-foreground">WPM</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
            <span className="text-xs text-muted-foreground mb-1">Accuracy</span>
            <span className="text-4xl font-bold text-accent">{accuracy}%</span>
            <span className="text-sm text-muted-foreground">correct</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm text-muted-foreground">
            You completed the test in {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
          </span>
          
          <Button onClick={onRestart} className="mt-4 w-full">
            Try Again <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestResults;
