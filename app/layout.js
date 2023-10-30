import './globals.css'
import styles from './layout.module.css'

import Head from './components/head.js'
import Footer from './components/footer.js'
import Navbar from './components/navbar'

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
      
      </body>

      <Footer />
    </html>
  )
}
