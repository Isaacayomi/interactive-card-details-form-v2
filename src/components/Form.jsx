import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import Button from "./Button";
import CompletionPage from "./CompletionPage";

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
  // hides error messages until user has interacted with the form
  const [touched, setTouched] = useState({
    name: false,
    cardNum: false,
    cvc: false,
    month: false,
    year: false,
  });

  function handleBlur(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleSubmitForm(e) {
    e.preventDefault();

    setTouched({
      name: true,
      cardNum: true,
      cvc: true,
      month: true,
      year: true,
    });

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
    } else {
      onSetCompletionPage(true);
    }
  }

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
                onBlur={() => handleBlur("name")}
                type="text"
                className="cardholder-name"
                placeholder="e.g. Jane Appleseed"
              />
              {touched.name && name.trim().length === 0 ? (
                <ErrorMessage>Cannot be blank</ErrorMessage>
              ) : touched.name && !/^[A-Za-z\s]+$/.test(name) ? (
                <ErrorMessage>Letters only, no special characters</ErrorMessage>
              ) : null}
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
                onBlur={() => handleBlur("cardNum")}
                type="text"
                className="card-number"
                placeholder="e.g. 1234 5678 9123 0000"
              />
              {touched.cardNum && cardNum.trim().length === 0 ? (
                <ErrorMessage>Cannot be blank</ErrorMessage>
              ) : touched.cardNum &&
                cardNum.replace(/\s/g, "").length !== 16 ? (
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
                  onBlur={() => handleBlur("month")}
                  type="text"
                  maxLength={2}
                  className="exp-month"
                  placeholder="MM"
                />
                {touched.month && month.trim().length === 0 ? (
                  <ErrorMessage>Cannot be blank</ErrorMessage>
                ) : touched.month && !/^\d+$/.test(month) ? (
                  <ErrorMessage>Only numbers allowed</ErrorMessage>
                ) : touched.month &&
                  (Number(month) > 12 || Number(month) < currentMonth) ? (
                  <ErrorMessage>Card is invalid</ErrorMessage>
                ) : null}
              </div>

              <div className="year">
                <input
                  value={year}
                  onChange={(e) => onSetYear(e.target.value)}
                  onBlur={() => handleBlur("year")}
                  type="text"
                  maxLength={2}
                  className="exp-year"
                  placeholder="YY"
                />
                {touched.year && year.trim().length === 0 ? (
                  <ErrorMessage>Cannot be blank</ErrorMessage>
                ) : touched.year && !/^\d+$/.test(year) ? (
                  <ErrorMessage>Only numbers allowed</ErrorMessage>
                ) : touched.year &&
                  (Number(year) > 30 || Number(year) < currentYear) ? (
                  <ErrorMessage>Card is invalid</ErrorMessage>
                ) : null}
              </div>
            </div>

            <div className="cvv-form-group">
              <input
                value={cvc}
                onChange={(e) => onSetCvc(e.target.value)}
                onBlur={() => handleBlur("cvc")}
                type="text"
                maxLength={3}
                className="cvc"
                placeholder="e.g. 123"
              />
              {touched.cvc && cvc.trim().length === 0 ? (
                <ErrorMessage>Cannot be blank</ErrorMessage>
              ) : touched.cvc && !/^\d+$/.test(cvc) ? (
                <ErrorMessage>Only numbers allowed</ErrorMessage>
              ) : touched.cvc && cvc.length < 3 ? (
                <ErrorMessage>Min digit is 3</ErrorMessage>
              ) : null}
            </div>
          </div>

          <Button type="submit" onClick={handleSubmitForm}>
            Confirm
          </Button>
        </form>
      ) : (
        <CompletionPage
          onContinue={() => {
            onSetName("");
            onSetCardNum("");
            onSetCvc("");
            onSetMonth("");
            onSetYear("");
            onSetCompletionPage(false);
          }}
        />
      )}
    </div>
  );
}

export default Form;
