/*eslint-disable*/
import { Typography } from '@mui/material';
import { Wrapper } from './styles';
import CopyIcon from '../../../assets/Icons/CopyIcon';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from '../../toast/Toast';

const Address = ({ variant, address, validatorAddress, ...props }) => {
  const copyAddress = () => {
    toast.success('Address Copied');
  };

  return (
    <Wrapper {...props} className="addres-input">
      <Typography className="address-text">{address}</Typography>{' '}
      <CopyToClipboard text={address || props} onCopy={() => copyAddress()} className="copy-btn">
        <CopyIcon sx={{ fontSize: '26px' }} />
      </CopyToClipboard>
    </Wrapper>
  );
};

export default Address;
