const fs = require('fs');
const uuid = require('uuid/v4');
const path = require('path');

const GALERIA_PATH = path.join(__dirname, '../galeria');

const deleteFile = file => {
  return new Promise((resolve, reject) => {
    fs.unlink(path.join(GALERIA_PATH, file), err => {
      if (err) reject(new Error(`Error al eliminar ${path}`));
      resolve('archivo eliminado');
    });
  });
};

const createDirectory = () => {
  return new Promise((resolve, reject) => {
    const id = uuid();
    console.log(id, GALERIA_PATH);
    fs.mkdir(path.join(GALERIA_PATH, id), err => {
      if (err) reject(new Error('carpeta ya existe'));
      resolve({
        id,
        path: `/galeria/${id}`
      });
    });
  });
};

const deleteDirectory = id => {
  return new Promise((resolve, reject) => {
    fs.rmdir(path.join(GALERIA_PATH, id), err => {
      if (err) reject(new Error('no se pudo borrar la carpeta'));
      resolve('carpeta borrada');
    });
  });
};

module.exports = {
  deleteFile,
  createDirectory,
  deleteDirectory
};
