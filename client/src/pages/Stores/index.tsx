// // import React, { useContext, useState, useEffect } from 'react';
// // import { GlobalContext } from '../../contexts/GlobalContext';

// // import CommonSections from '../../components/CommonSections';

// // import ModalRegisters from '../../components/ModalRegisters';
// // import Input from '../../components/ModalRegisters/Input';

// // import { CreateStore } from '../../types/Store';
// // import { TableRegisters } from '../../types/TableRegisters';

// // const Stores = () => {
// //   const { state, dispatch } = useContext(GlobalContext);

// //   const [name, setName] = useState('');
// //   const [branch, setBranch] = useState('');

// //   const dataProps: CreateStore = {
// //     name,
// //     branch
// //   }


// //   const dataTable: TableRegisters = {
// //     endpoint: "stores",
// //     key: "stores",
// //     roles: ['create_store', 'update_store', 'delete_store'],
// //     tableHeads: [
// //       {
// //         key: 'name',
// //         title: 'Name',
// //         width: 280
// //       },
// //       {
// //         key: 'branch',
// //         title: 'Branch',
// //         width: 280
// //       },
// //       {
// //         key: 'actions',
// //         title: 'Actions',
// //         width: 180
// //       }
// //     ],
// //     tableTitle: 'Units'
// //   }

// //   const handleNewStore = () => {
// //     setName('');
// //     setBranch('Branch');
// //     dispatch({
// //       type: 'MODALREGISTERS_SET_LOADINGREGISTER',
// //       payload: {
// //         loadingRegister: false
// //       }
// //     })
// //     dispatch({
// //       type: 'MODALREGISTERS_SET_OPENEDMODAL',
// //       payload: {
// //         openedModal: true
// //       }
// //     });
// //   }

// //   useEffect(() => {
// //     dispatch({
// //       type: 'REGISTER_CHANGE_HASERROR',
// //       payload: {
// //         hasError: false
// //       }
// //     });
// //     dispatch({
// //       type: 'REGISTER_CHANGE_PROPS',
// //       payload: {
// //         props: { ...dataProps }
// //       }
// //     });

// //     if (name !== '' && branch !== '') {
// //       dispatch({
// //         type: 'REGISTER_CHANGE_ISREADY',
// //         payload: {
// //           isReady: true
// //         }
// //       });
// //     } else {
// //       dispatch({
// //         type: 'REGISTER_CHANGE_ISREADY',
// //         payload: {
// //           isReady: false
// //         }
// //       });
// //       dispatch({
// //         type: 'REGISTER_CHANGE_ERROR',
// //         payload: {
// //           error: 'You must fill all fields above.'
// //         }
// //       });
// //     }
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [name, branch]);

// //   useEffect(() => {
// //     if (state.modalRegisters.editingRegister && state.modalRegisters.registerEditingId !== '') {
// //       setName(state.register.props.name);
// //       setBranch(state.register.props.branch);
// //     }
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [state.modalRegisters.editingRegister, state.modalRegisters.registerEditingId]);

// //   return (
// //     <>
// //       <CommonSections data={dataTable} handleNew={handleNewStore} />

// //       {state.modalRegisters.openedModal &&
// //         <ModalRegisters
// //           endpoint={state.modalRegisters.editingRegister ? 'stores' : 'stores'}
// //           type={state.modalRegisters.editingRegister ? 'update' : state.modalRegisters.deletingRegister ? 'delete' : 'create'}
// //           dataKey="store"
// //           title={state.modalRegisters.editingRegister ? 'Edit Unit' : state.modalRegisters.deletingRegister ? 'Delete Unit' : 'Add New Unit'}
// //         >
// //           {state.modalRegisters.deletingRegister ? (
// //             <p>This process is irreversible and will also delete other data related to this record. Do you wish to continue?</p>
// //           ) : (
// //             <>
// //               <Input label="Name" placeholder="Unit 1" value={name || ''} onChange={(e: any) => setName(e.target.value)} />
// //               <Input label="Branch" placeholder="branch 1.." value={branch || ''} onChange={(e: any) => setBranch(e.target.value)} />

// //             </>
// //           )}
// //         </ModalRegisters>
// //       }

// //     </>
// //   );
// // }

// // export default Stores;



// import React, { useContext, useState, useEffect } from 'react';
// import { GlobalContext } from '../../contexts/GlobalContext';

// import CommonSections from '../../components/CommonSections';
// import Input from '../../components/ModalRegisters/Input';
// import ModalRegisters from '../../components/ModalRegisters/Input';

// import { CreateStore } from '../../types/Store';
// import { TableRegisters } from '../../types/TableRegisters';

// const Stores = () => {
//   const { state, dispatch } = useContext(GlobalContext);

//   const [name, setName] = useState('');
//   const [branch, setBranch] = useState('');

//   const dataProps: CreateStore = {
//     name,
//     branch
//   };

//   // Function to extract the branch name from the branches array
//   const renderBranchName = (store: any) => {
//     if (store.branches && store.branches.length > 0) {
//       return store.branches[0].name; // Assuming there is only one branch per store
//     }
//     return 'N/A'; // In case no branch is available
//   };

