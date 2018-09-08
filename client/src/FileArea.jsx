import React from "react";

import style from "./FileArea.css";
import FANode from "./FANode";

class FileArea extends React.Component {
  render() {
    return (
      <div className={style.fileArea}>
        {this.props.nodes.map(node => (
          <FANode key={node.id} node={node} />
        ))}
      </div>
    );
  }
}

export default FileArea;
