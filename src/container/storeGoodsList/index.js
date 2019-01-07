import React from 'react'
import {connect} from "dva";
import ListPage from '../../component/ListPage'
import StoreCarousel from './storeCarousel'
import Row from './Row'
// import Footer from './Footer'

const GoodsList = ({ storeGoodsList, dispatch }) => {
  const load = () => {
    dispatch({ type: 'storeGoodsList/fetchGoodsList'})
  }
  const { dataSource } = storeGoodsList
  return (
    <div>
      <StoreCarousel/>
      {/*<Footer/>*/}
      <ListPage row={Row} dataSource={dataSource} load={load}/>
    </div>
  )
}

const mapStateToProps = ({ storeGoodsList }) => ({ storeGoodsList })
export default connect(mapStateToProps)(GoodsList)
