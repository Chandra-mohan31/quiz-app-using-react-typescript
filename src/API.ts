import { shuffleArray } from "./utils";



// let api: string = "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple"
export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    question: string;
    incorrect_answers: string[];
    type: string;
}

export type QuestionState = Question & { answers: string[]}

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}
export const fetchQuizQuestions = async ( amount: number,difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=21&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json();
    console.log(data);
    return data.results.map((question: Question)=>(
        {
            ...question,
            answers: shuffleArray([...question.incorrect_answers,question.correct_answer])
        }
    ))
}