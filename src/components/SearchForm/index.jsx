import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import { VenuesContext } from "../../contexts/venuesContext";

const schema = yup.object().shape({
  search: yup.string(),
});

function SearchForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { setVenues } = useContext(VenuesContext);

  async function onSubmit(data) {
    if (data.search !== "") {
      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/venues/search?q=${data.search} `
        );
        const json = await response.json();
        if (json.data) {
          console.log(json.data);
          setVenues(json);
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (data.search === "") {
      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/venues`
        );
        const json = await response.json();
        if (json.data) {
          console.log(json.data);
          setVenues(json);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-96 m-auto mb-40">
      <div className="border rounded-lg border-green-200 py-2 px-5 flex drop-shadow-3xl bg-white">
        <input
          {...register("search")}
          placeholder="search for a venue"
          className="flex-1 focus:outline-none bg-green-200/0"
        />
        <button type="submit">
          <i className="fa-solid fa-search"></i>
        </button>
      </div>
      <p>{errors.search?.message}</p>
    </form>
  );
}
export default SearchForm;
