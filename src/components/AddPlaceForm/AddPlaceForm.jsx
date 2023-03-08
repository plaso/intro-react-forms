import { Component } from 'react';

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
    errors: {

    }
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

    this.props.onSubmitPlace(this.state.values)
    this.setState({ values: {...INITIAL_VALUES} })
  }

  render() {
    const { values } = this.state;

    return (
      <div className="AddPlaceForm">
        <h3>Add a new place</h3>
        <form onSubmit={this.onSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              value={values.name} onChange={this.onChange} name="name" required
              className="form-control" id="name" placeholder="Madrid"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="country" className="form-label">Country</label>
            <input
              required
              value={values.country} onChange={this.onChange} name="country"
              className="form-control" id="country" placeholder="España"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              required
              value={values.description}
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
              value={values.img} onChange={this.onChange} name="img"
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
              value={values.rating} onChange={this.onChange} name="rating"
              className="form-control" id="rating"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    )
  }
}