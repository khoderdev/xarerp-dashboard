import * as C from './styles';

type LastSaleProps = {
  price: number;
  name: string;
  unity: string;
  quantity: number;
}

const LastSale = ({ price, name, unity, quantity }: LastSaleProps) => {
  const formattedPrice = price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  return (
    <C.Container>
      <C.Price>{formattedPrice}</C.Price>
      <C.Name>{quantity}x {name}</C.Name>
      <C.Unity>Store: {unity}</C.Unity>
    </C.Container>
  );
}

export default LastSale;
