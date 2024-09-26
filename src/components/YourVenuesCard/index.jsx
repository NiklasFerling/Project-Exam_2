import { Link } from "react-router-dom";
import { deleteVenue } from "../../api/venues/delete";

function truncateText(text, maxLength = 25) {
  return text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`;
}

function onDelete(id) {
  deleteVenue(id);
}

function YourVenuesCard({ venue }) {
  return (
    <div className="border-none rounded-xl overflow-hidden drop-shadow-2xl bg-white mb-10">
      <img
        src={venue.media[0].url ? venue.media[0].url : ""}
        alt={venue.media[0].alt ? venue.media[0].alt : ""}
        className="w-full h-56 md:h-96 object-cover bg-green-100"
      />
      <div className="py-3 px-5 flex-col bg-white">
        <span className="flex justify-between mb-1">
          <h3 className="text-xl font-semibold">{truncateText(venue.name)}</h3>
          <button onClick={() => onDelete(venue.id)}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </span>
        <p className="text-neutral-600 text-sm">
          {venue.location.city && (
            <span>
              <i className="fa-solid fa-location-dot mr-1"></i>
              {venue.location.city}
            </span>
          )}
          <i className="fa-solid fa-star ml-3 mr-1"></i>
          {venue.rating}
        </p>
        <span className="flex justify-between mt-5">
          <p className="text-xl">{venue.price}kr</p>
          <Link to={"/venue/id?" + venue.id}>
            <p className="text-neutral-600">View Venue Details &rarr;</p>
          </Link>
        </span>
      </div>
    </div>
  );
}
export default YourVenuesCard;
