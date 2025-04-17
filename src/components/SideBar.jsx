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
export default SideBar;
