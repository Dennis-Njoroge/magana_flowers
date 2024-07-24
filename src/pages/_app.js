import Head from "next/head";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {APP_NAME} from "@/utils/constants";
import {createTheme} from "@/theme";
import {createEmotionCache} from "@/utils/create-emotion-cache";
import {CacheProvider} from "@emotion/react";
import {SettingsConsumer, SettingsProvider} from "@/context/settings-context";
import {useMounted} from "@/hooks/use-mounted";
import {useEffect, useState} from "react";
import {Provider} from "react-redux";
import {store} from "@/redux";
import {AuthProvider} from "@/context/auth-context";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import '@/theme/main.css';

const clientSideEmotionCache = createEmotionCache();
export default function App({ Component, pageProps }) {
    const isMounted = useMounted();
    const [isLoading, setIsLoading] = useState(true);
    const getLayout = Component.getLayout ?? ((page) => page);


  useEffect(() => {
      if (isMounted()){
          setIsLoading(false);
      }
  },[isMounted]);

  return (
      <>
          <Head>
              <title>{APP_NAME}</title>
              <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <Provider store={store}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CacheProvider value={clientSideEmotionCache}>
                  <SettingsProvider>
                      <SettingsConsumer>
                          {({ settings }) => (
                              <AuthProvider>
                                  <ThemeProvider
                                      theme={createTheme({
                                          direction: settings.direction,
                                          responsiveFontSizes: settings.responsiveFontSizes,
                                          mode: settings.theme,
                                      })}
                                  >
                                      <CssBaseline />
                                      <ToastContainer
                                          position="top-center"
                                          autoClose={5000}
                                          hideProgressBar={false}
                                          newestOnTop={false}
                                          closeOnClick
                                          rtl={false}
                                          pauseOnFocusLoss
                                          draggable
                                          pauseOnHover
                                          //theme="colored"
                                      />
                                      { !isLoading && getLayout(<Component {...pageProps} />)}
                                  </ThemeProvider>
                              </AuthProvider>

                          )
                          }
                      </SettingsConsumer>
                  </SettingsProvider>
              </CacheProvider>
              </LocalizationProvider>
          </Provider>

      </>

  )
}
