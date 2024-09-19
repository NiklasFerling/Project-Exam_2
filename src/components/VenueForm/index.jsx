import { useState } from "react";
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
});

function VenueForm(props) {
  const [starRating, setStarRating] = useState(0);
  const [method, setMethod] = useState(props.method);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

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
      <button type="submit">Submit</button>
    </form>
  );
}
export default VenueForm;
