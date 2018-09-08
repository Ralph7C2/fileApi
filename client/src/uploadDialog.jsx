import React from "react";
import axios from "axios";

import style from "./uploadDialog.css";

class UploadDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ file: this.fileInput.files[0] });
  }

  handleSubmit(event) {
    const data = new FormData();
    data.append("file", this.fileInput.files[0]);
    console.log(this.state);
    axios.post("/api/upload", data).then(response => {
      console.log(JSON.stringify(response, null, 2));
      this.props.refetch();
      this.props.toggleUploadDialog();
    });
    event.preventDefault();
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className={
          this.props.show ? style.uploadDialog : style.uploadDialogHidden
        }
      >
        <label>File:</label>
        <input
          type="file"
          ref={ref => {
            this.fileInput = ref;
          }}
          onChange={this.handleChange}
        />
        <input type="submit" />
      </form>
    );
  }
}

export default UploadDialog;
