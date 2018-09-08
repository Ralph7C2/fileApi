import React from "react";

import DefaultIcon from "../assets/file.png";

class FANode extends React.Component {
  render() {
    return (
      <div>
        <img src={this.props.icon} style={{ height: "32px" }} />
        <p>{this.props.node.name}</p>
      </div>
    );
  }
}

FANode.defaultProps = {
  icon: DefaultIcon
};

export default FANode;
