import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.css';
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
  returnFolderList() {
    if (this.state.currentFolder === '' && Object.keys(this.state.folderStructure).length != 0) {
      // console.log(this.state.folderStructure.homeFolders);
      return this.state.folderStructure.homeFolders.map(item => {
        const itemFormat = item.replace('/', '');
        return (
          <div className="collection z-depth-2">
            <a key={item} className="collection-item" onClick={() => this.renderSubFolders(item)}>
              <div class="valign-wrapper">
                <i className="material-icons left">folder_open</i>
                {itemFormat}
              </div>
            </a>
          </div>
        );
      });
    } else if (Object.keys(this.state.folderStructure).length != 0) {
      return this.state.folderStructure[this.state.currentFolder].folders.map(item => {
        let itemFormat = item.replace(`${this.state.currentFolder}`, '');
        itemFormat = itemFormat.replace('/', '');
        return (
          <div className="collection z-depth-2">
            <a key={item} className="collection-item" onClick={() => this.renderSubFolders(item)}>
              <div class="valign-wrapper">
                <i className="material-icons left">folder_open</i>
                {itemFormat}
              </div>
            </a>
          </div>
        );
      });
    }
  }
  returnFileList() {
    if (this.state.currentFolder === '' && Object.keys(this.state.folderStructure).length != 0) {
      return this.state.folderStructure.homeFiles.map(item => {
        const itemFormat = item.replace('/', '');
        return (
          <div className="collection z-depth-2">
            <a key={item} className="collection-item">
              <div class="valign-wrapper">
                <i className="material-icons left">insert_drive_file</i>
                {itemFormat}
              </div>
            </a>
          </div>
        );
      });
    } else if (Object.keys(this.state.folderStructure).length != 0) {
      // console.log(this.state.folderStructure[this.state.currentFolder].files);
      return this.state.folderStructure[this.state.currentFolder].files.map(item => {
        let itemFormat = item.replace(`${this.state.currentFolder}`, '');
        itemFormat = itemFormat.replace('/', '');
        return (
          <div className="collection z-depth-2">
            <a key={item} className="collection-item">
              <div class="valign-wrapper">
                <i className="material-icons left">insert_drive_file</i>
                {itemFormat}
              </div>
            </a>
          </div>
        );
      });
    }
  }
  renderSubFolders(item) {
    console.log(item);
    this.setState({
      currentFolder: item
    });
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
                {this.returnFolderList()}
                {this.returnFileList()}
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
