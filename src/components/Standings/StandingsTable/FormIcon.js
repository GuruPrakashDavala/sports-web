// import success from "/assets/success.svg";
// import lose from "/assets/lose.svg";
// import draw from "/assets/draw.svg";

// import success from "/assets/success.svg";

export const FormIcon = ({ recentFormValues }) => {
  return (
    <>
      {/* SVG Icons */}

      <div className="main">
        {recentFormValues.map((item, index) => {
          return item === "L" ? (
            <div className="mright-5">
              {/* <img src={lose} alt="lose" /> */}L
            </div>
          ) : item === "D" ? (
            <div className="mright-5">
              {/* <img src={draw} alt="draw" /> */}D
            </div>
          ) : (
            <div className="mright-5">
              {/* <img src={success} alt="success" /> */}W
            </div>
          );
        })}
      </div>

      {/* CSS circles */}

      {/* <div className="main">
        {recentFormValues.map((item, index) => {
          return item === "L" ? (
            <div className="circle danger" id={index} key={index}>
              <span>{item}</span>
            </div>
          ) : item === "D" ? (
            <div className="circle warning" id={index} key={index}>
              <span>{item}</span>
            </div>
          ) : (
            <div className="circle success" id={index} key={index}>
              <span>{item}</span>
            </div>
          );
        })}
      </div> */}
    </>
  );
};
