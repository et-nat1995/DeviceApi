import * as FileSystem from 'expo-file-system'
import { insertPlace, fetchPlaces, deletePlaceDB } from '../helper/db'
import ENV from '../env'

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';
export const DELETE_PLACE = 'DELETE_PLACE';

export const addPlace = (title, image, location) => async dispatch => {
  const fileName = image.split('/').pop();
  const newPath = FileSystem.documentDirectory + fileName;

  const address = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`
    );

  if (!address.ok) throw new Error('Something went wrong');

  const resAddress = await address.json();
  if (!resAddress.results) throw new Error('Something went wrong');

  const cleanAddress = resAddress.results[0].formatted_address;

  try {
    await FileSystem.moveAsync({
      from: image,
      to: newPath
    });
    const dbResult = await insertPlace(title, newPath, cleanAddress, location.lat, location.lng)
    dispatch({
      type: ADD_PLACE,
      placeData: {
        id: dbResult.insertId,
        title: title,
        image: newPath,
        adddress: cleanAddress,
        coords: {
          lat: location.lat,
          lng: location.lng
        }
      }
    });
  }
  catch (err) {
    console.log(err)
  }
};

export const deletePlace = (id) => async (dispatch, getState) => {
  const state = getState().places.places;
  const updatedState = state.filter(item => item.id !== id);
  try {
    await deletePlaceDB(id);
    dispatch({
      type: DELETE_PLACE,
      updatedPlaces: updatedState
    })
  } catch (err) {
    throw new Error('Something broke')
  }
}

export const loadPlaces = () => async dispatch => {
  try {
    const allPlaces = await fetchPlaces();
    dispatch({
      type: SET_PLACES,
      places: allPlaces.rows._array
    })
  }
  catch (err) {
    console.log(err)
  }
}
