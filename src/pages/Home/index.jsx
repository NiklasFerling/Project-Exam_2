import SearchForm from "../../components/SearchForm";
import Venues from "../../components/Venues";

function Home() {
  return (
    <div className="min-h-screen mb-10">
      <h1 className="pt-40 mb-10 text-3xl text-center">Where to?</h1>
      <SearchForm />
      <h2 className="text-xl text-center mb-16">Browse Venues</h2>
      <Venues />
    </div>
  );
}
export default Home;
