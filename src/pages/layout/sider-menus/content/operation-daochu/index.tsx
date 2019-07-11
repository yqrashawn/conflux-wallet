import React, { Component } from 'react'
import classnames from 'classnames'
import Tooltip from '@material-ui/core/Tooltip'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import styles from './style.module.scss'
import Images from '@/assets/images/index'
interface IProps {
  lockStatus?: boolean
}
interface IState {
  openDialog?: boolean
}
class Operation extends Component<IProps, IState> {
  static defaultProps = { lockStatus: true }
  state = {
    openDialog: false,
  }
  clickHandle() {
    this.setState({
      openDialog: true,
    })
  }
  handleClose() {
    this.setState({
      openDialog: false,
    })
  }
  render() {
    const { lockStatus } = this.props
    const { openDialog } = this.state
    return (
      <>
        <Tooltip title="Derive private key">
          <div className={classnames(styles.operationWrap, lockStatus ? styles.lockStatus : null)}>
            <img
              src={Images.daochu}
              alt=""
              className={styles.icon}
              onClick={() => {
                if (!lockStatus) {
                  this.clickHandle()
                }
              }}
            />
          </div>
        </Tooltip>
        <Dialog
          onClose={() => {
            this.handleClose()
          }}
          className={styles.dialog}
          open={openDialog}
        >
          <MuiDialogTitle>
            <h1 className={styles.dialogTitle}>Private Key</h1>
            <IconButton
              aria-label="Close"
              className={styles.dialogCloseBtn}
              onClick={() => {
                this.handleClose()
              }}
            >
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <p className={styles.codeString}>
            0xba5ea4f15137a9dde2d59d3c1afe0c5655ec8953f210325542fbd9b67f1755c0
          </p>
          <div className={styles.warnFooter}>
            <svg className={styles.icon} aria-hidden="true">
              <use xlinkHref="#iconzhuyi" />
            </svg>
            <p>Do not save the private key in screenshot!</p>
          </div>
        </Dialog>
      </>
    )
  }
}
export default Operation
