function App() {
  return <MainContainer />;
}

function MainContainer() {
  return (
    <div className="main-container">
      <SideBar />
      <Form />
      {/* <CompletionPage /> */}
    </div>
  );
}

function SideBar() {
  return (
    <div className="sidebar">
      <div className="front-card">
        <img src="images/bg-card-front.png" alt="front card" />

        <div className="card-content">
          <img src="images/card-logo.svg" alt="card logo" className="logo" />{" "}
          <p className="card-num">0000 0000 0000 0000</p>
          <div className="name-card-details">
            <p className="card-name">JANE APPLESEED</p>
            <p className="card-cvv">00/00</p>
          </div>
        </div>
      </div>
      <div className="back-card">
        <img src="images/bg-card-back.png" alt="back card" />
        <div className="back-card-content">
          <p className="back-card-cvv">000</p>
        </div>
      </div>
    </div>
  );
}

function Form() {
  return (
    <div className="form">
      <form>
        <div className="form-group">
          <label htmlFor="cardholder-name">Cardholder Name</label>
          <input
            type="text"
            className="cardholder-name"
            placeholder="e.g. Jane Appleseed"
          />
          <ErrorMessage>Wrong format, number only </ErrorMessage>
        </div>

        <div className="form-group">
          <label htmlFor="card-number">Card Number</label>
          <input
            type="text"
            maxLength={16}
            className="card-number"
            placeholder="e.g. 1234 5678 9123 0000"
          />
          <ErrorMessage>Wrong format, number only </ErrorMessage>
        </div>

        <label htmlFor="exp-date" className="exp-details-label">
          Exp. Date (MM/YY)
        </label>

        <label htmlFor="cvc" className="exp-details-label cvc-label">
          CVC
        </label>

        <div className="form-date-group">
          <div className="exp-form-group">
            <div className="month">
              <input
                type="text"
                maxLength={2}
                className="exp-month"
                placeholder="MM"
              />
              <ErrorMessage>Can't be blank </ErrorMessage>
            </div>

            <div className="year">
              <input
                type="text"
                maxLength={2}
                className="exp-year"
                placeholder="YY"
              />
              <ErrorMessage>Can't be blank </ErrorMessage>{" "}
            </div>
          </div>

          <div className="cvv-form-group">
            <input type="text" max={3} className="cvc" placeholder="e.g. 123" />
            <ErrorMessage>Can't be blank</ErrorMessage>
          </div>
        </div>

        <Button>Confirm</Button>
      </form>
    </div>
  );
}

function ErrorMessage({ children }) {
  return <p className="error">{children}</p>;
}

function CompletionPage() {
  return (
    <div className="completion-page">
      <img src="images/icon-complete.svg" alt="complete icon" />
      <h1>Thank you!</h1>
      <p>We've added your card details</p>
      <Button>Continue</Button>
    </div>
  );
}

function Button({ children }) {
  return <button type="submit">{children}</button>;
}

export default App;
