import React, { Component } from "react";

import File from "./File";
import Folder from "./Folder";

class TreeNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
    this.toggleFolder = this.toggleFolder.bind(this);
  }

  toggleFolder() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    let _maxNameLength = this.props.maxNameLength;
    if (this.props.children) {
      return (
        <div>
          <Folder
            name={this.props.name}
            useless={_maxNameLength}
            open={this.state.open}
            toggleFolder={this.toggleFolder}
          />
          {this.state.open && (
            <div className="ChildrenDiv" style={{ padding: "0 0 0 8px" }}>
              {this.props.children.map(child => (
                <TreeNode
                  key={child.id}
                  id={child.id}
                  name={
                    child.name.length < _maxNameLength
                      ? child.name
                      : child.name.slice(0, _maxNameLength - 3) + "..."
                  }
                  icon={child.icon}
                  children={child.children}
                  action={child.action}
                />
              ))}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <File
          id={this.props.id}
          name={this.props.name}
          icon={this.props.icon}
          action={this.props.action}
        />
      );
    }
  }
}

export default TreeNode;
