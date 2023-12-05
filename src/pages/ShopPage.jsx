import { Fragment } from "react"
import Header from "../components/Layout/Header/Header"
import Category from "../components/Category/Category"
import Product from "../components/Products/Product"
import CampaignSingle from "../components/CampaignSingle/CampaignSingle"
import Policy from "../components/Layout/Policy/Policy"
import Footer from "../components/Layout/Footer/Footer"

const ShopPage = () => {
  return (
    <Fragment>
        <Header />
        <Category/>
        <Product/>
        <CampaignSingle/>
        <Product/>
        <Policy/>
        <Footer/>
    </Fragment>
  )
}

export default ShopPage
