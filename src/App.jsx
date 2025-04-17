import { useState } from "react";

function App() {
  return <MainContainer />;
}

function MainContainer() {
  const [name, setName] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [cvc, setCvc] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [completionPage, setCompletionPage] = useState(false);

  return (
    <div className="main-container">
      <SideBar
        name={name}
        onSetName={setName}
        cardNum={cardNum}
        onSetCardNum={setCardNum}
        cvc={cvc}
        onSetCvc={setCvc}
        month={month}
        onSetMonth={setMonth}
        year={year}
        onSetYear={setYear}
      />
      <Form
        name={name}
        onSetName={setName}
        cardNum={cardNum}
        onSetCardNum={setCardNum}
        cvc={cvc}
        onSetCvc={setCvc}
        month={month}
        onSetMonth={setMonth}
        year={year}
        onSetYear={setYear}
        completionPage={completionPage}
        onSetCompletionPage={setCompletionPage}
      />
    </div>
  );
}

function SideBar({ name, cardNum, cvc, month, year }) {
  return (
    <div className="sidebar">
      <div className="front-card">
        <img
          src="images/bg-card-front.png"
          alt="front card"
          className="front-card-img"
        />

        <div className="card-content">
          <img src="images/card-logo.svg" alt="card logo" className="logo" />{" "}
          <p className="card-num">{cardNum || "0000 0000 0000 0000"}</p>
          <div className="name-card-details">
            <p className="card-name">{name || "JANE APPLESEED"}</p>
            <p className="card-cvv">
              {month && year ? `${month} / ${year}` : `00/00`}
            </p>
          </div>
        </div>
      </div>
      <div className="back-card">
        <img
          src="images/bg-card-back.png"
          alt="back card"
          className="back-card-img"
        />
        <div className="back-card-content">
          <p className="back-card-cvv">{cvc || 123}</p>
        </div>
      </div>
    </div>
  );
}

function Form({
  name,
  onSetName,
  cardNum,
  onSetCardNum,
  cvc,
  onSetCvc,
  month,
  onSetMonth,
  year,
  onSetYear,
  completionPage,
  onSetCompletionPage,
}) {
  function handleSubmitForm(e) {
    e.preventDefault();

    const isNameInvalid = name.trim().length === 0;
    const isCardNumInvalid = cardNum.trim().length === 0;
    const isCvcInvalid = cvc.trim().length === 0;
    const isMonthInvalid = month.trim().length === 0;
    const isYearInvalid = year.trim().length === 0;

    const errors =
      isNameInvalid ||
      isCardNumInvalid ||
      isCvcInvalid ||
      isMonthInvalid ||
      isYearInvalid;

    if (errors) {
      onSetCompletionPage(false);
      console.log("Hide completion form");
    } else {
      onSetCompletionPage(true);
      console.log("show completoin form");
    }
  }

  // function handleContinue(e) {
  //   e.preventDefault();
  //   onSetCompletionPage(false);
  // }

  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  return (
    <div className="form">
      {!completionPage ? (
        <form onSubmit={handleSubmitForm}>
          <div className="form-group-details">
            <div className="form-group">
              <label htmlFor="cardholder-name">Cardholder Name</label>
              <input
                value={name}
                onChange={(e) => onSetName(e.target.value)}
                type="text"
                className="cardholder-name"
                placeholder="e.g. Jane Appleseed"
              />
              {name.trim().length === 0 && (
                <ErrorMessage>Wrong format, Letters only</ErrorMessage>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="card-number">Card Number</label>
              <input
                value={cardNum}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, "");
                  const formattedValue =
                    rawValue.match(/.{1,4}/g)?.join(" ") || "";
                  onSetCardNum(formattedValue);
                }}
                type="text"
                className="card-number"
                placeholder="e.g. 1234 5678 9123 0000"
              />
              {cardNum.trim().length === 0 ? (
                <ErrorMessage>Cannot be blank</ErrorMessage>
              ) : cardNum.replace(/\s/g, "").length !== 16 ? (
                <ErrorMessage>Should be 16 digits</ErrorMessage>
              ) : null}
            </div>
          </div>

          <div className="exp-labels">
            <label htmlFor="exp-date" className="exp-details-label">
              Exp. Date (MM/YY)
            </label>

            <label htmlFor="cvc" className="exp-details-label cvc-label">
              CVC
            </label>
          </div>

          <div className="form-date-group">
            <div className="exp-form-group">
              <div className="month">
                <input
                  value={month}
                  onChange={(e) => onSetMonth(e.target.value)}
                  type="text"
                  maxLength={2}
                  className="exp-month"
                  placeholder="MM"
                />
                {month.trim().length === 0 ? (
                  <ErrorMessage>Cannot be blank</ErrorMessage>
                ) : !/^\d+$/.test(month) ? (
                  <ErrorMessage>Only numbers allowed</ErrorMessage>
                ) : Number(month) > 12 || Number(month) < currentMonth ? (
                  <ErrorMessage>Card is invalid</ErrorMessage>
                ) : null}
              </div>

              <div className="year">
                <input
                  value={year}
                  onChange={(e) => onSetYear(e.target.value)}
                  type="text"
                  maxLength={2}
                  className="exp-year"
                  placeholder="YY"
                />
                {year.trim().length === 0 ? (
                  <ErrorMessage>Cannot be blank</ErrorMessage>
                ) : !/^\d+$/.test(year) ? (
                  <ErrorMessage>Only numbers allowed</ErrorMessage>
                ) : Number(year) > 30 || Number(year) < currentYear ? (
                  <ErrorMessage>Card is invalid</ErrorMessage>
                ) : null}
              </div>
            </div>

            <div className="cvv-form-group">
              <input
                value={cvc}
                onChange={(e) => onSetCvc(e.target.value)}
                type="text"
                maxLength={3}
                className="cvc"
                placeholder="e.g. 123"
              />
              {cvc.trim().length === 0 ? (
                <ErrorMessage>Cannot be blank</ErrorMessage>
              ) : !/^\d+$/.test(cvc) ? (
                <ErrorMessage>Only numbers allowed</ErrorMessage>
              ) : cvc.length < 3 ? (
                <ErrorMessage>Min Digit is 3</ErrorMessage>
              ) : null}
            </div>
          </div>

          <Button onClick={handleSubmitForm}>Confirm</Button>
        </form>
      ) : (
        <CompletionPage />
      )}
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
      <Button onClick={() => console.log("Continue")}>Continue</Button>
    </div>
  );
}

function Button({ children }) {
  return <button>{children}</button>;
}

export default App;
