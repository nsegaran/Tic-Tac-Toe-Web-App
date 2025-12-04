import React from 'react';
import './TriviaModal.css';

const TriviaModal = ({ isOpen, questionData, onAnswer, onClose }) => {
    if (!isOpen) return null;

    if (!questionData) {
        return (
            <div className="trivia-modal-overlay">
                <div className="trivia-modal">
                    <div className="loading-spinner">Loading question...</div>
                </div>
            </div>
        );
    }

    // Decode HTML entities (basic implementation)
    const decodeHTML = (html) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    const handleAnswerClick = (answer) => {
        const isCorrect = answer === questionData.correct_answer;
        onAnswer(isCorrect);
    };

    // Shuffle answers
    const allAnswers = [...questionData.incorrect_answers, questionData.correct_answer]
        .sort(() => Math.random() - 0.5);

    return (
        <div className="trivia-modal-overlay">
            <div className="trivia-modal">
                <h3 className="trivia-category">{questionData.category}</h3>
                <div className="trivia-question">{decodeHTML(questionData.question)}</div>
                <div className="trivia-answers">
                    {allAnswers.map((answer, index) => (
                        <button
                            key={index}
                            className="trivia-answer-btn"
                            onClick={() => handleAnswerClick(answer)}
                        >
                            {decodeHTML(answer)}
                        </button>
                    ))}
                </div>
                <button
                    onClick={onClose}
                    style={{marginTop: '20px', padding: '5px 10px'}}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default TriviaModal;
