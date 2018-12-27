import React from 'react'
import styles from "../style.less";
import {Button} from "antd-mobile";

function Row(rowData, sectionID, rowID) {
  return (
      <div key={rowID} className={styles.listRow}>
        <div className={styles.goodsInfo}>
          <img className={styles.infoLeft} src={rowData.img} alt="" />
          <div className={styles.infoRight}>
            <div className={styles.goodsName}>{rowData.des}</div>
            <div className={styles.goodsPriceCount}>黑色 限量版</div>
            <div className={styles.priceWrap}><span className={styles.goodsPriceSymbol}>¥</span><span className={styles.goodsPrice}>35</span> <span className={styles.goodsProfits}>赚  ¥ 150.00</span></div>
          </div>
        </div>
        <div className={styles.amountInfo}>
          <div className={styles.amountBlock + ' ' + styles.splitLine}>
            <div className={styles.num}><span className={styles.goodsPriceSymbol}>¥</span> {`28600.00`}</div>
            <div className={styles.text}>实付金额</div>
          </div>
          <div className={styles.amountBlock}>
            <div className={styles.num}><span className={styles.goodsPriceSymbol}>¥</span> {`5620.00`}</div>
            <div className={styles.text}>分润金额</div>
          </div>
        </div>
        <div className={styles.oprWrap}>
          <div className={styles.countDown}>
            <span className={styles.text}>距结束仅剩</span>
            <span className={styles.countDwonBlock}>18</span>:
            <span className={styles.countDwonBlock}>18</span>:
            <span className={styles.countDwonBlock}>18</span>
          </div>
          <div className={styles.oprBtns}>
            <Button className={styles.h5Btn}>上架</Button>
            <Button className={styles.h5Btn + ' ' + styles.h5BtnGradient}>分享</Button>
          </div>
        </div>
      </div>
  )
}

export default Row
