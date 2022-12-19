import { useContext, useState } from "react";
import { ACTION_TYPES, StoreContext } from "../context/store-context";

const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  // const [latLong, setLatLong] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const { dispatch } = useContext(StoreContext);

  const success = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    // setLatLong(`${lat},${lon}`);
    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: { latLong: `${lat},${lon}` },
    });
    setLocationErrorMsg("");
    setIsFindingLocation(false);
  };

  const error = () => {
    setLocationErrorMsg("Unable to retrieve location");
    setIsFindingLocation(false);
  };

  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
      setLocationErrorMsg("Geolocation is not supported by the browser");
    } else {
      setIsFindingLocation(true);
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    locationErrorMsg,
    isFindingLocation,
    handleTrackLocation,
  };
};

export default useTrackLocation;
