import { alpha, InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/router";
import React from "react";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${grey[900]}`,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: 0,
  top: 0,
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 0, 1, 1.5),
    // vertical padding + font size from searchIcon
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));



export const SearchBar = () => {
  const [searchValue,setSearchValue] = React.useState<string>('')
  const router = useRouter();
  const handleSearchFunc = () => {
    const value = searchValue;
    if (value.length > 0) {
      router.push(`/search/${value}`);
    }
  }
  const handleSearch = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearchFunc()
    }
  };
  return (
    <Search>
      <StyledInputBase placeholder="Search…" onChange={(e) => setSearchValue(e.target.value)} inputProps={{ onKeyDown: handleSearch }} />
      <SearchIconWrapper style={{cursor:'pointer',pointerEvents:'auto'}} onClick={handleSearchFunc}>
        <SearchIcon />
      </SearchIconWrapper>
    </Search>
  );
};
