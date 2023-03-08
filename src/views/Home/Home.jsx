import { Component } from 'react';
import PlacesList from '../../components/PlacesList/PlacesList';
import placesJSON from '../../data/places.json';

export default class Home extends Component {
  state = {
    places: placesJSON,
    search: '',
  }

  onDeletePlace = (placeIdToDelete) => {
    this.setState({ places: this.state.places.filter(place => place.id !== placeIdToDelete) })
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

  render() {
    const { search } = this.state;
    return (
      <div className="Home">
        <h1>Lugares a descubrir</h1>

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