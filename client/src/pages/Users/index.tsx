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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [unity, setUnity] = useState("");
  const [position, setPosition] = useState("");

  const dataProps: NewCreateUser = {
    name,
    email,
    unity,
    position,
  };

  const dataTable: TableRegisters = {
    endpoint: "users",
    key: "users",
    roles: ["create_user", "update_user", "delete_user"],
    tableHeads: [
      {
        key: "name",
        title: "Name",
        width: 480,
      },
      {
        key: "unity",
        title: "Store",
        width: 280,
      },
      {
        key: "position",
        title: "Role",
        width: 280,
      },
      {
        key: "actions",
        title: "Actions",
        width: 380,
      },
    ],
    tableTitle: "Users",
  };

  const dataOptionsArea = [
    {
      name: "Administration",
      value: "Administration",
    },
    {
      name: "Financial",
      value: "Financial",
    },
    {
      name: "Sales",
      value: "Sales",
    },
    {
      name: "Deposit",
      value: "Deposit",
    },
  ];

  const handleNewUser = async () => {
    setName("");
    setEmail("");
    setUnity("");
    setPosition("");

    setStores([]);

    dispatch({
      type: "REGISTER_CHANGE_PERMISSIONS",
      payload: {
        permissions: [],
      },
    });

    const resultStores = await api.getRegisters("stores", Number(0));

    if (resultStores.stores) {
      resultStores.stores[1].map((item: { name: string; id: string }) =>
        setStores((oldArray) => [
          ...oldArray,
          {
            name: item.name,
            value: item.id,
          },
        ])
      );
    }

    dispatch({
      type: "MODALREGISTERS_SET_LOADINGREGISTER",
      payload: {
        loadingRegister: false,
      },
    });
    dispatch({
      type: "MODALREGISTERS_SET_OPENEDMODAL",
      payload: {
        openedModal: true,
      },
    });
  };

  useEffect(() => {
    dispatch({
      type: "REGISTER_CHANGE_HASERROR",
      payload: {
        hasError: false,
      },
    });
    dispatch({
      type: "REGISTER_CHANGE_PROPS",
      payload: {
        props: { ...dataProps },
      },
    });

    if (name !== "" && email !== "" && unity !== "" && position !== "") {
      dispatch({
        type: "REGISTER_CHANGE_ISREADY",
        payload: {
          isReady: true,
        },
      });
    } else {
      dispatch({
        type: "REGISTER_CHANGE_ISREADY",
        payload: {
          isReady: false,
        },
      });
      dispatch({
        type: "REGISTER_CHANGE_ERROR",
        payload: {
          error: "You must fill all fields above.",
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, email, unity, position]);

  useEffect(() => {
    if (
      state.modalRegisters.editingRegister &&
      state.modalRegisters.registerEditingId !== ""
    ) {
      (async () => {
        setStores([]);

        const resultStores = await api.getRegisters("stores", Number(0));

        if (resultStores.stores) {
          resultStores.stores[1].map(
            (item: { name: string; id: string }) =>
              setStores((oldArray) => [
                ...oldArray,
                {
                  name: item.name,
                  value: item.id,
                },
              ])
          );
        }
      })();

      setName(state.register.props.name);
      setEmail(state.register.props.email);
      setUnity(state.register.props.unity_id);
      setPosition(state.register.props.position);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.modalRegisters.editingRegister,
    state.modalRegisters.registerEditingId,
  ]);

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
                : "Add New User"
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
                placeholder="user 1"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
              />

              <Input
                label="E-mail"
                placeholder="user@email.com"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />

              <Select
                label="Warehouse"
                dataOptions={stores}
                value={unity}
                onChange={(e: any) => setUnity(e.target.value)}
              />

              <Select
                label="Role"
                dataOptions={dataOptionsArea}
                value={position || ""}
                onChange={(e: any) => setPosition(e.target.value)}
              />
            </>
          )}
        </ModalRegisters>
      )}
    </>
  );
};

export default Users;
