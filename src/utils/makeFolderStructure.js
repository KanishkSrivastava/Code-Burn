const makeFodlerStructure = allFiles => {
  let allFile = [];
  let allFolders = [];
  let homeFiles = [];
  let homeFolders = [];
  let folderStructure = {};
  const userName = allFiles[0].Key;
  allFiles.forEach((element, index) => {
    allFile[index] = element.Key.replace(userName, '');
  });
  allFile.splice(allFile.indexOf(''), 1);
  for (let index = 0; index < allFile.length; index++) {
    if (allFile[index].indexOf('/') === -1) {
      homeFiles.push(allFile[index]);
      allFile.splice(index, 1);
      index = index - 1;
    }
  }
  for (let index = 0; index < allFile.length; index++) {
    if (allFile[index].indexOf('.') === -1) {
      allFolders.push(allFile[index]);
    }
  }
  allFolders.forEach((element, index) => {
    if (element.indexOf('/') === element.length - 1) homeFolders.push(element);
  });
  allFile = allFile.filter(x => !homeFolders.includes(x));
  folderStructure = {
    homeFiles: homeFiles,
    homeFolders: homeFolders
  };
  for (let index = 0; index < allFolders.length; index++) {
    const folderName = allFolders[index];
    let folderObject;
    let foldersInFolderObject = [];
    let filesInFolderObject = [];
    for (let i = 0; i < allFile.length; i++) {
      if (allFile[i].includes(folderName)) {
        if (allFile[i].split(folderName)[1].indexOf('/') === -1) {
          filesInFolderObject.push(allFile[i]);
          allFile.splice(i, 1);
          i--;
        } else if (
          allFile[i].split(folderName)[1].indexOf('/') ===
          allFile[i].split(folderName)[1].length - 1
        ) {
          foldersInFolderObject.push(allFile[i]);
          allFile.splice(i, 1);
          i--;
        }
      }
    }
    folderObject = {
      files: filesInFolderObject,
      folders: foldersInFolderObject
    };
    folderStructure = {
      ...folderStructure,
      [folderName]: folderObject
    };
  }
  return folderStructure;
};
export default makeFodlerStructure;
