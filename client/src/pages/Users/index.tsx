// import { useContext, useState, useEffect } from "react";
// import { GlobalContext } from "../../contexts/GlobalContext";
// import { useApi } from "../../hooks/useApi";

// import CommonSections from "../../components/CommonSections";
// import ModalRegisters from "../../components/ModalRegisters";
// import Input from "../../components/ModalRegisters/Input";
// import Select from "../../components/ModalRegisters/Select";

// import { NewCreateUser } from "../../types/UserCreate";
// import { TableRegisters } from "../../types/TableRegisters";

// type Options = {
//   name: string;
//   value: string;
// };

// const Users = () => {
//   const api = useApi();
//   const { state, dispatch } = useContext(GlobalContext);

//   const [stores, setStores] = useState<Options[]>([]);
//   const [name, setName] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [unity, setUnity] = useState<string>("");
//   const [position, setPosition] = useState<string>("");

//   const dataProps: NewCreateUser = {
//     name,
//     email,
//     unity,
//     position,
//   };

//   const dataTable: TableRegisters = {
//     endpoint: "users",
//     key: "users",
//     roles: ["create_user", "update_user", "delete_user"],
//     tableHeads: [
//       { key: "name", title: "Name", width: 480 },
//       { key: "unity", title: "Store", width: 280 },
//       { key: "position", title: "Role", width: 280 },
//       { key: "actions", title: "Actions", width: 380 },
//     ],
//     tableTitle: "Registered users",
//   };

//   const dataOptionsArea: Options[] = [
//     { name: "Administration", value: "Administration" },
//     { name: "Financial", value: "Financial" },
//     { name: "Sales", value: "Sales" },
//     { name: "Deposit", value: "Deposit" },
//   ];

//   const handleNewUser = async () => {
//     setName("");
//     setEmail("");
//     setUnity("");
//     setPosition("");

//     setStores([]);

//     dispatch({ type: "REGISTER_CHANGE_PERMISSIONS", payload: { permissions: [] } });

//     const resultStores = await api.getRegisters("stores", 0);

//     if (resultStores.stores) {
//       const newStores = resultStores.stores[1].map(
//         (item: { name: string; id: string }) => ({
//           name: item.name,
//           value: item.id,
//         })
//       );
//       setStores(newStores);
//     }

//     dispatch({ type: "MODALREGISTERS_SET_LOADINGREGISTER", payload: { loadingRegister: false } });
//     dispatch({ type: "MODALREGISTERS_SET_OPENEDMODAL", payload: { openedModal: true } });
//   };

//   useEffect(() => {
//     dispatch({ type: "REGISTER_CHANGE_HASERROR", payload: { hasError: false } });
//     dispatch({ type: "REGISTER_CHANGE_PROPS", payload: { props: dataProps } });

//     if (name && email && unity && position) {
//       dispatch({ type: "REGISTER_CHANGE_ISREADY", payload: { isReady: true } });
//     } else {
//       dispatch({ type: "REGISTER_CHANGE_ISREADY", payload: { isReady: false } });
//       dispatch({ type: "REGISTER_CHANGE_ERROR", payload: { error: "You must fill all fields above." } });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [name, email, unity, position]);

//   useEffect(() => {
//     if (state.modalRegisters.editingRegister && state.modalRegisters.registerEditingId) {
//       (async () => {
//         setStores([]);

//         const resultStores = await api.getRegisters("stores", 0);

//         if (resultStores.stores) {
//           const newStores = resultStores.stores[1].map(
//             (item: { name: string; id: string }) => ({
//               name: item.name,
//               value: item.id,
//             })
//           );
//           setStores(newStores);
//         }
//       })();

//       setName(state.register.props.name);
//       setEmail(state.register.props.email);
//       setUnity(state.register.props.unity_id);
//       setPosition(state.register.props.position);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [state.modalRegisters.editingRegister, state.modalRegisters.registerEditingId]);

//   return (
//     <>
//       <CommonSections data={dataTable} handleNew={handleNewUser} />

//       {state.modalRegisters.openedModal && (
//         <ModalRegisters
//           endpoint={state.modalRegisters.editingRegister ? "users" : "users"}
//           type={
//             state.modalRegisters.editingRegister
//               ? "update"
//               : state.modalRegisters.deletingRegister
//                 ? "delete"
//                 : "create"
//           }
//           dataKey="user"
//           title={
//             state.modalRegisters.editingRegister
//               ? "Edit User"
//               : state.modalRegisters.deletingRegister
//                 ? "Delete User"
//                 : "Register User"
//           }
//         >
//           {state.modalRegisters.deletingRegister ? (
//             <p>
//               This process is irreversible and will also delete other data related to this record. Do you wish to continue?
//             </p>
//           ) : (
//             <>
//               <Input
//                 label="Name"
//                 placeholder="User 1"
//                 value={name}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
//               />

//               <Input
//                 label="E-mail"
//                 placeholder="user@email.com"
//                 value={email}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
//               />

//               <Select
//                 label="Store"
//                 dataOptions={stores}
//                 value={unity}
//                 onChange={(e: React.ChangeEvent<{ value: unknown }>) => setUnity(e.target.value as string)}
//               />

