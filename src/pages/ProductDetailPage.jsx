import React from 'react'
import Header from '../components/Layout/Header/Header'
import Footer from '../components/Layout/Footer/Footer'
import ProductDetail from '../components/ProductDetail/ProductDetail'

const ProductPage = () => {
  return (
    <React.Fragment>
        <Header/>
        <ProductDetail/>
        <Footer />
    </React.Fragment>
  )
}

export default ProductPage
