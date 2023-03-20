import { HeadTags } from "components/common/seo/head";
import Home from "components/home";
import HomeLayout from "components/layouts/homeLayout";
import appConfig from "config";

export default function Root() {
  return (
    <HomeLayout>
      <HeadTags contents={appConfig.head.home} />
      <Home />
    </HomeLayout>
  );
}
