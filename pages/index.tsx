import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import {components} from '../components'
import styles from '../styles/Home.module.css'
import { hooks } from '../api/hooks'

const Home: NextPage = () => {
  const pageState = hooks.usePageState()
  const cart = hooks.useCart()
  const productState = hooks.useProduct()

  return (
    <div className={styles.container}>
      <Head>
        <title>LucyInTheSky_test</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div>
          <components.Menu cart={cart} />
        </div>
        <div>
          <components.ProductPages pageState={pageState} />
        </div>        
      </header>

      <main className={styles.main}>
        <div>
          <components.List pageState={pageState} cart={cart} productState={productState}/>
        </div>

        <components.CartComponent cart={cart} />
        <components.ProductView cart={cart} productState={productState} />
      </main>

      <div className={styles.footer}>
        
        <div>
          <components.ProductPages pageState={pageState} />
        </div>
      </div>
    </div>
  )
}

export default Home