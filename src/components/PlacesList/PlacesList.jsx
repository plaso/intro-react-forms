import PlacesItem from "../PlacesItem/PlacesItem";

const PlacesList = ({ places }) => {
  const hasPlaces = places && places.length > 0;

  return (
    <div className={`PlacesList ${hasPlaces ? 'row row-cols-1 row-cols-md-2 g-4' : ''}`}>
      {places && places.length > 0 
        ? places.map(place => (
          <div key={place.id} className="col">
            <PlacesItem
              // name={place.name}
              // description={place.description}
              {...place}
            />
          </div>
        )) 
        : (
          <p>There are no places to show</p>
        )}
    </div>
  )
}

export default PlacesList;