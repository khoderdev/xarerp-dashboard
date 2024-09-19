import * as C from './styles';

type InputProps = {
  label: string;
  placeholder: string;
  textarea?: boolean; // Optional prop to indicate textarea
  [key: string]: any;
}

const Input = ({ label, placeholder, textarea = false, ...rest }: InputProps) => {
  return (
    <C.InputContainer>
      <C.InputTitle>{label}</C.InputTitle>
      {textarea ? (
        <C.Textarea placeholder={placeholder} {...rest} />
      ) : (
        <C.Input placeholder={placeholder} {...rest} />
      )}
    </C.InputContainer>
  );
}

export default Input;
