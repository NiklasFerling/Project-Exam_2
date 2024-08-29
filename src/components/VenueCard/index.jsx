function VenueCard({ venue }) {
  console.log(venue.media[0].url);

  function truncateText(text, maxLength = 25) {
    return text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`;
  }

  return (
    <div className="flex-col w-72 overflow-hidden border rounded-xl mb-10 font-semibold">
      <img
        src={venue.media[0].url}
        alt={venue.media[0].alt}
        className="w-full h-96 object-cover"
      />
      <div className="p-3 flex-col">
        <span className="flex justify-between">
          <h3 className="text-lg">{truncateText(venue.name)}</h3>
          <span className="flex gap-1 ml-4 items-center">
            <i className="fa-solid fa-star"></i>
            <p>{venue.rating}</p>
          </span>
        </span>
        <p className="text-neutral-600">
          <i className="fa-solid fa-location-dot mr-1"></i>
          {venue.location.city}
        </p>
        <p className="text-xl mt-5">{venue.price}kr</p>
      </div>
    </div>
  );
}
export default VenueCard;
