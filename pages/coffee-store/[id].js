import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import styles from "../../styles/coffee-store.module.css";
import Image from "next/image";
import cls from "classnames";
import { fetchCoffeeStores } from "../../lib/coffee-stores";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/store-context";
import { isEmpty } from "../../utils";

// Defined dyaminc pages to load
export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });

  return {
    paths: paths,
    fallback: true,
  };
}

// gets the data for this page
export async function getStaticProps({ params }) {
  const coffeeStores = await fetchCoffeeStores();
  const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
    return coffeeStore.id === params.id.toString();
  });
  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}

// our returned array
const CoffeeStore = (initialProps) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading.....</div>;
  }

  const id = router.query.id;
  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);

  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      if (coffeeStores.length > 0) {
        const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
          return coffeeStore.id === id;
        });
        console.log(findCoffeeStoreById);
        setCoffeeStore(findCoffeeStoreById);
      }
    }
  }, [id]);

  const handleUpvoteButton = () => {};
  const { address, name, imgUrl, neighborhood } = coffeeStore;

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">Back to home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            }
            width={600}
            height={460}
            className={styles.storeImg}
            alt={name}
          />
        </div>
        <div className={cls("glass", styles.col2)}>
          {address && (
            <div className={styles.iconWrapper}>
              <Image
                src="/icons/location.svg"
                width={24}
                height={24}
                className={styles.icon}
              />
              <p className={styles.text}>{address}</p>
            </div>
          )}
          {neighborhood && (
            <div className={styles.iconWrapper}>
              <Image
                src="/icons/send.svg"
                width={24}
                height={24}
                className={styles.icon}
              />
              <p className={styles.text}>{neighborhood}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image
              src="/icons/star.svg"
              width={24}
              height={24}
              className={styles.icon}
            />
            <p className={styles.text}>{0}</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up Vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
