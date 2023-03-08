import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PlacesList from '../../components/PlacesList/PlacesList';
import placesJSON from '../../data/places.json';

export default class Home extends Component {
  state = {
    places: placesJSON,
    search: '',
    name: '',
    country: '',
    description: '',
    img: '',
    rating: 5,
    showAddPlace: true,
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

  onSubmitPlace = (event) => {
    event.preventDefault();
    const { places, name, description, img, rating, country } = this.state;

    const newPlace = {
      id: uuidv4(),
      name, description, img, rating, country
    }

    this.setState({ places: [newPlace, ...places] })
  }

  toggleShowAddPlaceForm = () => {
    this.setState(prevState => {
      return {
        showAddPlace: !prevState.showAddPlace
      }
    })
  }

  render() {
    const { search, name, country, description, img, rating, showAddPlace } = this.state;
    return (
      <div className="Home">
        <h1>Lugares a descubrir</h1>

        <button onClick={this.toggleShowAddPlaceForm} className="btn btn-primary mb-2">
          {showAddPlace ? 'Hide' : 'Show'} add place form
        </button>

        {showAddPlace
          ? (
            <>
            <h3>Add a new place</h3>
            <form onSubmit={this.onSubmitPlace}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  value={name} onChange={this.onChange} name="name" required
                  className="form-control" id="name" placeholder="Madrid"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="country" className="form-label">Country</label>
                <input
                  required
                  value={country} onChange={this.onChange} name="country"
                  className="form-control" id="country" placeholder="España"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  required
                  value={description}
                  onChange={this.onChange}
                  name="description"
                  className="form-control"
                  id="exampleFormControlTextarea1" rows="3"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="img" className="form-label">Image</label>
                <input
                  required
                  type="url"
                  value={img} onChange={this.onChange} name="img"
                  className="form-control" id="img" placeholder="http://placeholder.com/image.png"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="rating" className="form-label">Rating</label>
                <input
                  required
                  type="number"
                  min={0}
                  max={10}
                  value={rating} onChange={this.onChange} name="rating"
                  className="form-control" id="rating"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            </>
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