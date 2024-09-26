// Card displaying details for bookings on your own venues
// Is used in the venue page when you are the owner of the venue

function ManagerBookingCard({ booking }) {
  const dateFrom = new Date(booking.dateFrom)
    .toLocaleDateString("en-CA", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      timeZone: "UTC",
    })
    .replace(/\//g, "-");
  const dateTo = new Date(booking.dateTo)
    .toLocaleDateString("en-CA", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      timeZone: "UTC",
    })
    .replace(/\//g, "-");

  return (
    <div
      key={booking.id}
      className="flex flex-col md:flex-row gap-10 bg-white p-5 rounded-xl mb-10 drop-shadow-2xl items-center"
    >
      <img
        src={booking.customer.avatar.url}
        alt={booking.customer.avatar.alt}
        className="h-40 w-40 rounded-full object-cover"
      />
      <div>
        <p className="text-neutral-500 text-sm">Customer:</p>
        <p className="text-2xl mb-3">{booking.customer.name}</p>
        <span className="flex gap-2">
          <p className="text-neutral-600">from:</p>
          <p>{dateFrom}</p>
        </span>
        <span className="flex gap-2 mb-3">
          <p className="text-neutral-600">to:</p>
          <p>{dateTo}</p>
        </span>
        <span className="flex gap-2">
          <p className="text-neutral-600">guests:</p>
          <p>{booking.guests}</p>
        </span>
      </div>
    </div>
  );
}
export default ManagerBookingCard;
