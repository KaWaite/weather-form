import React, { useState, useEffect } from "react";

export default function UV(props) {
  const [warning, setWarning] = useState("");

  // set warning to uv index rating
  useEffect(() => {
    if (props.uv < 3) {
      setWarning("It is a great day to go out somewhere!");
    } else if (props.uv < 6) {
      setWarning("Might wanna put on a little sunscreen!");
    } else if (props.uv < 8) {
      setWarning("Don't forget the sunscreen!");
    } else if (props.uv <= 10) {
      setWarning("Sunscreen and an umbrella are your friends today!");
    } else {
      setWarning("Might wanna postpone outdoor travel...");
    }
  }, [props]);

  return (
    <div
      // change background color depending on uv index rating
      className={
        "uv " +
        (props.uv < 3
          ? "uv-low"
          : props.uv < 6
          ? "uv-mod"
          : props.uv < 8
          ? "uv-hi"
          : props.uv <= 10
          ? "uv-vhi"
          : "uv-ex")
      }
    >
      <h3>{warning}</h3>
      {/* change image depending on uv index rating */}
      {props.uv < 3 ? (
        <img
          className="uv-icon"
          src={require("../images/picnic.png")}
          alt="uv"
        ></img>
      ) : props.uv < 6 ? (
        <img
          className="uv-icon"
          src={require("../images/spf.png")}
          alt="sunscreen"
        ></img>
      ) : props.uv < 8 ? (
        <>
          <img
            className="uv-icon"
            src={require("../images/spf.png")}
            alt="uv"
          ></img>
          <img
            className="uv-icon"
            src={require("../images/plus.svg")}
            alt="uv"
          ></img>
        </>
      ) : props.uv <= 10 ? (
        <>
          <img
            className="uv-icon"
            src={require("../images/spf.png")}
            alt="uv"
          ></img>
          <img
            className="uv-icon"
            src={require("../images/umbrella.png")}
            alt="uv"
          ></img>
        </>
      ) : (
        <img
          className="uv-icon"
          src={require("../images/uv-icon.png")}
          alt="uv"
        ></img>
      )}
      <h2>{props.uv}</h2> {/* display uv index rating */}
    </div>
  );
}