//   const dataTable: TableRegisters = {
//     endpoint: 'stores',
//     key: 'stores',
//     roles: ['create_store', 'update_store', 'delete_store'],
//     tableHeads: [
//       {
//         key: 'name',
//         title: 'Name',
//         width: 280
//       },
//       {
//         key: 'branch',
//         title: 'Branch',
//         width: 280
//       },
//       {
//         key: 'actions',
//         title: 'Actions',
//         width: 180
//       }
//     ],
//     tableTitle: 'Units'
//   };
  

//   const handleNewStore = () => {
//     setName('');
//     setBranch('Branch');
//     dispatch({
//       type: 'MODALREGISTERS_SET_LOADINGREGISTER',
//       payload: {
//         loadingRegister: false
//       }
//     });
//     dispatch({
//       type: 'MODALREGISTERS_SET_OPENEDMODAL',
//       payload: {
//         openedModal: true
//       }
//     });
//   };

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

//     if (name !== '' && branch !== '') {
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
//   }, [name, branch]);

//   useEffect(() => {
//     if (state.modalRegisters.editingRegister && state.modalRegisters.registerEditingId !== '') {
//       setName(state.register.props.name);
//       setBranch(state.register.props.branch);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [state.modalRegisters.editingRegister, state.modalRegisters.registerEditingId]);

//   return (
//     <>
//       <CommonSections data={dataTable} handleNew={handleNewStore} />

//       {state.modalRegisters.openedModal &&
//         <ModalRegisters
//           endpoint={state.modalRegisters.editingRegister ? 'stores' : 'stores'}
//           type={state.modalRegisters.editingRegister ? 'update' : state.modalRegisters.deletingRegister ? 'delete' : 'create'}
//           dataKey="store"
//           title={state.modalRegisters.editingRegister ? 'Edit Unit' : state.modalRegisters.deletingRegister ? 'Delete Unit' : 'Add New Unit'} label={''} placeholder={''}        >
//           {state.modalRegisters.deletingRegister ? (
//             <p>This process is irreversible and will also delete other data related to this record. Do you wish to continue?</p>
//           ) : (
//             <>
//               <Input label="Name" placeholder="Unit 1" value={name || ''} onChange={(e: any) => setName(e.target.value)} />
//               <Input label="Branch" placeholder="branch 1.." value={branch || ''} onChange={(e: any) => setBranch(e.target.value)} />
//             </>
//           )}
//         </ModalRegisters>
//       }
//     </>
//   );
// }

// export default Stores;
import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';

import CommonSections from '../../components/CommonSections';
import Input from '../../components/ModalRegisters/Input';
import ModalRegisters from '../../components/ModalRegisters/Input';

import { CreateStore } from '../../types/Store';
import { TableRegisters } from '../../types/TableRegisters';

const Stores = () => {
  const { state, dispatch } = useContext(GlobalContext);

  const [name, setName] = useState('');
  const [branch, setBranch] = useState('');

  const dataProps: CreateStore = {
    name,
    branch
  };

  const dataTable: TableRegisters = {
    endpoint: 'stores',
    key: 'stores',
    roles: ['create_store', 'update_store', 'delete_store'],
    tableHeads: [
      {
        key: 'name',
        title: 'Name',
        width: 280
      },
      {
        key: 'branch',
        title: 'Branch',
        width: 280
      },
      {
        key: 'actions',
        title: 'Actions',
        width: 180
      }
    ],
    tableTitle: 'Units'
  };

  // Function to handle adding a new store
  const handleNewStore = () => {
    setName('');
    setBranch('Branch');
    dispatch({
      type: 'MODALREGISTERS_SET_LOADINGREGISTER',
      payload: {
        loadingRegister: false
      }
    });
    dispatch({
      type: 'MODALREGISTERS_SET_OPENEDMODAL',
      payload: {
        openedModal: true
      }
    });
  };

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

    if (name !== '' && branch !== '') {
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
  }, [name, branch]);

  useEffect(() => {
    if (state.modalRegisters.editingRegister && state.modalRegisters.registerEditingId !== '') {
      setName(state.register.props.name);
      setBranch(state.register.props.branch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.modalRegisters.editingRegister, state.modalRegisters.registerEditingId]);

  return (
    <>
      {/* Pass the table data and the new store handler */}
      <CommonSections data={dataTable} handleNew={handleNewStore} />

      {state.modalRegisters.openedModal && (
        <ModalRegisters
          endpoint={state.modalRegisters.editingRegister ? 'stores' : 'stores'}
          type={state.modalRegisters.editingRegister ? 'update' : state.modalRegisters.deletingRegister ? 'delete' : 'create'}
          dataKey="store"
          title={
            state.modalRegisters.editingRegister
              ? 'Edit Unit'
              : state.modalRegisters.deletingRegister
              ? 'Delete Unit'
              : 'Add New Unit'
          }
          label={''}
          placeholder={''}
        >
          {state.modalRegisters.deletingRegister ? (
            <p>This process is irreversible and will also delete other data related to this record. Do you wish to continue?</p>
          ) : (
            <>
              <Input
                label="Name"
                placeholder="Unit 1"
                value={name || ''}
                onChange={(e: any) => setName(e.target.value)}
              />
              <Input
                label="Branch"
                placeholder="Branch 1.."
                value={branch || ''}
                onChange={(e: any) => setBranch(e.target.value)}
              />
            </>
          )}
        </ModalRegisters>
      )}
    </>
  );
};

export default Stores;
