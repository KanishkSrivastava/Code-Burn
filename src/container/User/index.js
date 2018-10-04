import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.css';
import FolderStructure from './FolderStructure';
import { fetchAllFileName } from './action';
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folderStructure: {},
      currentFolder: ''
    };
    this.props.fetchAllFileName();
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.user.folderStructure.loading) {
      this.setState({
        folderStructure: nextProps.user.folderStructure.data
      });
    }
  }
  backButton() {
    let folderName = this.state.currentFolder;
    console.log(folderName);
    let indexOfBackSlash = 0;
    let countofBackSlash = 0;
    for (let index = folderName.length - 1; index >= 0; index--) {
      if (folderName[index] === '/') countofBackSlash++;
      if (countofBackSlash === 2) {
        indexOfBackSlash = index;
        break;
      }
      if (index === 0) folderName = '';
    }
    folderName = folderName.substring(0, indexOfBackSlash + 1, -1);
    this.renderSubFolders(folderName);
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12 m3">
            <div className="card sideNav">
              <div className="btn" onClick={this.backButton.bind(this)}>
                Back
              </div>
              <div className="card-content margin-collection black-text">
                <FolderStructure />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(
  mapStateToProps,
  { fetchAllFileName }
)(User);
