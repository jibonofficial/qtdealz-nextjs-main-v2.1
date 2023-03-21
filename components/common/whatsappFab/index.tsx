
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box, Fab, Paper, Stack, useMediaQuery, useTheme } from "@mui/material";
import appConfig from "../../../config";

export const WhatsappFab = () => {
  const theme = useTheme();
  const isWidthSM = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: {
          xs: 0,
          sm: 30,
        },
        right: {
          xs:10,
          sm:30
        },
        zIndex:999999
      }}
    >
      <Stack spacing={1} alignItems="center">
        <Fab
        size={isWidthSM ? 'small' : 'large'}
          sx={{ bgcolor: "#25D366",size:'small' }}
          onClick={() => {
            window.open(appConfig.contact.whatsapp);
          }}
        >
          <WhatsAppIcon  fontSize={isWidthSM ? 'small' : 'large'}  sx={{ color: "white", "&:hover": { color: "#25D366" } }} />
        </Fab>
        <Paper elevation={6} sx={{ fontSize: "body1.fontSize", px: 1, py: 0.5 }}>
          Live Chat
        </Paper>
      </Stack>
    </Box>
  );
};
