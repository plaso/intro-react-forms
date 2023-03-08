import { Component } from 'react';
import PlacesList from '../../components/PlacesList/PlacesList';
import placesJSON from '../../data/places.json';

export default class Home extends Component {
  state = {
    places: placesJSON,
  }

  render() {
    const { places } = this.state;
    return (
      <div className="Home">
        <h1>Lugares a descubrir</h1>

        <PlacesList places={places} />
      </div>
    );
  }
}