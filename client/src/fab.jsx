import React from "react";
import style from "./fab.css";

class FAB extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={style.fab}>
        <button onClick={this.props.buttonPressed}>Upload</button>
      </div>
    );
  }
}

export default FAB;
