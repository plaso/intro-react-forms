import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddPlaceForm from '../../components/AddPlaceForm/AddPlaceForm';
import PlacesList from '../../components/PlacesList/PlacesList';
import placesJSON from '../../data/places.json';

export default class Home extends Component {
  state = {
    places: localStorage.getItem('places') ? JSON.parse(localStorage.getItem('places')) : placesJSON,
    search: '',
    showAddPlace: true,
  }

  onDeletePlace = (placeIdToDelete) => {
    const newPlaces = this.state.places.filter(place => place.id !== placeIdToDelete)
    this.setState({ places: newPlaces })
    localStorage.setItem('places', JSON.stringify(newPlaces));
  }

  onChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value })
  }

  getPlacesToRender = () => {
    const { places, search } = this.state;

    if (search) {
      return places.filter(place => place.name.toLowerCase().includes(search.toLowerCase()))
    }

    return places
  }

  onSubmitPlace = (place) => {
    const { places } = this.state;
    const newPlace = {
      id: uuidv4(),
      ...place
    }
    
    const newPlaces = [newPlace, ...places]
    localStorage.setItem('places', JSON.stringify(newPlaces))

    this.setState({ places: newPlaces })
  }

  toggleShowAddPlaceForm = () => {
    this.setState(prevState => {
      return {
        showAddPlace: !prevState.showAddPlace
      }
    })
  }

  render() {
    const { search, showAddPlace } = this.state;
    return (
      <div className="Home">
        <h1>Lugares a descubrir</h1>

        <button onClick={this.toggleShowAddPlaceForm} className="btn btn-primary mb-2">
          {showAddPlace ? 'Hide' : 'Show'} add place form
        </button>

        {showAddPlace
          ? (
            <AddPlaceForm onSubmitPlace={this.onSubmitPlace} />
          ) : null
        }

        <hr />

        <input
          name="search"
          // onChange={(event) => this.onChange(event)} equivalente a lo de abajo
          onChange={this.onChange}
          value={search}
          className="form-control mb-4" type="search"
          placeholder="Search" aria-label="Search"
        />

        <PlacesList places={this.getPlacesToRender()} onDeletePlace={this.onDeletePlace} />
      </div>
    );
  }
}