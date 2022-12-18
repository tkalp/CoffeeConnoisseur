import { useRouter } from "next/router";
import Link from "next/link";
import coffeeStoreData from "../../data/coffee-stores.json";
import Head from "next/head";
import styles from "../../styles/coffee-store.module.css";
import Image from "next/image";
import cls from "classnames";

// Defined dyaminc pages to load
export function getStaticPaths() {
  const paths = coffeeStoreData.map((coffeeStore) => {
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
export function getStaticProps({ params }) {
  return {
    props: {
      coffeeStore: coffeeStoreData.find((coffeeStore) => {
        return coffeeStore.id === parseInt(params.id);
      }),
    },
  };
}

// our returned array
const CoffeeStore = (props) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading.....</div>;
  }

  const { address, name, neighbourhood, id, imgUrl } = props.coffeeStore;
  const routerId = router.query.id;

  const handleUpvoteButton = () => {};

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
            src={imgUrl}
            width={600}
            height={460}
            className={styles.storeImg}
            alt={name}
          />
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/icons/location.svg"
              width={24}
              height={24}
              className={styles.icon}
            />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/icons/star.svg"
              width={24}
              height={24}
              className={styles.icon}
            />
            <p className={styles.text}>{neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/icons/send.svg"
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
