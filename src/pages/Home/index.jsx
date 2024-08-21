import SearchForm from "../../components/SearchForm";

function Home() {
  return (
    <div className="h-screen">
      <h1 className="pt-40 mb-10 text-3xl text-center">Where to?</h1>
      <SearchForm />
      <h2 className="text-xl text-center">Browse Venues</h2>
    </div>
  );
}
export default Home;
