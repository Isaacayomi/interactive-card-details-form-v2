import { useState } from "react";
import SideBar from "./components/SideBar";
import Form from "./components/Form";

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

export default App;
