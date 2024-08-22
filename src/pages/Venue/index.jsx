import Calendar from "../../components/Calendar";

function Venue() {
  return (
    <div className="h-screen">
      <div className="flex justify-center border border-white rounded-xl overflow-hidden bg-green-200/25 drop-shadow-3xl backdrop-blur-lg">
        <img src="#" alt="#" className="bg-green-300 w-96" />
        <div className="p-5">
          <h1 className="text-3xl text-center mb-4">Venue Name</h1>
          <span className="flex mb-5 items-center">
            <i className="fa-solid fa-star mr-1"></i>
            <p className="mr-4">4</p>
            <p>City, Country</p>
          </span>
          <p className="mb-5">3424kr/night</p>
          <form className="flex gap-2 mb-5">
            <input type="date" className="border border-black rounded-xl p-1" />
            <p>-</p>
            <input type="date" className="border border-black rounded-xl p-1" />
            <button className="border border-black rounded-xl p-1">Book</button>
          </form>
          <span className="flex gap-2 items-center justify-center">
            <div className="h-4 w-4 bg-red-600 rounded-md"></div>
            <p>Not Available</p>
          </span>
          <Calendar />
        </div>
      </div>
    </div>
  );
}
export default Venue;
