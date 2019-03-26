/**
 *
 * DeploayContract
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

// import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

// eslint-disable-next-line import/no-unresolved
import DeploayContractCode from 'components/DeploayContractCode';
import DeploayContractFrom from 'components/DeploayContractFrom';
import DeploayContractGas from 'components/DeploayContractGas';
import DeploayContractGasPrice from 'components/DeploayContractGasPrice';
import DeploayContractConfirmationView from 'components/DeploayContractConfirmationView';
import DeploayContractProgress from 'components/DeploayContractProgress';

import { makeSelectAddressList } from 'containers/HomePage/selectors';

import {
  changeCode,
  changeFrom,
  changeGas,
  changeGasPrice,
  confirmDeploayContract,
  deploayContract,
  abortDeploay,
} from './actions';

import {
  makeSelectCode,
  makeSelectFrom,
  makeSelectGas,
  makeSelectGasPrice,
  makeSelectLocked,
  makeSelectComfirmationLoading,
  makeSelectConfirmationError,
  makeSelectConfirmationMsg,
  makeSelectIsDeploayComfirmationLocked,
  makeSelectDeploayInProgress,
  makeSelectDeploayError,
} from './selectors';
import reducer from './reducer';
// saga from './saga';
// import messages from './messages';

const DivWrapper = styled.div`
  display: flex;
`;
const DivLeftWrapper = styled.div`
  flex: 1;
`;
const DivRightWrapper = styled.div`
  margin-left: 20px;
  flex: 1;
`;

function DeploayContract(props) {
  const {
    isShowDeploayContract,
    onHideDeploayContract,

    addressList,
    locked,

    code,
    onChangeCode,

    from,
    onChangeFrom,

    gas,
    onChangeGas,

    gasPrice,
    onChangeGasPrice,

    comfirmationLoading,
    confirmationError,
    confirmationMsg,
    isDeploayComfirmationLocked,
    onConfirmDeploayContract,
    onDeploayContract,
    onAbortDeploay,

    sendInProgress,
    deploayError,
  } = props;

  const DeploayCodeProps = { code, onChangeCode, locked };
  const DeploayFromProps = { from, addressList, onChangeFrom, locked };
  const DeploayGasProps = { gas, onChangeGas, locked };
  const DeploayGasPriceProps = { gasPrice, onChangeGasPrice, locked };

  const DeploayConfirmationViewProps = {
    comfirmationLoading,
    confirmationError,
    confirmationMsg,
    onDeploayContract,
    onAbortDeploay,
    sendInProgress,
    isDeploayComfirmationLocked,
    deploayError,
  };
  const DeploayProgressProps = { sendInProgress, deploayError };

  const modalFooter = [
    <Button key="reset" type="default" size="large" onClick={onAbortDeploay}>
      Reset
    </Button>,
    <Button key="close" type="default" size="large" onClick={onHideDeploayContract}>
      Close
    </Button>,
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: 'auto' }}>
      <Modal
        visible={isShowDeploayContract}
        title="Deploay Contract"
        onOk={onHideDeploayContract}
        onCancel={onHideDeploayContract}
        footer={modalFooter}
      >
        <DivWrapper>
          <DivLeftWrapper>
            <DeploayContractCode {...DeploayCodeProps} /> <br />
          </DivLeftWrapper>
          <DivRightWrapper>
            <DeploayContractFrom {...DeploayFromProps} /> <br />
            <DeploayContractGas {...DeploayGasProps} />
            <br /> <br />
            <DeploayContractGasPrice {...DeploayGasPriceProps} /> <br />
            <DeploayContractConfirmationView {...DeploayConfirmationViewProps} />
            <br />
            <DeploayContractProgress {...DeploayProgressProps} />
          </DivRightWrapper>
        </DivWrapper>
        <br />
        <Button onClick={onConfirmDeploayContract} disabled={locked}>
          Deploay Contract
        </Button>
      </Modal>
    </div>
  );
}

DeploayContract.propTypes = {
  onChangeCode: PropTypes.func.isRequired,
  onChangeFrom: PropTypes.func.isRequired,
  onChangeGas: PropTypes.func.isRequired,
  onChangeGasPrice: PropTypes.func.isRequired,
  onConfirmDeploayContract: PropTypes.func.isRequired,
  onDeploayContract: PropTypes.func.isRequired,
  onAbortDeploay: PropTypes.func.isRequired,

  code: PropTypes.string,
  from: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  gas: PropTypes.number,
  gasPrice: PropTypes.number,

  locked: PropTypes.bool,

  comfirmationLoading: PropTypes.oneOfType([PropTypes.bool]),
  confirmationError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  confirmationMsg: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  isDeploayComfirmationLocked: PropTypes.bool,

  sendInProgress: PropTypes.oneOfType([PropTypes.bool]),
  deploayError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  isShowDeploayContract: PropTypes.bool,
  onHideDeploayContract: PropTypes.func,
  addressList: PropTypes.oneOfType([
    // PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]),
};

const mapStateToProps = createStructuredSelector({
  code: makeSelectCode(),
  from: makeSelectFrom(),
  gas: makeSelectGas(),
  addressList: makeSelectAddressList(),
  gasPrice: makeSelectGasPrice(),

  locked: makeSelectLocked(),

  comfirmationLoading: makeSelectComfirmationLoading(),
  confirmationError: makeSelectConfirmationError(),
  confirmationMsg: makeSelectConfirmationMsg(),

  isDeploayComfirmationLocked: makeSelectIsDeploayComfirmationLocked(),

  sendInProgress: makeSelectDeploayInProgress(),
  deploayError: makeSelectDeploayError(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeCode: (code) => {
      dispatch(changeCode(code));
    },
    onChangeFrom: (address) => {
      dispatch(changeFrom(address));
    },
    onChangeGas: (gas) => {
      dispatch(changeGas(gas));
    },
    onChangeGasPrice: (value) => {
      dispatch(changeGasPrice(value));
    },
    onConfirmDeploayContract: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(confirmDeploayContract());
    },
    onAbortDeploay: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(abortDeploay());
    },
    onDeploayContract: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(deploayContract());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'deploaycontract', reducer });
// const withSaga = injectSaga({ key: 'deploaycontract', saga });

export default compose(
  withReducer,
  // withSaga,
  withConnect
)(DeploayContract);