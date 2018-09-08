import React, { Component } from "react";

import CloseFolder from "../assets/close-folder.png";
import OpenFolder from "../assets/open-folder.png";

class Folder extends Component {
  render() {
    const icon = this.props.open
      ? this.props.icons.open
      : this.props.icons.close;
    return (
      <div style={{ cursor: "pointer" }} onClick={this.props.toggleFolder}>
        <img src={icon} style={{ height: "16px" }} />
        <span style={{ padding: "0 0 0 8px" }}>{this.props.name}</span>
      </div>
    );
  }
}

Folder.defaultProps = {
  icons: {
    open: OpenFolder,
    close: CloseFolder
  },
  open: false
};

export default Folder;
