import { ADD_PLACE, SET_PLACES, DELETE_PLACE} from './places-actions';
import Place from '../models/place';

const initialState = {
  places: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.image,
        action.placeData.adddress,
        action.placeData.coords.lat,
        action.placeData.coords.lng
      );
      return {
        places: state.places.concat(newPlace)
      };
    case SET_PLACES:
      return {
        places: action.places.map(item => new Place(item.id.toString(), item.title, item.imageUri, item.adress, item.lat, item.lng ))
      }
    case DELETE_PLACE:
      return {
        places: action.updatedPlaces
      }
    default:
      return state;
  }
};
