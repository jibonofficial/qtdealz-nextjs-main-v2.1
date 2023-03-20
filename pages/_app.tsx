import "../styles/global.css";
import type { AppProps } from "next/app";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/controller";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import createEmotionCache from "utils/createEmotionCache";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import Head from "next/head";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "utils/theme";
import axios from "axios";
import appConfig from "config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// decalred global api url
axios.defaults.baseURL = appConfig.api.baseUrl;

const queryClient = new QueryClient();

export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </RecoilRoot>
      </ThemeProvider>
    </CacheProvider>
  );
}
