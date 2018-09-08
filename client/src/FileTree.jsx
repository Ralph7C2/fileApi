import React, { Component } from "react";
import TreeNode from "./treenode";

const MAX_NAME_LEGNTH = 15;

class FileTree extends Component {
  render() {
    return (
      <div>
        {this.props.data.map(data => {
          console.log(data.name.length < 10 ? data.name : "Longer than 10");
          return (
            <TreeNode
              key={data.id}
              id={data.id}
              maxNameLength={MAX_NAME_LEGNTH}
              name={
                data.name.length < MAX_NAME_LEGNTH
                  ? data.name
                  : data.name.slice(0, MAX_NAME_LEGNTH - 3) + "..."
              }
              icon={data.icon}
              children={data.children}
              action={data.action}
            />
          );
        })}
      </div>
    );
  }
}

export default FileTree;
