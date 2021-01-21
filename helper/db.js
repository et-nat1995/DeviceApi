import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('places.db');

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NO NULL, imageUri TEXT NOT NULL, adress TEXT NO NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      )
    })
  })
  return promise;
}

export const fetchPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM places;',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      )
    })
  })
  return promise;
}

export const insertPlace = (title, imageUri, address, lat, lng) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO  places (title, imageUri, adress, lat, lng) VALUES (?, ?, ?, ?, ? );',
        [title, imageUri, address, lat, lng],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      )
    })
  })
  return promise;
}

export const deletePlaceDB = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM places WHERE id = ?;',
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      )
    })
  })
  return promise;
}