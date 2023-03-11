import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ClipLoader from 'react-spinners/ClipLoader';
import AddPlaceForm from '../../components/AddPlaceForm/AddPlaceForm';
import PlacesList from '../../components/PlacesList/PlacesList';
import placesJSON from '../../data/places.json';
import Select from '../../components/misc/Select/Select';
import { countries } from '../../utils/constants';

const getFakeApiPlaces = () => {
  return localStorage.getItem('places') ? JSON.parse(localStorage.getItem('places')) : placesJSON
}

const getPlaces = (country) => {
  console.log(country)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const allPlaces = getFakeApiPlaces()
      resolve(country
        ? allPlaces.filter(place => place.country === country)
        : allPlaces
      )
    }, 2000);
  })
}

export default class Home extends Component {
  state = {
    places: [],
    loading: true,
    search: '',
    countryFilter: '',
    showAddPlace: false,
  }

  componentDidMount() {
    this.fetchPlaces()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.countryFilter !== this.state.countryFilter) { // quiere decir que ese estado ha cambiado, por lo que tengo que traerme nuevos places
      this.setState({ loading: true }, () => {
        this.fetchPlaces()
      })
    }
  }

  fetchPlaces = () => {
    getPlaces(this.state.countryFilter)
      .then(places => {
        this.setState({ places: places, loading: false })
      })
  }

  onDeletePlace = (placeIdToDelete) => {
    const newPlaces = this.state.places.filter(place => place.id !== placeIdToDelete)
    this.setState({ places: newPlaces })
    
    // Esto es para que funcione la API no worries
    localStorage.setItem('places', JSON.stringify(getFakeApiPlaces().filter(place => place.id !== placeIdToDelete)));
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
    const { search, showAddPlace, loading, countryFilter } = this.state;

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
          disabled={loading}
        />

        <div className="my-4">
          <Select disabled={loading} options={countries} value={countryFilter} onChange={this.onChange} name="countryFilter" />
        </div>
        {loading
          ? (
            <div className="text-center">
              <ClipLoader size={60} color={'blue'} />
            </div>
          ) : (
            <PlacesList places={this.getPlacesToRender()} onDeletePlace={this.onDeletePlace} />
          )
        }
      </div>
    );
  }
}