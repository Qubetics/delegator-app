/*eslint-disable*/
import { Wrapper } from './styles';
import CopyIcon from '../../../assets/Icons/CopyIcon';
import { toast } from '../../toast/Toast';
import CopyToClipboard from 'react-copy-to-clipboard';

const CopyAddress = ({ variant, address, validatorAddress, ...props }) => {
  const copyAddress = () => {
    toast.success('Address Copied');
  };

  return (
    <Wrapper>
      <CopyToClipboard
        text={address || props}
        onCopy={() => copyAddress()}
        className="copy-address__icon"
      >
        <CopyIcon />
      </CopyToClipboard>
    </Wrapper>
  );
};

export default CopyAddress;
