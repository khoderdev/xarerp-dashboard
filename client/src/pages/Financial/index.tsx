// import { useContext, useState, useEffect } from 'react';
// import { GlobalContext } from '../../contexts/GlobalContext';
// import { useApi } from '../../hooks/useApi';

// import CommonSections from '../../components/CommonSections';

// import ModalRegisters from '../../components/ModalRegisters';
// import Input from '../../components/ModalRegisters/Input';
// import Select from '../../components/ModalRegisters/Select';

// import { CreateFinancial } from '../../types/Financial';
// import { TableRegisters } from '../../types/TableRegisters';

// type Options = {
//   name: string;
//   value: string;
// }

// const Financial = () => {
//   const api = useApi();
//   const { state, dispatch } = useContext(GlobalContext);

//   const [stores, setStores] = useState<Options[]>([]);

//   const [type, setType] = useState("1");
//   const [unity, setUnity] = useState('');
//   const [value, setValue] = useState(0);

//   const dataProps: CreateFinancial = {
//     type,
//     unity,
//     value
//   }

//   const registerOptions: Options[] = [
//     {
//       name: 'Prohibited',
//       value: '1'
//     },
//     {
//       name: 'Exit',
//       value: '0'
//     }
//   ]

//   const dataTable: TableRegisters = {
//     endpoint: "financial/registers",
//     key: "financial",
//     roles: ['create_financial', 'update_financial', 'delete_financial'],
//     tableHeads: [
//       {
//         key: 'unity',
//         title: 'Store',
//         width: 480
//       },
//       {
//         key: 'type',
//         title: 'Type',
//         width: 280
//       },
//       {
//         key: 'value_formatted',
//         title: 'Value',
//         width: 280
//       },
//       {
//         key: 'actions',
//         title: 'Actions',
//         width: 380
//       }
//     ],
//     tableTitle: 'Registered records'
//   }

//   const handleNewFinancial = async () => {
//     setType("1");
//     setUnity('');
//     setValue(0);

//     setStores([]);

//     const resultStores = await api.getRegisters('stores', Number(0));

//     if (resultStores.stores) {
//       resultStores.stores[1].map((item: { name: string; id: string; }, index: any) => (
//         setStores(oldArray => [...oldArray,
//         {
//           name: item.name,
//           value: item.id
//         }
//         ])
//       ));
//     }

//     dispatch({
//       type: 'MODALREGISTERS_SET_LOADINGREGISTER',
//       payload: {
//         loadingRegister: false
//       }
//     })
//     dispatch({
//       type: 'MODALREGISTERS_SET_OPENEDMODAL',
//       payload: {
//         openedModal: true
//       }
//     });
//   }

//   useEffect(() => {
//     dispatch({
//       type: 'REGISTER_CHANGE_HASERROR',
//       payload: {
//         hasError: false
//       }
//     });
//     dispatch({
//       type: 'REGISTER_CHANGE_PROPS',
//       payload: {
//         props: { ...dataProps }
//       }
//     });

//     if (
//       (type === "0 " || type === "1") &&
//       unity !== '' &&
//       value > 0
//     ) {
//       dispatch({
//         type: 'REGISTER_CHANGE_ISREADY',
//         payload: {
//           isReady: true
//         }
//       });
//     } else {
//       dispatch({
//         type: 'REGISTER_CHANGE_ISREADY',
//         payload: {
//           isReady: false
//         }
//       });
//       dispatch({
//         type: 'REGISTER_CHANGE_ERROR',
//         payload: {
//           error: 'You must fill all fields above.'
//         }
//       });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [type, unity, value]);

//   useEffect(() => {
//     if (state.modalRegisters.editingRegister && state.modalRegisters.registerEditingId !== '') {
//       (async () => {
//         setStores([]);

//         const resultStores = await api.getRegisters('stores', Number(0));

//         if (resultStores.stores) {
//           resultStores.stores[1].map((item: { name: string; id: string; }, index: any) => (
//             setStores(oldArray => [...oldArray,
//             {
//               name: item.name,
//               value: item.id
//             }
//             ])
//           ));
//         }
//       })();

//       setType(state.register.props.type === 'Prohibited' ? "1" : "0");
//       setUnity(state.register.props.unity_id);
//       setValue(state.register.props.value);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [state.modalRegisters.editingRegister, state.modalRegisters.registerEditingId]);

//   return (
//     <>
//       <CommonSections data={dataTable} handleNew={handleNewFinancial} />

//       {state.modalRegisters.openedModal &&
//         <ModalRegisters
//           endpoint={state.modalRegisters.editingRegister ? 'financial/registers' : 'financial/registers'}
//           type={state.modalRegisters.editingRegister ? 'update' : state.modalRegisters.deletingRegister ? 'delete' : 'create'}
//           dataKey="financial"
//           title={state.modalRegisters.editingRegister ? 'Edit record' : state.modalRegisters.deletingRegister ? 'Delete record' : 'Register record'}
//         >
//           {state.modalRegisters.deletingRegister ? (
//             <p>This process is irreversible and will also delete other data related to this record. Do you wish to continue?</p>
//           ) : (
//             <>
//               <Select
//                 label="Type"
//                 dataOptions={registerOptions}
//                 value={type}
//                 onChange={(e: any) => setType(e.target.value)} />

//               <Select
//                 label="Store"
//                 dataOptions={stores}
//                 value={unity}
//                 onChange={(e: any) => setUnity(e.target.value)} />

