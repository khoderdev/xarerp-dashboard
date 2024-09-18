import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { useApi } from '../../hooks/useApi';

import CommonSections from '../../components/CommonSections';

import ModalRegisters from '../../components/ModalRegisters';
import Input from '../../components/ModalRegisters/Input';
import Select from '../../components/ModalRegisters/Select';

import { CreateTicket } from '../../types/Ticket';
import { TableRegisters } from '../../types/TableRegisters';

type Options = {
  name: string;
  value: string;
}

const Tickets = () => {
  const api = useApi();
  const { state, dispatch } = useContext(GlobalContext);

  const [stores, setStores] = useState<Options[]>([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [unity, setUnity] = useState('');

  const dataProps: CreateTicket = {
    title,
    description,
    unity
  }

  const dataTable: TableRegisters = {
    endpoint: "tickets",
    key: "tickets",
    roles: ['create_ticket', 'update_ticket', 'delete_ticket'],
    tableHeads: [
      {
        key: 'title',
        title: 'Title',
        width: 480
      },
      {
        key: 'description',
        title: 'Description',
        width: 280
      },
      {
        key: 'status',
        title: 'Status',
        width: 280
      },
      {
        key: 'actions',
        title: 'Actions',
        width: 380
      }
    ],
    tableTitle: 'Tickets'
  }

  const handleNewTicket = async () => {
    setTitle('');
    setDescription('');
    setUnity('');

    setStores([]);

    const resultStores = await api.getRegisters('stores', Number(0));

    if (resultStores.stores) {
      resultStores.stores[1].map((item: { name: string; id: string; }, index: any) => (
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
      title !== '' &&
      description !== '' &&
      unity !== ''
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
  }, [title, description, unity]);

  useEffect(() => {
    if (state.modalRegisters.editingRegister && state.modalRegisters.registerEditingId !== '') {
      (async () => {
        setStores([]);

        const resultStores = await api.getRegisters('stores', Number(0));

        if (resultStores.stores) {
          resultStores.stores[1].map((item: { name: string; id: string; }, index: any) => (
            setStores(oldArray => [...oldArray,
            {
              name: item.name,
              value: item.id
            }
            ])
          ));
        }
      })();

      setTitle(state.register.props.title);
      setDescription(state.register.props.description);
      setUnity(state.register.props.unity_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.modalRegisters.editingRegister, state.modalRegisters.registerEditingId]);

  return (
    <>
      <CommonSections data={dataTable} handleNew={handleNewTicket} />

      {state.modalRegisters.openedModal &&
        <ModalRegisters
          endpoint={state.modalRegisters.editingRegister ? 'tickets' : 'tickets'}
          type={state.modalRegisters.editingRegister ? 'update' : state.modalRegisters.deletingRegister ? 'delete' : 'create'}
          dataKey="ticket"
          title={state.modalRegisters.editingRegister ? 'Edit Ticket' : state.modalRegisters.deletingRegister ? 'Delete Ticket' : 'Add New Ticket'}
        >
          {state.modalRegisters.deletingRegister ? (
            <p>This process is irreversible and will also delete other data related to this record. Do you wish to continue?</p>
          ) : (
            <>
              <Input
                label="Title"
                placeholder="Request product"
                value={title}
                onChange={(e: any) => setTitle(e.target.value)} />

              <Input
                label="Description"
                placeholder="X units of product Y"
                value={description}
                onChange={(e: any) => setDescription(e.target.value)} />

              <Select
                label="Store"
                dataOptions={stores}
                value={unity}
                onChange={(e: any) => setUnity(e.target.value)} />
            </>
          )}
        </ModalRegisters>
      }

    </>
  );
}

export default Tickets;
