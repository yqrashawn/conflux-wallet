import React, { Component } from 'react'
import styles from './style.module.scss'
import Button from '@material-ui/core/Button'
import SendCfxModal from '../send-cfx-modal/index'
import { ICFX } from '../typings'
interface ISendCfxData {
  toAddress: string
  sendAmount: string
  gasPrice: string
}
interface IProps extends ICFX {
  lockStatus?: boolean
  onSendCfx?: (data: ISendCfxData) => void
}
interface IState {
  showModal: boolean
}
class ContentCfx extends Component<IProps, IState> {
  static defaultProps = { lockStatus: true }
  state = {
    showModal: false,
  }
  hideModal() {
    this.setState({
      showModal: false,
    })
  }
  onSendCfx(data) {
    this.props.onSendCfx(data)
  }
  render() {
    const { showModal } = this.state
    const { lockStatus, cfxBalance } = this.props
    return (
      <div className={styles.cardContent}>
        <div className={styles.infoBox}>
          <div className={styles.infoBoxTop}>
            <div className={styles.walletHeader}>
              <svg aria-hidden="true" className={styles.walletImg}>
                <use xlinkHref="#iconCFX" />
              </svg>
              <p className={styles.walletName}>CFX</p>
            </div>
            <div className={styles.walletBalance}>
              <p className={styles.walletBalanceTitle}>Total Balance</p>
              <p className={styles.walletBalanceTotal}>{cfxBalance}</p>
            </div>
          </div>
        </div>
        <div className={styles.btnBox}>
          <Button
            disabled={lockStatus}
            variant="contained"
            color="primary"
            className={styles.btn}
            onClick={() => {
              this.setState({
                showModal: true,
              })
            }}
          >
            Send
          </Button>
          <SendCfxModal
            {...this.props}
            isShow={showModal}
            onSendCfx={sendData => {
              this.onSendCfx(sendData)
            }}
            onClose={() => {
              this.hideModal()
            }}
          />
          <Button variant="outlined" color="primary" className={styles.btn} disabled={lockStatus}>
            Receive
          </Button>
        </div>
      </div>
    )
  }
}
export default ContentCfx
