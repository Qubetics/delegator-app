import theme from '../../../theme';
import { CustomizedTextField } from './styles';

const TextField = ({ ...props }) => {
  return (
    <CustomizedTextField
      {...props}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        style: { paddingright: props.paddingright },
        maxLength: props.maxlength,
        sx: {
          '&::placeholder': {
            color: theme.palette.blue.dark,
            ...theme.typography.body2,
            lineHeight: 1.9,
          },
        },
      }}
    />
  );
};

export default TextField;
