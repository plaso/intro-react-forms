const PlacesItem = ({ id,name, description, country, img, rating, onDelete }) => {
  const handleRatingBackground = () => {
    if (rating >= 8) {
      return 'text-bg-primary';
    } else if (rating >= 7.5) {
      return 'text-bg-info';
    }
    return ''
  }

  return (
    // <div className="card" style="width: 18rem;">
    <div className="card">
      <img src={img} className="card-img-top" alt="..." />
      <div className={`card-body ${handleRatingBackground()}`}>
        <h5 className="card-title">{name}</h5>
        <p className="card-text"><strong>Country:</strong> {country}</p>
        <p className="card-text">{description}</p>
        {onDelete
          ? <button onClick={() => onDelete(id)} className="btn btn-danger">Delete</button>
          : null
        }
      </div>
    </div>
  );
}

export default PlacesItem;