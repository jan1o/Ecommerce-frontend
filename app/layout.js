import './globals.css'
import styles from './layout.module.css'

import Head from './components/generals/head.js'
import Footer from './components/generals/footer.js'
import Navbar from './components/generals/navbar'

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
          {children}
        </div>
        
        <Footer />
      </body>


    </html>
  )
}
