import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';

import CommonSections from '../../components/CommonSections';

import ModalRegisters from '../../components/ModalRegisters';
import Input from '../../components/ModalRegisters/Input';
import Select from '../../components/ModalRegisters/Select';

import { CreateStore } from '../../types/Store';
import { TableRegisters } from '../../types/TableRegisters';

const Stores = () => {
  const { state, dispatch } = useContext(GlobalContext);

  const [name, setName] = useState('');
  const [type, setType] = useState('Branch');

  const dataProps: CreateStore = {
    name,
    type
  }

  const dataOptionsStore = [
    {
      name: 'Headquarter',
      value: 'Headquarter'
    },
    {
      name: 'Branch',
      value: 'Branch'
    },
    {
      name: 'Franchise',
      value: 'Franchise'
    },
    {
      name: 'Reseller',
      value: 'Reseller'
    }
  ]

  const dataTable: TableRegisters = {
    endpoint: "stores",
    key: "stores",
    roles: ['create_store', 'update_store', 'delete_store'],
    tableHeads: [
      {
        key: 'name',
        title: 'Name',
        width: 280
      },
      {
        key: 'type',
        title: 'Type',
        width: 280
      },
      {
        key: 'actions',
        title: 'Actions',
        width: 180
      }
    ],
    tableTitle: 'Registered stores'
  }

  const handleNewStore = () => {
    setName('');
    setType('Branch');
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

    if (name !== '' && type !== '') {
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
  }, [name, type]);

  useEffect(() => {
    if (state.modalRegisters.editingRegister && state.modalRegisters.registerEditingId !== '') {
      setName(state.register.props.name);
      setType(state.register.props.type);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.modalRegisters.editingRegister, state.modalRegisters.registerEditingId]);

  return (
    <>
      <CommonSections data={dataTable} handleNew={handleNewStore} />

      {state.modalRegisters.openedModal &&
        <ModalRegisters
          endpoint={state.modalRegisters.editingRegister ? 'stores' : 'stores'}
          type={state.modalRegisters.editingRegister ? 'update' : state.modalRegisters.deletingRegister ? 'delete' : 'create'}
          dataKey="store"
          title={state.modalRegisters.editingRegister ? 'Edit Store' : state.modalRegisters.deletingRegister ? 'Delete stock' : 'Register stock'}
        >
          {state.modalRegisters.deletingRegister ? (
            <p>This process is irreversible and will also delete other data related to this record. Do you wish to continue?</p>
          ) : (
            <>
              <Input label="Name" placeholder="Store 1" value={name || ''} onChange={(e: any) => setName(e.target.value)} />
              <Select label="Type" dataOptions={dataOptionsStore} value={type || ''} onChange={(e: any) => setType(e.target.value)} />
            </>
          )}
        </ModalRegisters>
      }

    </>
  );
}

export default Stores;
