function VenueCard({ venue }) {
  console.log(venue.media[0].url);

  function truncateText(text, maxLength = 25) {
    return text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`;
  }

  return (
    <div className="flex-col w-40 md:w-72 overflow-hidden border rounded-xl mb-10 font-semibold bg-white drop-shadow-3xl hover:scale-105 transition-transform">
      <img
        src={venue.media[0].url}
        alt={venue.media[0].alt}
        className="w-full h-56 md:h-96 object-cover"
      />
      <div className="p-3 flex-col bg-white">
        <span className="flex justify-between">
          <h3 className="text-md">{truncateText(venue.name)}</h3>
          <span className="flex gap-1 ml-4 items-center text-sm">
            <i className="fa-solid fa-star"></i>
            <p>{venue.rating}</p>
          </span>
        </span>
        <p className="text-neutral-600 text-sm">
          <i className="fa-solid fa-location-dot mr-1"></i>
          {venue.location.city}
        </p>
        <p className="text-xl mt-5">{venue.price}kr</p>
      </div>
    </div>
  );
}
export default VenueCard;
