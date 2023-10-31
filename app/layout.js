import './globals.css'
import styles from './layout.module.css'

import Head from './components/head.js'
import Footer from './components/footer.js'
import Navbar from './components/navbar'

//redux
import { Provider } from "react-redux"
import { store } from "../store"

export const metadata = {
  title: 'MyCommerce',
  description: 'Ecommerce criado por Jânio Fernandes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head />

      <body>
        
        <Navbar />
        <div id={styles.container}>
          <Provider store={store} >
            {children}
          </Provider>
        </div>
        
        <Footer />
      </body>


    </html>
  )
}
