import React from "react";
import {
  AppBar,
  Button,
  Divider,
  Grid,
  IconButton,
  Popover,
  Toolbar,
  Typography,
  Link as MuiLink,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";

interface Props {
  anchorSearchEl: HTMLElement | null;
  setAnchorSearchEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  searchBoxId?: string;
  searchBoxOpen: boolean;
}

export default function SearchPopover({
  anchorSearchEl,
  searchBoxOpen,
  searchBoxId,
  setAnchorSearchEl,
}: Props) {
  const router = useRouter();
  const handleSearchPopoverClose = () => {
    setAnchorSearchEl(null);
  };

  const handleSearch = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const value = event.target.value;
      if (value.length > 0) {
        router.push(`/search/${value}`);
        handleSearchPopoverClose();
      }
    }
  };
  return (
    <Popover
      elevation={0}
      id={searchBoxId}
      open={searchBoxOpen}
      anchorEl={anchorSearchEl}
      onClose={handleSearchPopoverClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{
        "& .MuiPopover-paper": {
          borderRadius: "0 !important",
        },
      }}
    >
      <input
        autoComplete="off"
        className="search-box"
        autoFocus={true}
        name="search"
        type="search"
        placeholder="Search entire store here..."
        onKeyDown={handleSearch}
      />
    </Popover>
  );
}
