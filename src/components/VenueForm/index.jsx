import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Rating from "@mui/material/Rating";
import { submitVenue } from "../../api/venues/submit";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  url: yup.string().required("URL is required"),
  alt: yup.string().required("Image description is required"),
  price: yup.number().required("Price is required"),
  maxGuests: yup.number().required("Capacity is required"),
  rating: yup.number().required("Rating is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  zip: yup.string().required("Zip is required"),
  country: yup.string().required("Country is required"),
  wifi: yup.boolean().required("Wifi is required"),
  parking: yup.boolean().required("Parking is required"),
  breakfast: yup.boolean().required("Breakfast is required"),
  pets: yup.boolean().required("Pets is required"),
});

function VenueForm(props) {
  const [starRating, setStarRating] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (props.venue) {
      setStarRating(props.venue.rating);
    }
  }, [props.venue]);

  function onSubmit(body) {
    const object = {
      name: body.name,
      description: body.description,
      media: [
        {
          url: body.url,
          alt: body.alt,
        },
      ],
      price: body.price,
      maxGuests: body.maxGuests,
      rating: body.rating,
      meta: {
        wifi: body.wifi,
        parking: body.parking,
        breakfast: body.breakfast,
        pets: body.pets,
      },
      location: {
        address: body.address,
        city: body.city,
        zip: body.zip,
        country: body.country,
      },
    };
    submitVenue(object, props.method, props.venue?.id).then((data) => {
      console.log(data);
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 md:w-2/3 lg:w-1/2 mx-auto mb-10"
    >
      <div className="flex gap-3">
        <div className="flex flex-col flex-1 gap-5">
          <div className="border rounded-md p-2 relative">
            <label
              htmlFor="name"
              className="absolute -top-3 left-4 text-sm bg-white px-2"
            >
              Venue Name
            </label>
            <input
              {...register("name")}
              className="w-full focus:outline-none"
              defaultValue={props.venue?.name}
            />
          </div>
          <p>{errors.name?.message}</p>
          <div className="border rounded-md p-2 relative">
            <label
              htmlFor="url"
              className="absolute -top-3 left-4 text-sm bg-white px-2"
            >
              Image URL
            </label>
            <input
              {...register("url")}
              className="w-full focus:outline-none"
              defaultValue={props.venue?.media[0].url}
            />
          </div>
          <p>{errors.url?.message}</p>
          <div className="border rounded-md p-2 relative">
            <label
              htmlFor="alt"
              className="absolute -top-3 left-4 text-sm bg-white px-2"
            >
              Image Description
            </label>
            <input
              {...register("alt")}
              className="w-full focus:outline-none"
              defaultValue={props.venue?.media[0].alt}
            />
          </div>
          <p>{errors.alt?.message}</p>
          <span className="flex gap-3">
            <div className="border rounded-md p-2 relative flex-1">
              <label
                htmlFor="price"
                className="absolute -top-3 left-4 text-sm bg-white px-2"
              >
                Price
              </label>
              <input
                {...register("price")}
                type="number"
                className="w-full focus:outline-none"
                defaultValue={props.venue?.price}
              />
            </div>
            <p>{errors.price?.message}</p>
            <div className="border rounded-md p-2 relative flex-1">
              <label
                htmlFor="maxGuests"
                className="absolute -top-3 left-4 text-sm bg-white px-2"
              >
                Capacity
              </label>
              <input
                {...register("maxGuests")}
                type="number"
                className="w-full focus:outline-none"
                defaultValue={props.venue?.maxGuests}
              />
            </div>
            <p>{errors.maxGuests?.message}</p>
          </span>
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="rating" className="text-sm bg-white px-2">
              Venue rating
            </label>
            <Rating
              name="rating"
              value={starRating}
              onChange={(event, newValue) => {
                setStarRating(newValue);
                console.log(newValue);
                register("rating", { value: newValue });
              }}
              precision={1}
            />
          </div>
          <p>{errors.rating?.message}</p>
        </div>
        <div className="border rounded-md p-2 relative flex-1">
          <label
            htmlFor="description"
            className="absolute -top-3 left-4 text-sm bg-white px-2"
          >
            Venue Description
          </label>
          <textarea
            {...register("description")}
            className="w-full h-full focus:outline-none"
            defaultValue={props.venue?.description}
          />
        </div>
        <p>{errors.description?.message}</p>
      </div>
      <span className="flex gap-3">
        <div className="border rounded-md p-2 relative flex-1">
          <label
            htmlFor="city"
            className="absolute -top-3 left-4 text-sm bg-white px-2"
          >
            City
          </label>
          <input
            {...register("city")}
            className="w-full focus:outline-none"
            defaultValue={props.venue?.location.city}
          />
        </div>
        <p>{errors.city?.message}</p>
        <div className="border rounded-md p-2 relative flex-2">
          <label
            htmlFor="zip"
            className="absolute -top-3 left-4 text-sm bg-white px-2"
          >
            Postal Code
          </label>
          <input
            {...register("zip")}
            className="w-full focus:outline-none"
            type="number"
            defaultValue={props.venue?.location.zip}
          />
        </div>
        <p>{errors.zip?.message}</p>
      </span>
      <span className="flex gap-3">
        <div className="border rounded-md p-2 relative mb-3 flex-1">
          <label
            htmlFor="address"
            className="absolute -top-3 left-4 text-sm bg-white px-2"
          >
            Address
          </label>
          <input
            {...register("address")}
            className="w-full focus:outline-none"
            defaultValue={props.venue?.location.address}
          />
        </div>
        <p>{errors.address?.message}</p>
        <div className="border rounded-md p-2 relative mb-3 flex-1">
          <label
            htmlFor="country"
            className="absolute -top-3 left-4 text-sm bg-white px-2"
          >
            Country
          </label>
          <input
            {...register("country")}
            className="w-full focus:outline-none"
            defaultValue={props.venue?.location.country}
          />
        </div>
        <p>{errors.country?.message}</p>
      </span>
      <div className="flex flex-wrap gap-5 max-w-96 mx-auto justify-center">
        <label
          htmlFor="wifi"
          className="flex flex-col items-center gap-1 bg-green-200/50 p-2 rounded-lg w-32 h-32 justify-center"
        >
          <i className="fa-solid fa-wifi text-3xl"></i>
          <p className="text-sm mb-3">Wifi</p>
          <input
            {...register("wifi")}
            type="checkbox"
            id="wifi"
            defaultChecked={props.venue?.meta.wifi}
          />
        </label>
        <label
          htmlFor="parking"
          className="flex flex-col items-center gap-1 bg-green-200/50 p-2 rounded-lg w-32 h-32 justify-center"
        >
          <i className="fa-solid fa-car text-3xl"></i>
          <p className="text-sm mb-3">Parking</p>
          <input
            {...register("parking")}
            type="checkbox"
            id="parking"
            defaultChecked={props.venue?.meta.parking}
          />
        </label>
        <label
          htmlFor="breakfast"
          className="flex flex-col items-center gap-1 bg-green-200/50 p-2 rounded-lg w-32 h-32 justify-center"
        >
          <i className="fa-solid fa-coffee text-3xl"></i>
          <p className="text-sm mb-3">Breakfast</p>
          <input
            {...register("breakfast")}
            type="checkbox"
            id="breakfast"
            defaultChecked={props.venue?.meta.breakfast}
          />
        </label>
        <label
          htmlFor="pets"
          className="flex flex-col items-center gap-1 bg-green-200/50 p-2 rounded-lg w-32 h-32 justify-center"
        >
          <i className="fa-solid fa-dog text-3xl"></i>
          <p className="text-sm mb-3">Pets</p>
          <input
            {...register("pets")}
            type="checkbox"
            id="pets"
            defaultChecked={props.venue?.meta.pets}
          />
        </label>
      </div>
      <button
        type="submit"
        className="bg-teal-500 text-white px-6 py-2 rounded-lg w-fit m-auto"
      >
        Submit
      </button>
    </form>
  );
}
export default VenueForm;
