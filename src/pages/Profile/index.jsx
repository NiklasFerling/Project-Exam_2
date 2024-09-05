import { useEffect, useState } from "react";
import { logout } from "../../api/auth/logout";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { load } from "../../storage/load";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { updateProfile } from "../../api/profile/update";
import { fetchBookings } from "../../api/bookings/read";
import { TailSpin } from "react-loader-spinner";

const schema = yup.object().shape({
  avatar: yup.string().required("Avatar is required"),
  venueManager: yup.boolean(),
});

function Profile() {
  const [displayBookings, setDisplayBookings] = useState(false);
  const [displayVenues, setDisplayVenues] = useState(false);
  const [profile, setProfile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [bookings, setBookings] = useState([]);
  const { setIsLoggedIn } = useContext(AuthContext);
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
    updateProfile(data).then(() => {
      if (data) {
        setSuccess(true);
      }
    });
  }

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  async function fetchProfile() {
    try {
      setLoading(true);
      const profile = load("profile");
      const apiKey = load("API_KEY");

      const response = await fetch(
        "https://v2.api.noroff.dev/holidaze/profiles/" + profile.name,
        {
          headers: {
            Authorization: `Bearer ${profile.accessToken}`,
            "X-Noroff-API-Key": apiKey,
          },
        }
      );
      const data = await response.json();
      console.log(data);

      setProfile(data.data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(true);
      setLoading(false);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfile();
    fetchBookings().then((data) => {
      setBookings(data.data);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <TailSpin color="rgb(74 222 128)" />
      </div>
    );
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-center text-3xl pt-20 mb-10">Your Profile</h1>
      <div className="flex justify-center items-center gap-4 flex-col md:flex-row">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <img
            src={profile.avatar.url}
            className="h-40 w-40 border-0 rounded-full bg-green-200/50 object-cover"
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
                defaultValue={profile.avatar.url || ""}
                className="p-2 rounded-xl w-96 mb-3"
              />
              <p>{errors.avatar?.message}</p>
              <label
                htmlFor="venueManager"
                className="text-sm text-neutral-700"
              >
                Venue Manager:
              </label>
              <div className="flex gap-2">
                <select
                  {...register("venueManager")}
                  className="py-2 px-4 rounded-lg mt-2"
                >
                  <option value={profile.venueManager}>
                    {profile.venueManager ? "Yes" : "No"}
                  </option>
                  <option value={profile.venueManager ? "false" : "true"}>
                    {profile.venueManager ? "No" : "Yes"}
                  </option>
                </select>
              </div>
              <span className="flex justify-between">
                <button
                  type="submit"
                  className="mt-3 bg-teal-500 text-white px-4 py-2 rounded-lg"
                >
                  Update Details
                </button>
                {success ? (
                  <p className="text-green-500">
                    Profile updated successfully
                    <i className="fa-solid fa-check ml-2"></i>
                  </p>
                ) : null}
              </span>
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
      {displayBookings ? (
        <div>
          {bookings.map((booking) => (
            <div key={booking.id}>
              <p>{booking.name}</p>
            </div>
          ))}
        </div>
      ) : null}
      {displayVenues ? <h3>Your Venues</h3> : null}
    </div>
  );
}
export default Profile;
