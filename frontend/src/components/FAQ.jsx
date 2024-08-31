const FAQ = ({ question, answer }) => {
    return (
      <div className="faq">
        <h3>{question}</h3>
        <p>{answer}</p>
      </div>
    );
  };
  
  export default FAQ;