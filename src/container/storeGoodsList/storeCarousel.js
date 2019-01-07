import React from 'react'
import { connect } from 'dva'
import { Carousel } from 'antd-mobile'
import styles from '../style.less'

const sliderItem = (list) => {
  return list.map((res, index) => {
    return <div className="v-item" key={`carouselItem-${index}`}><span className={styles.picture}><img src={res.img} alt={res.user_name}/></span>{res.user_name} 刚刚购买了商品</div>
  })
}
function StoreCarousel({ storeGoodsList, dispatch }) {
  const { carouselList, isShowCarousel } = storeGoodsList
  const handleAfterChange = (current) => {
    //轮播完了之后因此该组件
    if(current === carouselList.length - 1) {
      let timeout = setTimeout(() => {
        dispatch({type: 'storeGoodsList/save', payload: { isShowCarousel: false }})
        // dispatch({type: 'storeGoodsList/customerGallery'})
        clearTimeout(timeout)
      }, 2000)
    }
  }
  return <div className={styles.storeCarfix}>
    {
      isShowCarousel ? <Carousel className="my-carousel"
                                 vertical
                                 cellSpacing={carouselList.length > 1 ? 10 : 0}
                                 autoplayInterval={2000}
                                 afterChange={handleAfterChange}
                                 dots={false}
                                 dragging={false}
                                 swiping={false}
                                 autoplay
          >
            {sliderItem(carouselList)}
          </Carousel>
          : null
    }
  </div>
}

const mapStateToProps = ({ storeGoodsList }) => ({ storeGoodsList })
export default connect(mapStateToProps)(StoreCarousel)
