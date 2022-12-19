import { createApi } from "unsplash-js";

const serverApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getListOfCoffeeStorePhotos = async () => {
  const photos = await serverApi.search.getPhotos({
    query: "coffee",
    page: 1,
    perPage: 30,
  });

  const results = photos.response.results;

  return results.map((result) => result.urls["small"]);
};

const fetchURLForCoffeeStore = (query, latlong, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&limit=${limit}`;
};

export const fetchCoffeeStores = async (
  latLong = "51.0683,-114.1168",
  limit = 9
) => {
  const photos = await getListOfCoffeeStorePhotos();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOUR_SQUARE_API_KEY,
    },
  };

  const response = await fetch(
    fetchURLForCoffeeStore("coffee", latLong, limit),
    options
  );

  let data = await response.json();
  data = data.results.map((result, index) => {
    const neighborhood = result.location.neighborhood;
    return {
      id: result.fsq_id,
      address: result.location.address,
      name: result.name,
      neighborhood:
        neighborhood != null && neighborhood > 0 ? neighborhood[0] : "",
      imgUrl: photos.length > 0 ? photos[index] : null,
    };
  });
  console.log(data);
  return data;
};
