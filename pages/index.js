import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner";
import Card from "../components/card";
import coffeeStoresData from "../data/coffee-stores.json";

// Loads data statically from the server
export async function getStaticProps(context) {
  return {
    props: {
      coffeeStores: coffeeStoresData,
    },
  };
}

export default function Home(props) {
  const buttonClick = () => {
    console.log("hello");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner buttonText="View Stores Nearby" onClickHandler={buttonClick} />
        <Image
          className={styles.heroImage}
          src="/static/hero-image.png"
          width={800}
          height={500}
          alt="My Image"
          priority={true}
        />

        {props.coffeeStores.length > 0 && (
          <div>
            <h2 className={styles.heading2}>Toronto Stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    className={styles.card}
                    href={`/coffee-store/${coffeeStore.id}`}
                    name={coffeeStore.name}
                    imgUrl={coffeeStore.imgUrl}
                    key={coffeeStore.id}
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
