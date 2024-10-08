import { useState } from "react";
import { load } from "../../storage/load";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { updateBooking } from "../../api/bookings/update";
import { deleteBooking } from "../../api/bookings/delete";
import { Link } from "react-router-dom";

// Card displaying booking details
// Is used in the profile page under the "Your bookings" section

const schema = yup.object().shape({
  dateFrom: yup.date().required(),
  dateTo: yup.date().required(),
  guests: yup.number().required(),
});

async function onDelete(id) {
  deleteBooking(id);
}

function BookingCard({ booking }) {
  const [editMode, setEditMode] = useState(false);
  const [updateError, setUpdateError] = useState([]);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });

  const dateFrom = new Date(booking.dateFrom)
    .toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "UTC",
    })
    .replace(/\//g, "-");
  const dateTo = new Date(booking.dateTo)
    .toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "UTC",
    })
    .replace(/\//g, "-");

  const readableDateFrom = new Date(dateFrom).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    timeZone: "UTC",
  });

  const readableDateTo = new Date(dateTo).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    timeZone: "UTC",
  });

  function onUpdatePost(data) {
    updateBooking(data, booking.id).then((data) => {
      if (data.data) {
        setUpdateSuccess(true);
        setEditMode(false);
      } else if (data.errors) {
        console.log("Error", data.errors);
        setUpdateError(data.errors[0].message);
      }
    });
  }

  return (
    <div className="flex flex-col md:flex-row mb-10 bg-white drop-shadow-2xl overflow-hidden rounded-xl">
      <Link to={"/venue/id?" + booking.venue.id}>
        <img
          src={booking.venue.media[0].url}
          alt={booking.venue.media[0].alt}
          className="h-56 md:h-full md:w-60 object-cover"
        />
      </Link>
      {editMode ? (
        <div className="p-5">
          <form onSubmit={handleSubmit(onUpdatePost)} className="flex flex-col">
            <Link to={"/venue/" + booking.venue.id}>
              <p className="text-xl mb-3">{booking.venue.name}</p>
            </Link>
            <span className="flex justify-between items-center w-60 mb-3">
              <label htmlFor="dateFrom">from:</label>
              <input
                {...register("dateFrom")}
                type="date"
                defaultValue={dateFrom}
                className="w-auto border border-neutral-400 p-1 rounded-md"
              />
            </span>
            <span className="flex justify-between items-center w-60 mb-3">
              <label htmlFor="dateTo">to:</label>
              <input
                {...register("dateTo")}
                type="date"
                defaultValue={dateTo}
                className="w-auto border border-neutral-400 p-1 rounded-md"
              />
            </span>
            <span className="flex justify-between items-center w-60 mb-3">
              <p>Guests:</p>
              <input
                {...register("guests")}
                type="number"
                defaultValue={booking.guests}
                className=" w-16 border border-neutral-400 py-1 px-2 rounded-md"
              />
            </span>
            <span className="flex justify-between">
              <button
                type="submit"
                className="text-green-600 border-2 border-green-600 rounded-md py-2 px-4 hover:bg-green-600 hover:text-white"
              >
                Update Booking
              </button>
              <button
                className="fa-regular fa-x border-2 border-neutral-600 p-3 rounded"
                onClick={() => setEditMode(false)}
              ></button>
            </span>
            <p className="text-red-600 mt-3">{updateError && updateError}</p>
          </form>
        </div>
      ) : (
        <div className="p-5">
          <Link to={"/venue/id?" + booking.venue.id}>
            <p className="text-xl mb-3">{booking.venue.name}</p>
          </Link>
          <span className="flex justify-between w-60 mb-3 h-6">
            <p>from:</p>
            <p>{readableDateFrom}</p>
          </span>
          <span className="flex justify-between w-60 mb-3 h-6">
            <p>to:</p>
            <p>{readableDateTo}</p>
          </span>
          <p className="mb-3">Guests: {booking.guests}</p>
          <div className="flex gap-4">
            <button
              onClick={() => onDelete(booking.id)}
              className="fa-regular fa-trash-can text-red-600 py-2 px-4 border-2 border-red-600 rounded-md hover:bg-red-600 hover:text-white"
            ></button>
            <button
              onClick={() => setEditMode(true)}
              className="fa-regular fa-edit py-2 px-3 border-2 border-black rounded-md hover:bg-black hover:text-white"
            ></button>
            <p className="text-green-600 mt-3">
              {updateSuccess && "Update successful"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
export default BookingCard;
