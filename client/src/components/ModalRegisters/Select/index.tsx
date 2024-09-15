// import * as C from './styles';

// type Options = {
//   name: string;
//   value: string;
// }

// type SelectProps = {
//   label: string;
//   dataOptions: Options[];
//   [key: string]: any;
// }

// const Select = ({ label, dataOptions, ...rest }: SelectProps) => {
//   return (
//     <C.SelectContainer>
//       <C.SelectTitle>{label}</C.SelectTitle>
//       <C.Select {...rest}>
//         <C.Option>Select</C.Option>
//         {dataOptions.map((item, index) => (
//           <C.Option value={item.value} key={index}>{item.name}</C.Option>
//         ))}
//       </C.Select>
//     </C.SelectContainer>
//   );
// }

// export default Select;
import * as C from './styles';

type Options = {
  name: string;
  value: string;
}

type SelectProps = {
  label: string;
  dataOptions: Options[];
  value: string; // Add value prop to control the selected option
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Add onChange handler prop
}

const Select = ({ label, dataOptions, value, onChange }: SelectProps) => {
  return (
    <C.SelectContainer>
      <C.SelectTitle>{label}</C.SelectTitle>
      <C.Select value={value} onChange={onChange}>
        <C.Option value="">Select...</C.Option>
        {dataOptions.map((item) => (
          <C.Option value={item.value} key={item.value}>
            {item.name}
          </C.Option>
        ))}
      </C.Select>
    </C.SelectContainer>
  );
}

export default Select;
