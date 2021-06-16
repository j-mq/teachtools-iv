export type StopPoint = {
  time: number;
  questionTitle: string;
  answers: Answer[];
};

export type Answer = {
  title: string;
  correctAnswer: boolean;
};
