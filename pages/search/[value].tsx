import HomeLayout from "components/layouts/homeLayout";
import { SearchResults } from "components/searchResults";
import { useRouter } from "next/router";

export default function SearchPage() {
  const router = useRouter();
  const { value } = router.query;
  return <HomeLayout>{value && <SearchResults searchValue={value as string} />}</HomeLayout>;
}
