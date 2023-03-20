import { fetchCategories } from "backend/category";
import { CategoryType } from "components/allTypes/categoriesType";
import { Category } from "components/category";
import { HeadTags } from "components/common/seo/head";
import HomeLayout from "components/layouts/homeLayout";
import appConfig, { HeadTagsType } from "config";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

interface Props {
  headTags: HeadTagsType;
}

export default function CategoryByIdPage({ headTags }: Props) {
  const router = useRouter();
  const { catId, title } = router.query;
  return (
    <HomeLayout>
      <HeadTags contents={headTags} />
      {catId && title && <Category catId={catId as string} title={title as string} />}
    </HomeLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { catId } = params as any;
  let headTags: HeadTagsType;
  if (catId === "61194a6d52ad228a0f303153") {
    // new arrival
    headTags = appConfig.head.newArrivalCat;
  } else if (catId === "610173363351d210026762a9") {
    // clearance
    headTags = appConfig.head.clearanceCat;
  } else headTags = appConfig.head.home;

  return {
    props: {
      headTags,
    },
  };
};
