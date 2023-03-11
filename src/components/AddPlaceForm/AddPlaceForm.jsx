import { Component } from 'react';
import FormControl from '../misc/FormControl/FormControl';
import Input from '../misc/Input/Input';
import { REQUIRED_FIELD, REQUIRED_LENGTH, URL_VALID } from '../../utils/errors'
import { isRequiredValidator, lengthValidator, urlValidator } from '../../utils/validators'

const placeSchema = {
  name: (value) => {
    if (isRequiredValidator(value)) {
      return REQUIRED_FIELD;
    }
    if (lengthValidator(value, 4)) {
      return REQUIRED_LENGTH
    }
  },
  country: (value) => {
    if (isRequiredValidator(value)) {
      return REQUIRED_FIELD
    }
  },
  description: (value) => {
    if (isRequiredValidator(value)) {
      return REQUIRED_FIELD
    }
    if (lengthValidator(value)) {
      return 'Description must be at least 50 letters long'
    }
  },
  img: (value) => {
    if (isRequiredValidator(value)) {
      return REQUIRED_FIELD
    }
    if (urlValidator(value)) {
      return URL_VALID;
    }
  },
  rating: (value) => {
    if (isRequiredValidator(value)) {
      return REQUIRED_FIELD
    }
  },
}

const INITIAL_VALUES = {
  name: '',
  country: '',
  description: '',
  img: '',
  rating: 5,
}

export default class AddPlaceForm extends Component {
  state = {
    values: {...INITIAL_VALUES},
    errors: {},
  }

  onChange = (event) => {
    const { name, value } = event.target;

    // this.setState({
    //   values: {
    //     ...values,
    //     [name]: value
    //   }
    // })
    this.setState(prevState => {
      return {
        values: {
          ...prevState.values,
          [name]: value
        }
      }
    })
  }

  onSubmit = (event) => {
    event.preventDefault()

    if (this.isValidForm()) {
      this.props.onSubmitPlace(this.state.values) // Prop del padre para añadir un nuevo place al listado
      this.setState({ values: {...INITIAL_VALUES} }) // Resetear el form
    }
  }

  isValidForm = () => {
    const { values } = this.state;
    const newErrors = {};

    Object.keys(values).forEach(valueKey => {
      const error = placeSchema[valueKey](values[valueKey]) // Ejecuto el validador para cada uno de los campos

      if (error) {
        newErrors[valueKey] = error
      }
    })

    const hasErrors = Object.keys(newErrors).length > 0
    if (hasErrors) {
      this.setState({ errors: newErrors })
    }

    return !hasErrors;
  }

  render() {
    const { values, errors } = this.state;

    return (
      <div className="AddPlaceForm">
        <h3>Add a new place</h3>
        <form onSubmit={this.onSubmit}>
          <FormControl text="Name" htmlFor="name" error={errors.name}>
            <Input
              name="name"
              id="name"
              value={values.name}
              onChange={this.onChange}
              placeholder="Bilbao"
              error={errors.name}
            />
          </FormControl>
          {/* <div className="mb-3">
            <label htmlFor="country" className="form-label">Country</label>
            <input
              value={values.country} onChange={this.onChange} name="country"
              className="form-control" id="country" placeholder="España"
            />
          </div> */}
          <FormControl text="Country" htmlFor="country" error={errors.country}>
            <Input
              name="country"
              id="country"
              value={values.country}
              onChange={this.onChange}
              placeholder="España"
              error={errors.country}
            />
          </FormControl>
          <FormControl text="Description" htmlFor="description" error={errors.description}>
            <Input
              name="description"
              id="description"
              type="textarea"
              value={values.description}
              onChange={this.onChange}
              error={errors.description}
            />
          </FormControl>
          <FormControl text="Image" htmlFor="img" error={errors.img}>
            <Input
              name="img"
              id="img"
              value={values.img}
              onChange={this.onChange}
              placeholder="http://placeholder.com/image.jpg"
              error={errors.img}
            />
          </FormControl>
          <FormControl text="Rating" htmlFor="rating" error={errors.rating}>
            <Input
              name="rating"
              id="rating"
              type="number"
              min={0}
              max={10}
              value={values.rating}
              onChange={this.onChange}
              error={errors.rating}
            />
          </FormControl>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    )
  }
}