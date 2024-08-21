import '../styles/globals.css'
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Toaster position='top-left' toastOptions={
        {
          style: {
            width: 260,
          },
        }
      } />

      <Component {...pageProps} />
    </>
  )
}

export default MyApp
