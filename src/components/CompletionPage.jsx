import Button from "./Button";

function CompletionPage({ onContinue }) {
  return (
    <div className="completion-page">
      <img src="images/icon-complete.svg" alt="complete icon" />
      <h1>Thank you!</h1>
      <p>We've added your card details</p>
      <Button onClick={onContinue}>Continue</Button>
    </div>
  );
}

export default CompletionPage;
