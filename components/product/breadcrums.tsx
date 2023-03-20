import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/router";
import { appRoutes } from "utils/routes";

interface Props {
  secondBreadcrumbRoute: string;
  secondBreadcrumbContent: string;
  thirdBreadcrumbContent: string;
}

export const ProductBreadcrumbs = ({
  secondBreadcrumbRoute,
  secondBreadcrumbContent,
  thirdBreadcrumbContent,
}: Props) => {
  const router = useRouter();
  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      onClick={() => router.push(appRoutes.home)}
      sx={{ display: "flex", alignItems: "center" }}
    >
      <HomeIcon fontSize="small" />
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      onClick={() => router.push(secondBreadcrumbRoute)}
    >
      {secondBreadcrumbContent}
    </Link>,
    <Typography key="3" color="text.primary">
      {thirdBreadcrumbContent}
    </Typography>,
  ];
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ "& .MuiLink-root": { cursor: "pointer" } }}
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
};
