import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

  function onSubmit(data) {
    console.log(data);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-96 m-auto mb-40">
      <div className="border rounded-lg border-green-200 py-2 px-5 flex drop-shadow-3xl bg-white">
        <input
          {...register("search")}
          placeholder="Search for a city"
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
