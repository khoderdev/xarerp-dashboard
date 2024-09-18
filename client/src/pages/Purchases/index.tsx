import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { useApi } from '../../hooks/useApi';

import CommonSections from '../../components/CommonSections';

import ModalRegisters from '../../components/ModalRegisters';
import Input from '../../components/ModalRegisters/Input';
import Select from '../../components/ModalRegisters/Select';

import { CreatePurchase } from '../../types/Purchase';
import { TableRegisters } from '../../types/TableRegisters';

type Options = {
  name: string;
  value: string;
}

const Purchases = () => {
  const api = useApi();
  const { state, dispatch } = useContext(GlobalContext);

  const [stores, setStores] = useState<Options[]>([]);
  const [providers, setProviders] = useState<Options[]>([]);
  const [products, setProducts] = useState<Options[]>([]);

  const [unity, setUnity] = useState('');
  const [provider, setProvider] = useState('');
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unit_price, setUnit_price] = useState(0);

  const dataProps: CreatePurchase = {
    unity,
    provider,
    product,
    quantity,
    unit_price
  }

  const dataTable: TableRegisters = {
    endpoint: "purchases",
    key: "purchases",
    roles: ['create_purchase', 'update_purchase', 'delete_purchase'],
    tableHeads: [
      {
        key: 'product_name',
        title: 'Product',
        width: 480
      },
      {
        key: 'quantity',
        title: 'Quantity',
        width: 280
      },
      {
        key: 'unit_price_formatted',
        title: 'Unit price',
        width: 280
      },
      {
        key: 'actions',
        title: 'Actions',
        width: 380
      }
    ],
    tableTitle: 'Orders'
  }

  const handleNewPurchase = async () => {
    setUnity('');
    setProvider('');
    setProduct('');
    setQuantity(0);
    setUnit_price(0);

    setStores([]);
    setProviders([]);
    setProducts([]);

    const resultStores = await api.getRegisters('stores', Number(0));
    const resultProviders = await api.getRegisters('providers', Number(0));
    const resultProducts = await api.getRegisters('products', Number(0));

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

    if (resultProviders.providers) {
      resultProviders.providers[1].map((item: { name: string; id: string; }, index: any) => (
        setProviders(oldArray => [...oldArray,
        {
          name: item.name,
          value: item.id
        }
        ])
      ));
    }

    if (resultProducts.products) {
      resultProducts.products[1].map((item: { name: string; id: string; }, index: any) => (
        setProducts(oldArray => [...oldArray,
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
      unity !== '' &&
      provider !== '' &&
      product !== '' &&
      quantity > 0 &&
      unit_price > 0
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
  }, [unity, provider, product, quantity, unit_price]);

  useEffect(() => {
    if (state.modalRegisters.editingRegister && state.modalRegisters.registerEditingId !== '') {
      (async () => {
        setStores([]);
        setProviders([]);
        setProducts([]);

        const resultStores = await api.getRegisters('stores', Number(0));
        const resultProviders = await api.getRegisters('providers', Number(0));
        const resultProducts = await api.getRegisters('products', Number(0));

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

        if (resultProviders.providers) {
          resultProviders.providers[1].map((item: { name: string; id: string; }, index: any) => (
            setProviders(oldArray => [...oldArray,
            {
              name: item.name,
              value: item.id
            }
            ])
          ));
        }

        if (resultProducts.products) {
          resultProducts.products[1].map((item: { name: string; id: string; }, index: any) => (
            setProducts(oldArray => [...oldArray,
            {
              name: item.name,
              value: item.id
            }
            ])
          ));
        }
      })();

      setUnity(state.register.props.unity_id);
      setProvider(state.register.props.provider_id);
      setProduct(state.register.props.product_id);
      setQuantity(state.register.props.quantity);
      setUnit_price(state.register.props.unit_price);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.modalRegisters.editingRegister, state.modalRegisters.registerEditingId]);

  return (
    <>
      <CommonSections data={dataTable} handleNew={handleNewPurchase} />

      {state.modalRegisters.openedModal &&
        <ModalRegisters
          endpoint={state.modalRegisters.editingRegister ? 'purchases' : 'purchases'}
          type={state.modalRegisters.editingRegister ? 'update' : state.modalRegisters.deletingRegister ? 'delete' : 'create'}
          dataKey="purchase"
          title={state.modalRegisters.editingRegister ? 'Edit Purchase' : state.modalRegisters.deletingRegister ? 'Delete Purchase' : 'Add New Purchase'}
        >
          {state.modalRegisters.deletingRegister ? (
            <p>This process is irreversible and will also delete other data related to this record. Do you wish to continue?</p>
          ) : (
            <>

              <Select
                label="Store"
                dataOptions={stores}
                value={unity}
                onChange={(e: any) => setUnity(e.target.value)} />

              <Select
                label="Supplier"
                dataOptions={providers}
                value={provider}
                onChange={(e: any) => setProvider(e.target.value)} />

              <Select
                label="Product"
                dataOptions={products}
                value={product}
                onChange={(e: any) => setProduct(e.target.value)} />

              <Input
                label="Quantity"
                placeholder="5"
                value={quantity > 0 ? quantity : ''}
                onChange={(e: any) => setQuantity(parseInt(e.target.value))} />

              <Input
                label="Unit price"
                placeholder="35"
                value={unit_price > 0 ? unit_price : ''}
                onChange={(e: any) => setUnit_price(parseFloat(e.target.value))} />
            </>
          )}
        </ModalRegisters>
      }

    </>
  );
}

export default Purchases;
