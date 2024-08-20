function Profile() {
  return (
    <div className="h-screen">
      <h1 className="text-center text-3xl mt-20 mb-10">Your Profile</h1>
      <div className="flex justify-center items-center gap-4">
        <div className="flex flex-row">
          <img src="https://randomuser.me/api/portraits" />
          <div>
            <p>Name:</p>
            <p>Niklas Ferling:</p>
            <p>Email:</p>
            <p>niklas.ferling@gmail.com</p>
            <p>Venue Manager:</p>
            <form>
              <input type="radio" />
              <input type="radio" />
            </form>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <button className="p-4 bg-gradient-to-bl from-green-200 via-teal-50 to-green-200 border border-green-200 rounded-lg ">
            <i className="fa-solid fa-bed"></i>
            <p>Your Bookings</p>
          </button>
          <button className="p-4 bg-gradient-to-bl from-green-200 via-teal-50 to-green-200 border border-green-200 rounded-lg ">
            <i className="fa-solid fa-building"></i>
            <p>Your Venues</p>
          </button>
        </div>
      </div>
    </div>
  );
}
export default Profile;
