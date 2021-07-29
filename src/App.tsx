import React,{useState,useEffect} from 'react';
import { Difficulty, fetchQuizQuestions,QuestionState } from './API';
import QuestionCard from './components/QuestionCard';
// import logo from './logo.svg';
// import './App.css';

import { GlobalStyle, Wrapper } from './App.styles';

const T_QUES = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

function App() {

  const [loading,setLoading] = useState(false);
  const [questions,setQuestions] = useState<QuestionState[]>([]);
  const [number,setNumber] = useState(0);
  const [userAnswers,setUserAnswers] = useState<AnswerObject[]>([]);
  const [score,setScore] = useState(0);
  const [gameOver,setGameOver] = useState(true);

 

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      T_QUES,
      Difficulty.EASY
    );
    console.log(newQuestions);
    setQuestions(newQuestions);
    // console.log(questions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
      if(!gameOver){
        const answer = e.currentTarget.value;
        const correct = questions[number].correct_answer === answer;
        if(correct){
          setScore(prev => prev + 1);
        }
        const answerobj = {
          question: questions[number].question,
          answer,
          correct,
          correctAnswer: questions[number].correct_answer,


        };
        setUserAnswers(prev => [...prev,answerobj])
      }
  }

  const nextQuestion = () => {

    const nextQuestion = number + 1;
    if(nextQuestion === T_QUES){
      setGameOver(true);
    }else{
      setNumber(nextQuestion);
    }

    
  }
  return (
    <>
    <GlobalStyle />
    <Wrapper>
     
     
          <h1>REACT QUIZ</h1>
          {
            gameOver || userAnswers.length === T_QUES ? (
              <button className="start" onClick={startTrivia}>start quiz</button>
            ):(null)
          }
         {
           !gameOver ? ( <h2 className="score">Score:{score}</h2>):(null)
         }
          {
            loading && <p>Loading questions...</p>
          }
          {
            !loading && !gameOver? (
              <QuestionCard questionNr={number + 1} totalQuestions={T_QUES} question={questions[number].question} answers={questions[number].answers} userAnswer={userAnswers ? userAnswers[number] : undefined} callback={checkAnswer} />
            ):(
              null
            )
          }
      {
        (!gameOver && !loading && userAnswers.length === number + 1 && number != T_QUES-1 ) ? (
          <button className="next" onClick={nextQuestion}>
          next question
          </button> 
        ):(null)
      }     
    </Wrapper>
    </>
  );
}

export default App;
