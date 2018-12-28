import React from 'react'
import styles from '../style.less'

function Footer() {
  return (
      <div className={styles.footerMenu}>
        <div className={styles.footerMenuItem}>
          <div className={styles.itemIcon}><i className="iconfont icon-home"></i></div>
          <div className={styles.itemTxt}>首页</div>
        </div>
        <div className={styles.footerMenuItem}>
          <div className={styles.itemIcon}><i className="iconfont icon-fenlei1"></i></div>
          <div className={styles.itemTxt}>分类</div>
        </div>
        <div className={styles.footerMenuItem}>
          <div style={{marginTop: 4}} className={styles.itemIcon}>
            <span className={styles.iconTxt}></span>
            <i style={{fontSize: 24}} className={styles.activeMenu + ' iconfont icon-sale'}></i>
          </div>
          <div className={styles.itemTxt}>大聚惠</div>
        </div>
        <div className={styles.footerMenuItem}>
          <div className={styles.itemIcon}><i className="iconfont icon-cart"></i></div>
          <div className={styles.itemTxt}>购物车</div>
        </div>
        <div className={styles.footerMenuItem}>
          <div className={styles.itemIcon}><i className="iconfont icon-member"></i></div>
          <div className={styles.itemTxt}>我的会员</div>
        </div>
      </div>
  )
}

export default Footer
