import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { Button, Icon } from "semantic-ui-react";
import { StoreState } from "../reducers";
import { UploadCSV, uploadCSV } from "./actions";

type CSVImportOwnProps = React.Props<any> & {};
type CSVImportProps = CSVImportOwnProps & {
  loading: boolean;
  uploadCSV: (data: FormData) => UploadCSV;
};
type CSVImportState = {};

class CSVImport extends React.Component<CSVImportProps, CSVImportState> {
  onUploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      let file = e.currentTarget.files[0];
      let formData = new FormData();
      formData.append("csvBytes", file, file.name);
      this.props.uploadCSV(formData);
    }
  }

  openFile() {
    let e = document.getElementById("csv-import-input");
    if (e) e.click();
  }

  render() {
    return (
      <Button
        disabled={this.props.loading}
        onClick={(e, d) => this.openFile()}
        color="violet"
      >
        <Icon loading={this.props.loading} name="plus" /> Import CSV
        <input
          id="csv-import-input"
          type="file"
          hidden
          accept=".csv"
          multiple={false}
          onChange={e => this.onUploadFile(e)}
        />
      </Button>
    );
  }
}

const mapStateToProps = (state: StoreState, ownProps: CSVImportOwnProps) => ({
  loading: state.testbox.batch.uploadingCSV
});
const mapDispatcherToProps = (dispatch: Dispatch) => ({
  uploadCSV: bindActionCreators(uploadCSV, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(CSVImport);
