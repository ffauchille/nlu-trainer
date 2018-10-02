import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { Button, Icon, Label } from "semantic-ui-react";
import { StoreState } from "../reducers";
import { uploadCSV, UploadCSV } from "./actions";

type CSVImportOwnProps = React.Props<any> & {
  onFileChange?: (file: File) => any;
  testSuiteId: string;
};
type CSVImportProps = CSVImportOwnProps & {
  uploadCSV: (csv: File, suiteId: string) => UploadCSV;
};
type CSVImportState = {
  file?: File;
};

class CSVImport extends React.Component<CSVImportProps, CSVImportState> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // see https://stackoverflow.com/questions/24139216/js-input-file-to-json-with-for-example-json-stringify
  // serializeFile(f: File): string {
  //   let copy = {
  //     lastModified: f.lastModified,
  //     name: f.name,
  //     size: f.size,
  //     type: f.type
  //   };
  //   return JSON.stringify(copy);
  // }

  setFormData(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      let file = e.currentTarget.files[0];

      if (this.props.onFileChange) {
        this.props.onFileChange(file);
      }
      this.setState({ file: file });
    }
  }

  openFile() {
    let e = document.getElementById("csv-import-input");
    if (e) e.click();
  }

  renderUploadFileBtn() {
    return (
      <Button onClick={(e, d) => this.openFile()} color="black" as="a">
        <Icon name="upload" />
        Upload examples
        <input
          id="csv-import-input"
          type="file"
          hidden
          accept=".csv"
          multiple={false}
          onChange={e => this.setFormData(e)}
        />
      </Button>
    );
  }

  renderConfirmUpload() {
    let file = this.state.file as File;
    let fnameTruncate =
      file.name.length > 19 ? file.name.slice(0, 20) + ".." : file.name;
    return (
      <Button.Group>
        <Button color="black">
          Upload <span title={file.name}>{fnameTruncate}</span> ?
        </Button>
        <Button
          basic
          color="black"
          onClick={(e, d) => {
            this.props.uploadCSV(
              this.state.file as File,
              this.props.testSuiteId
            );
            this.setState({ file: undefined });
          }}
          className="icon-btn-padding"
        >
          Yes
        </Button>
        <Button
          basic
          color="black"
          onClick={(e, d) => this.setState({ file: undefined })}
          className="icon-btn-padding"
        >
          No
        </Button>
      </Button.Group>
    );
  }

  render() {
    return !!this.state.file
      ? this.renderConfirmUpload()
      : this.renderUploadFileBtn();
  }
}

const mapStateToProps = (state: StoreState, ownProps: CSVImportOwnProps) => ({
  ...ownProps
});
const mapDispatcherToProps = (dispatch: Dispatch) => ({
  uploadCSV: bindActionCreators(uploadCSV, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(CSVImport);