//               <Input
//                 label="Value"
//                 placeholder="50"
//                 value={value > 0 ? value : ''}
//                 onChange={(e: any) => setValue(parseInt(e.target.value, 10))} />

//             </>
//           )}
//         </ModalRegisters>
//       }

//     </>
//   );
// }

// export default Financial;
import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { useApi } from '../../hooks/useApi';

import CommonSections from '../../components/CommonSections';

import ModalRegisters from '../../components/ModalRegisters';
import Input from '../../components/ModalRegisters/Input';
import Select from '../../components/ModalRegisters/Select';

import { CreateFinancial } from '../../types/Financial';
import { TableRegisters } from '../../types/TableRegisters';

type Options = {
  name: string;
  value: string; // Ensure value is of type string
}

const Financial = () => {
  const api = useApi();
  const { state, dispatch } = useContext(GlobalContext);

  const [stores, setStores] = useState<Options[]>([]);

  const [type, setType] = useState('1'); // Initialize as string
  const [unity, setUnity] = useState('');
  const [value, setValue] = useState(0);

  const dataProps: CreateFinancial = {
    type: parseInt(type, 10), // Convert string to number
    unity,
    value
  }

  const registerOptions: Options[] = [
    {
      name: 'Entrada',
      value: '1'
    },
    {
      name: 'Saída',
      value: '0'
    }
  ]

  const dataTable: TableRegisters = {
    endpoint: "financial/registers",
    key: "financial",
    roles: ['create_financial', 'update_financial', 'delete_financial'],
    tableHeads: [
      {
        key: 'unity',
        title: 'Store',
        width: 480
      },
      {
        key: 'type',
        title: 'Type',
        width: 280
      },
      {
        key: 'value_formatted',
        title: 'Valor',
        width: 280
      },
      {
        key: 'actions',
        title: 'Actions',
        width: 380
      }
    ],
    tableTitle: 'Registered records'
  }

  const handleNewFinancial = async () => {
    setType('1'); // Initialize as string
    setUnity('');
    setValue(0);

    setStores([]);

    const resultStores = await api.getRegisters('stores', Number(0));

    if (resultStores.stores) {
      resultStores.stores[1].map((item: { name: string; id: string; }) => (
        setStores(oldArray => [...oldArray,
        {
          name: item.name,
          value: item.id
        }
        ])
      ));
    }

    dispatch({
      type: 'MODALREGISTERS_SET_LOADINGREGISTER',
      payload: {
        loadingRegister: false
      }
    })
    dispatch({
      type: 'MODALREGISTERS_SET_OPENEDMODAL',
      payload: {
        openedModal: true
      }
    });
  }

  useEffect(() => {
    dispatch({
      type: 'REGISTER_CHANGE_HASERROR',
      payload: {
        hasError: false
      }
    });
    dispatch({
      type: 'REGISTER_CHANGE_PROPS',
      payload: {
        props: { ...dataProps }
      }
    });

    if (
      (type === '0' || type === '1') &&
      unity !== '' &&
      value > 0
    ) {
      dispatch({
        type: 'REGISTER_CHANGE_ISREADY',
        payload: {
          isReady: true
        }
      });
    } else {
      dispatch({
        type: 'REGISTER_CHANGE_ISREADY',
        payload: {
          isReady: false
        }
      });
      dispatch({
        type: 'REGISTER_CHANGE_ERROR',
        payload: {
          error: 'You must fill all fields above.'
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, unity, value]);

  useEffect(() => {
    if (state.modalRegisters.editingRegister && state.modalRegisters.registerEditingId !== '') {
      (async () => {
        setStores([]);

        const resultStores = await api.getRegisters('stores', Number(0));

        if (resultStores.stores) {
          resultStores.stores[1].map((item: { name: string; id: string; }) => (
            setStores(oldArray => [...oldArray,
            {
              name: item.name,
              value: item.id
            }
            ])
          ));
        }
      })();

      setType(state.register.props.type === 'Entrada' ? '1' : '0'); // Set type as string
      setUnity(state.register.props.unity_id);
      setValue(state.register.props.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.modalRegisters.editingRegister, state.modalRegisters.registerEditingId]);

  return (
    <>
      <CommonSections data={dataTable} handleNew={handleNewFinancial} />

      {state.modalRegisters.openedModal &&
        <ModalRegisters
          endpoint={state.modalRegisters.editingRegister ? 'financial/registers' : 'financial/registers'}
          type={state.modalRegisters.editingRegister ? 'update' : state.modalRegisters.deletingRegister ? 'delete' : 'create'}
          dataKey="financial"
          title={state.modalRegisters.editingRegister ? 'Editar registro' : state.modalRegisters.deletingRegister ? 'Delete registro' : 'Cadastrar registro'}
        >
          {state.modalRegisters.deletingRegister ? (
            <p>This process is irreversible and will also delete other data related to this record. Do you wish to continue?</p>
          ) : (
            <>
              <Select
                label="Type"
                dataOptions={registerOptions}
                value={type} // Pass as string
                onChange={(e: any) => setType(e.target.value)} /> {/* No need to parseInt here */}

              <Select
                label="Store"
                dataOptions={stores}
                value={unity}
                onChange={(e: any) => setUnity(e.target.value)} />

              <Input
                label="Valor"
                placeholder="50"
                value={value > 0 ? value : ''}
                onChange={(e: any) => setValue(parseInt(e.target.value, 10))} /> {/* Convert to number */}
            </>
          )}
        </ModalRegisters>
      }

    </>
  );
}

export default Financial;
