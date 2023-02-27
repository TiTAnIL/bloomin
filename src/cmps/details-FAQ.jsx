import React, { useState } from 'react';
import faq from '../services/quastions.json'
import breaker from "../assets/imgs/main/breaker1.png"

export function FAQ() {

  const questions = faq
  const [openQuestionIds, setOpenQuestionIds] = useState([]);

  const handleQuestionClick = (questionId) => {
    if (openQuestionIds.includes(questionId)) {
      setOpenQuestionIds(openQuestionIds.filter(id => id !== questionId));
    } else {
      setOpenQuestionIds([...openQuestionIds, questionId]);
    }
  }

  return (
    <div className="qa-container">
      <h2>Frequently Asked Questions</h2>
      <ul>
        {questions.map((question) => (
          <li key={question._id}>
            <h3 className="question" onClick={() => handleQuestionClick(question._id)}>
            {openQuestionIds.includes(question._id) ? '-' : '+'} {question.title}
            </h3>
            {openQuestionIds.includes(question._id) && (
              <p onClick={() => handleQuestionClick(question._id)} className="answer" >{question.answer}</p>
              )}
              <img alt="breaker" src={breaker} />
          </li>
        ))}
      </ul>
    </div>
  )
}