//               <Select
//                 label="Role"
//                 dataOptions={dataOptionsArea}
//                 value={position}
//                 onChange={(e: React.ChangeEvent<{ value: unknown }>) => setPosition(e.target.value as string)}
//               />
//             </>
//           )}
//         </ModalRegisters>
//       )}
//     </>
//   );
// };

// export default Users;
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useApi } from "../../hooks/useApi";

import CommonSections from "../../components/CommonSections";
import ModalRegisters from "../../components/ModalRegisters";
import Input from "../../components/ModalRegisters/Input";
import Select from "../../components/ModalRegisters/Select";

import { NewCreateUser } from "../../types/UserCreate";
import { TableRegisters } from "../../types/TableRegisters";

type Options = {
  name: string;
  value: string;
};

const Users = () => {
  const api = useApi();
  const { state, dispatch } = useContext(GlobalContext);

  const [stores, setStores] = useState<Options[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [unity, setUnity] = useState<string>("");
  const [position, setPosition] = useState<string>("");

  const dataProps: NewCreateUser = { name, email, unity, position };

  const dataTable: TableRegisters = {
    endpoint: "users",
    key: "users",
    roles: ["create_user", "update_user", "delete_user"],
    tableHeads: [
      { key: "name", title: "Name", width: 480 },
      { key: "unity", title: "Store", width: 280 },
      { key: "position", title: "Role", width: 280 },
      { key: "actions", title: "Actions", width: 380 },
    ],
    tableTitle: "Registered users",
  };

  const dataOptionsArea: Options[] = [
    { name: "Administration", value: "Administration" },
    { name: "Financial", value: "Financial" },
    { name: "Sales", value: "Sales" },
    { name: "Deposit", value: "Deposit" },
  ];

  const handleNewUser = async () => {
    setName("");
    setEmail("");
    setUnity("");
    setPosition("");

    setStores([]);

    dispatch({ type: "REGISTER_CHANGE_PERMISSIONS", payload: { permissions: [] } });

    const resultStores = await api.getRegisters("stores", 0);

    if (resultStores.stores) {
      const newStores = resultStores.stores[1].map(
        (item: { name: string; id: string }) => ({
          name: item.name,
          value: item.id,
        })
      );
      setStores(newStores);
    }

    dispatch({ type: "MODALREGISTERS_SET_LOADINGREGISTER", payload: { loadingRegister: false } });
    dispatch({ type: "MODALREGISTERS_SET_OPENEDMODAL", payload: { openedModal: true } });
  };

  useEffect(() => {
    dispatch({ type: "REGISTER_CHANGE_HASERROR", payload: { hasError: false } });
    dispatch({ type: "REGISTER_CHANGE_PROPS", payload: { props: dataProps } });

    if (name && email && unity && position) {
      dispatch({ type: "REGISTER_CHANGE_ISREADY", payload: { isReady: true } });
    } else {
      dispatch({ type: "REGISTER_CHANGE_ISREADY", payload: { isReady: false } });
      dispatch({ type: "REGISTER_CHANGE_ERROR", payload: { error: "You must fill all fields above." } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, email, unity, position]);

  useEffect(() => {
    if (state.modalRegisters.editingRegister && state.modalRegisters.registerEditingId) {
      (async () => {
        setStores([]);

        const resultStores = await api.getRegisters("stores", 0);

        if (resultStores.stores) {
          const newStores = resultStores.stores[1].map(
            (item: { name: string; id: string }) => ({
              name: item.name,
              value: item.id,
            })
          );
          setStores(newStores);
        }
      })();

      setName(state.register.props.name);
      setEmail(state.register.props.email);
      setUnity(state.register.props.unity_id);
      setPosition(state.register.props.position);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.modalRegisters.editingRegister, state.modalRegisters.registerEditingId]);

  return (
    <>
      <CommonSections data={dataTable} handleNew={handleNewUser} />

      {state.modalRegisters.openedModal && (
        <ModalRegisters
          endpoint={state.modalRegisters.editingRegister ? "users" : "users"}
          type={
            state.modalRegisters.editingRegister
              ? "update"
              : state.modalRegisters.deletingRegister
                ? "delete"
                : "create"
          }
          dataKey="user"
          title={
            state.modalRegisters.editingRegister
              ? "Edit User"
              : state.modalRegisters.deletingRegister
                ? "Delete User"
                : "Register User"
          }
        >
          {state.modalRegisters.deletingRegister ? (
            <p>
              This process is irreversible and will also delete other data related to this record. Do you wish to continue?
            </p>
          ) : (
            <>
              <Input
                label="Name"
                placeholder="User 1"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              />

              <Input
                label="E-mail"
                placeholder="user@email.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />

              <Select
                label="Store"
                dataOptions={stores}
                value={unity}
                onChange={(e: React.ChangeEvent<{ value: unknown }>) => setUnity(e.target.value as string)}
              />

              <Select
                label="Role"
                dataOptions={dataOptionsArea}
                value={position}
                onChange={(e: React.ChangeEvent<{ value: unknown }>) => setPosition(e.target.value as string)}
              />
            </>
          )}
        </ModalRegisters>
      )}
    </>
  );
};

export default Users;
