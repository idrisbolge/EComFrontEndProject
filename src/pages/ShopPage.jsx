import { Fragment } from "react"
import Category from "../components/Category/Category"
import Product from "../components/Products/Product"
import CampaignSingle from "../components/CampaignSingle/CampaignSingle"
import Policy from "../components/Layout/Policy/Policy"


const ShopPage = () => {
  return (
    <Fragment>
        <Category/>
        <Product/>
        <CampaignSingle/>
        <Product/>
        <Policy/>
    </Fragment>
  )
}

export default ShopPage
