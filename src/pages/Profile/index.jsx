import { useEffect, useState } from "react";
import { logout } from "../../api/auth/logout";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { load } from "../../storage/load";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { fetchProfile } from "../../api/profile/read";
import { updateProfile } from "../../api/profile/update";

const schema = yup.object().shape({
  avatar: yup.string().required(),
  venueManager: yup.boolean(),
});

function Profile() {
  const [displayBookings, setDisplayBookings] = useState(false);
  const [displayVenues, setDisplayVenues] = useState(false);
  const [isManager, setIsManager] = useState(null);
  const { setIsLoggedIn } = useContext(AuthContext);
  const profile = load("profile");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function onLogout() {
    logout();
    setIsLoggedIn(false);
    window.location.href = "/";
  }

  function onProfileUpdate(data) {
    updateProfile(data);
  }

  useEffect(() => {
    fetchProfile().then((data) => {
      setIsManager(data.data.venueManager);
    });
  }, [setIsManager]);

  return (
    <div className="min-h-screen">
      <h1 className="text-center text-3xl pt-20 mb-10">Your Profile</h1>
      <div className="flex justify-center items-center gap-4 flex-col md:flex-row">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <img
            src={profile.avatar.url}
            className="h-40 w-40 border-0 rounded-full bg-green-300"
          />
          <div className="p-4 border border-white rounded-xl bg-white/25 drop-shadow-3xl backdrop-blur-lg">
            <p className="text-sm text-neutral-700">Name:</p>
            <p className="font-semibold text-lg mb-2">{profile.name}</p>
            <p className="text-sm text-neutral-700">Email:</p>
            <p className="font-semibold text-lg mb-2">{profile.email}</p>
            <form onSubmit={handleSubmit(onProfileUpdate)}>
              <p className="text-sm text-neutral-700 mb-2">Avatar:</p>
              <input
                {...register("avatar")}
                placeholder={profile.avatar.url}
                className="mb-3 p-2 border border-green-200 rounded-xl w-96"
              />
              <p className="text-sm text-neutral-700">Venue Manager:</p>
              <div className="flex gap-2">
                <select {...register("venueManager")}>
                  <option value={isManager}>{isManager ? "Yes" : "No"}</option>
                  <option value={isManager ? "false" : "true"}>
                    {isManager ? "No" : "Yes"}
                  </option>
                </select>
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
        <div className="flex flex-row md:flex-col gap-3">
          <button
            onClick={() => {
              setDisplayBookings(!displayBookings);
              setDisplayVenues(false);
            }}
            className="p-4 bg-gradient-to-bl from-green-200/50 via-teal-50 to-green-200/50 border border-white rounded-lg"
          >
            <i className="fa-solid fa-bed"></i>
            <p>Your Bookings</p>
          </button>
          <button
            onClick={() => {
              setDisplayVenues(!displayVenues);
              setDisplayBookings(false);
            }}
            className="p-4 bg-gradient-to-bl from-green-200/50 via-teal-50 to-green-200/50 border border-white rounded-lg"
          >
            <i className="fa-solid fa-building"></i>
            <p>Your Venues</p>
          </button>
          <button
            onClick={onLogout}
            className="p-4 bg-gradient-to-bl from-red-200/50 via-red-50 to-red-200/50 border border-white rounded-lg"
          >
            <i className="fa-solid fa-sign-out"></i>
            <p>Logout</p>
          </button>
        </div>
      </div>
      {displayBookings ? <h3>Your Bookings</h3> : null}
      {displayVenues ? <h3>Your Venues</h3> : null}
    </div>
  );
}
export default Profile;
