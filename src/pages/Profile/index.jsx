import React, { useState } from "react";

function Profile() {
  const [displayBookings, setDisplayBookings] = useState(false);
  const [displayVenues, setDisplayVenues] = useState(false);

  return (
    <div className="h-screen">
      <h1 className="text-center text-3xl pt-20 mb-10">Your Profile</h1>
      <div className="flex justify-center items-center gap-4">
        <div className="flex flex-row border border-white rounded-xl overflow-hidden bg-white/25 drop-shadow-3xl backdrop-blur-lg">
          <img
            src="https://randomuser.me/api/portraits"
            className="w-52 bg-green-300"
          />
          <div className="m-4">
            <p className="text-sm text-neutral-700">Name:</p>
            <p className="font-semibold text-lg mb-2">Niklas Ferling</p>
            <p className="text-sm text-neutral-700">Email:</p>
            <p className="font-semibold text-lg mb-2">
              niklas.ferling@gmail.com
            </p>
            <form>
              <p className="text-sm text-neutral-700 mb-2">Avatar:</p>
              <input
                type="text"
                className="mb-3 p-2 border border-green-200 rounded-xl w-96"
                placeholder="Enter URL"
              />
              <p className="text-sm text-neutral-700">Venue Manager:</p>
              <div className="flex gap-2">
                <input type="radio" />
                <p className="font-semibold text-lg">Yes</p>
                <input type="radio" className="ml-2" />
                <p className="font-semibold text-lg">No</p>
              </div>
              <button
                type="submit"
                className="mt-3 bg-gradient-to-br from-teal-300 via-teal-100 to-teal-200 drop-shadow-3xl border border-teal-300 px-4 py-2 rounded-lg"
              >
                Update Details
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              setDisplayBookings(!displayBookings);
              setDisplayVenues(false);
            }}
            className="p-4 bg-gradient-to-bl from-green-200 via-teal-50 to-green-200 border border-white rounded-lg "
          >
            <i className="fa-solid fa-bed"></i>
            <p>Your Bookings</p>
          </button>
          <button
            onClick={() => {
              setDisplayVenues(!displayVenues);
              setDisplayBookings(false);
            }}
            className="p-4 bg-gradient-to-bl from-green-200 via-teal-50 to-green-200 border border-white rounded-lg "
          >
            <i className="fa-solid fa-building"></i>
            <p>Your Venues</p>
          </button>
        </div>
      </div>
      {displayBookings ? <h3>Your Bookings</h3> : null}
      {displayVenues ? <h3>Your Venues</h3> : null}
    </div>
  );
}
export default Profile;