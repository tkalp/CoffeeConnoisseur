import { useRouter } from "next/router";
import Link from "next/link";

const CoffeeStore = () => {
  const router = useRouter();
  const id = router.query.id;
  return (
    <div>
      Coffee Store page: {id}
      <br />
      <Link href="/">Back to home</Link>
      <br />
      <Link href="/coffee-store/dynamic">Go to Dynamic Page</Link>
    </div>
  );
};

export default CoffeeStore;
