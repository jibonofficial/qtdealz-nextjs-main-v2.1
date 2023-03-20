import HomeLayout from "components/layouts/homeLayout";
import OrderConfirmed from "components/orderConfirmed";
import { useRouter } from "next/router";

export default function OrderConfirmedPage() {
  const router = useRouter();
  const { id } = router.query;
  return <HomeLayout>{id && <OrderConfirmed id={id as string} />}</HomeLayout>;
}
