import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllFileName } from './action';

const View = ({ item, iconName, functionDefnition }) => {
  return (
    <div className="collection z-depth-2">
      <a key={item} className="collection-item" onClick={functionDefnition}>
        <div class="valign-wrapper">
          <i className="material-icons left">{iconName}</i>
          {item}
        </div>
      </a>
    </div>
  );
};

class FolderStructure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folderStructure: {},
      currentFolder: ''
    };
  }
  componentDidMount() {
    this.props.fetchAllFileName();
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.user.folderStructure.loading) {
      this.setState({
        folderStructure: nextProps.user.folderStructure.data
      });
    }
  }
  renderFolderList() {
    const { folderStructure, currentFolder } = this.state;
    if (Object.keys(folderStructure).length !== 0) {
      if (currentFolder === '') {
        return folderStructure.homeFolders.map(item => {
          const Item = item.replace('/', '');
          return (
            <View
              item={Item}
              functionDefnition={() => this.setState({ currentFolder: item })}
              iconName="folder_open"
            />
          );
        });
      } else {
        return folderStructure[currentFolder].folders.map(item => {
          let Item = item.replace(`${currentFolder}`, '');
          Item = Item.replace('/', '');
          return (
            <View
              item={Item}
              functionDefnition={() => this.setState({ currentFolder: item })}
              iconName="folder_open"
            />
          );
        });
      }
    } else {
      return <div>Loading</div>;
    }
  }
  renderFileList() {
    const { folderStructure, currentFolder } = this.state;
    if (Object.keys(folderStructure).length !== 0) {
      if (currentFolder === '') {
        return folderStructure.homeFiles.map(item => {
          const Item = item.replace('/', '');
          return <View item={Item} iconName="insert_drive_file" />;
        });
      } else {
        return folderStructure[currentFolder].files.map(item => {
          let Item = item.replace(`${this.state.currentFolder}`, '');
          Item = Item.replace('/', '');
          return <View item={Item} iconName="insert_drive_file" />;
        });
      }
    }
  }
  backButton() {
    let folderName = this.state.currentFolder;
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
    this.setState({ folderName });
  }
  render() {
    return (
      <div>
        {this.renderFolderList()}
        {this.renderFileList()}
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
)(FolderStructure);
