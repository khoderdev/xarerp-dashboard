import * as C from './styles';

type ResumeBalanceProps = {
  value: number;
  type: string;
}

const ResumeBalance = ({ value, type }: ResumeBalanceProps) => {
  const formattedValue = value.toLocaleString('en-LB', { style: 'currency', currency: 'USD' });

  return (
    <C.Container>
      <C.Value>{formattedValue}</C.Value>
      <C.Title>{type}</C.Title>
    </C.Container>
  );
}

export default ResumeBalance;
