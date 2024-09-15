// import React, { useContext, useState } from 'react';
// import { GlobalContext } from '../../contexts/GlobalContext';
// import * as C from './styles';

// let searchTimer: any = null;

// const Search = () => {
//   const { dispatch } = useContext(GlobalContext);

//   const [inputValue, setInputValue] = useState('');

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     clearTimeout(searchTimer);
//     setInputValue(e.target.value);

//     searchTimer = setTimeout(() => {
//       dispatch({
//         type: 'TABLEREGISTERS_SET_INITIALFETCH',
//         payload: {
//           initialFetch: false
//         }
//       });
//       dispatch({
//         type: 'TABLEREGISTERS_SET_SEARCHQUERY',
//         payload: {
//           searchQuery: e.target.value
//         }
//       });
//     }, 2000);
//   }

//   return (
//     <C.Container>
//       <input
//         placeholder='Start search...'
//         value={inputValue}
//         onChange={handleSearch}
//       />
//     </C.Container>
//   );
// }

// export default Search;
import React, { useContext, useState, useRef, useCallback } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import * as C from "./styles";

const Search = () => {
  const { dispatch } = useContext(GlobalContext);
  const [inputValue, setInputValue] = useState("");
  const searchTimer = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);

      if (searchTimer.current) {
        clearTimeout(searchTimer.current);
      }

      searchTimer.current = setTimeout(() => {
        dispatch({
          type: "TABLEREGISTERS_SET_INITIALFETCH",
          payload: { initialFetch: false },
        });
        dispatch({
          type: "TABLEREGISTERS_SET_SEARCHQUERY",
          payload: { searchQuery: value },
        });
      }, 0);
    },
    [dispatch]
  );

  return (
    <C.Container>
      <input
        placeholder="Start search..."
        value={inputValue}
        onChange={handleSearch}
      />
    </C.Container>
  );
};

export default Search;
