import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner";
import Card from "../components/card";
import { fetchCoffeeStores } from "../lib/coffee-stores";
import useTrackLocation from "../hooks/use-track-location";
import { useEffect, useState, useContext } from "react";
import { StoreContext, ACTION_TYPES } from "../context/store-context";

// Loads data statically from the server
export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores,
    },
  };
}

export default function Home(props) {
  const buttonClick = () => {
    handleTrackLocation();
  };

  const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useTrackLocation();

  const [locationStores, setLocatingStores] = useState(false);

  const [coffeeStoresError, setCoffeeStoresError] = useState("");
  const { dispatch, state } = useContext(StoreContext);
  const { coffeeStores, latLong } = state;

  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (latLong) {
        try {
          setLocatingStores(true);
          const fetchedCoffeeStores = await fetchCoffeeStores(latLong, 30);
          // setCoffeeStores(fetchedCoffeeStores);
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: { coffeeStores: fetchedCoffeeStores },
          });
          setLocatingStores(false);
        } catch (error) {
          setCoffeeStoresError(error.toString());
        }
      }
    }
    setCoffeeStoresByLocation();
  }, [latLong]);

  console.log({ latLong, locationErrorMsg });

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta
          name="description"
          content="This is a coffee store application that lets you find nearby stores to refuel!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText={
            isFindingLocation || locationStores
              ? "Locating..."
              : "View Stores Nearby"
          }
          onClickHandler={buttonClick}
        />
        <Image
          className={styles.heroImage}
          src="/static/hero-image.png"
          width={800}
          height={500}
          alt="My Image"
          priority={true}
        />
        {locationErrorMsg.length > 0 && (
          <p>Something Went Wrong: {locationErrorMsg}</p>
        )}
        {coffeeStoresError.length > 0 && (
          <p>Coffee Stores Went Wrong: {coffeeStoresError}</p>
        )}
        <div className={styles.stores}>
          {state.coffeeStores.length > 0 && (
            <div>
              <h2 className={styles.heading2}>Stores Near You</h2>
              <div className={styles.cardLayout}>
                {coffeeStores.map((coffeeStore) => {
                  return (
                    <Card
                      className={styles.card}
                      href={`/coffee-store/${coffeeStore.id}`}
                      name={coffeeStore.name}
                      imgUrl={
                        coffeeStore.imgUrl ||
                        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                      }
                      key={coffeeStore.id}
                    />
                  );
                })}
              </div>
            </div>
          )}
          {props.coffeeStores.length > 0 && (
            <div>
              <h2 className={styles.heading2}>Calgary Coffee</h2>
              <div className={styles.cardLayout}>
                {props.coffeeStores.map((coffeeStore) => {
                  return (
                    <Card
                      className={styles.card}
                      href={`/coffee-store/${coffeeStore.id}`}
                      name={coffeeStore.name}
                      imgUrl={
                        coffeeStore.imgUrl ||
                        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                      }
                      key={coffeeStore.id}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
