import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import FileTree from "./FileTree";
import FileArea from "./FileArea";
import FAB from "./fab";
import UploadDialog from "./uploadDialog";
import style from "./app.css";

const action = event => {
  const file = event.name;
  alert(`action: ${file}`);
};
var sampleData = [];

class HelloMessage extends React.Component {
  constructor() {
    super();
    this.toggleUploadDialog = this.toggleUploadDialog.bind(this);
    this.refetch = this.refetch.bind(this);
    this.state = {
      data: sampleData,
      uploadDialogOpen: false,
      testState: "This is the test string"
    };
  }
  refetch() {
    axios.get("/api/files").then(response => {
      this.setState({ data: response.data });
    });
  }
  componentDidMount() {
    this.refetch();
  }

  toggleUploadDialog() {
    console.log("Upload button pressed!");
    this.setState({ uploadDialogOpen: !this.state.uploadDialogOpen });
  }

  render() {
    return (
      <div className={style.mainContainer}>
        <FAB buttonPressed={this.toggleUploadDialog} />
        <div className={style.fileTree}>
          <FileTree data={this.state.data} />
        </div>
        <div className={style.fileArea}>
          <FileArea
            nodes={[
              { id: 1, name: "f1" },
              { id: 2, name: "f2" },
              { id: 3, name: "f3" }
            ]}
          />
        </div>
        <UploadDialog
          show={this.state.uploadDialogOpen}
          toggleUploadDialog={this.toggleUploadDialog}
          refetch={this.refetch}
        />
      </div>
    );
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<HelloMessage />, mountNode);
