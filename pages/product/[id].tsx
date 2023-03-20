import { currentProductIdAtom } from "atoms/atoms";
import { HeadTags } from "components/common/seo/head";
import HomeLayout from "components/layouts/homeLayout";
import { Product } from "components/product";
import appConfig from "config";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function ProductPage() {
  const router = useRouter();
  const [currentProdId, setCurrProdId] = useRecoilState(currentProductIdAtom);
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      setCurrProdId(id as string);
    }
  }, [id]);
  return (
    <HomeLayout>
      <HeadTags contents={appConfig.head.home} />
      {id && <Product id={id as string} />}
    </HomeLayout>
  );
}
