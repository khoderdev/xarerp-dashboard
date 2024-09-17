import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { useApi } from '../../hooks/useApi';
import * as C from './styles';

import CommonSections from '../../components/CommonSections';

import ModalRegisters from '../../components/ModalRegisters';
import Input from '../../components/ModalRegisters/Input';
import Select from '../../components/ModalRegisters/Select';

import { CreateProduct } from '../../types/Product';
import { TableRegisters } from '../../types/TableRegisters';

type Options = {
  name: string;
  value: string;
}

const Products = () => {
  const api = useApi();
  const { state, dispatch } = useContext(GlobalContext);

  const [categories, setCategories] = useState<Options[]>([]);
  const [stores, setStores] = useState<Options[]>([]);
  const [providers, setProviders] = useState<Options[]>([]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [purchase_price, setPurchase_price] = useState(0);
  const [sale_price, setSale_price] = useState(0);
  const [category, setCategory] = useState('');
  const [unity, setUnity] = useState('');
  const [provider, setProvider] = useState('');
  const [lot, setLot] = useState(0);
  const [validity, setValidity] = useState('');
  const [quantity, setQuantity] = useState(0);

  const [isNewCategory, setIsNewCategory] = useState(false);
  const [nameNewCategory, setNameNewCategory] = useState('');
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');

  const dataProps: CreateProduct = {
    name,
    description,
    purchase_price,
    sale_price,
    category,
    unity,
    provider,
    lot,
    validity,
    quantity
  }

  const dataTable: TableRegisters = {
    endpoint: "products",
    key: "products",
    roles: ['create_product', 'update_product', 'delete_product'],
    tableHeads: [
      {
        key: 'name',
        title: 'Name',
        width: 480
      },
      {
        key: 'quantity',
        title: 'Quantity',
        width: 280
      },
      {
        key: 'sale_price_formatted',
        title: 'Unit price',
        width: 280
      },
      {
        key: 'actions',
        title: 'Actions',
        width: 380
      }
    ],
    tableTitle: 'Products'
  }

  const handleNewCategory = async (e: any) => {
    e.preventDefault();

    const result = await api.createRegister('categories', { title: nameNewCategory });

    if (result.category) {
      setCategories(oldArray => [...oldArray,
      {
        name: result.category.title,
        value: result.category.id
      }
      ]);
      setCategory(result.category.id);
      setIsNewCategory(!isNewCategory);
      setHasError(false);
      setError('');
      setNameNewCategory('');
    } else if (result.error) {
      setHasError(true);
      setError(result.error);
    }
  }

  const handleNewProduct = async () => {
    setName('');
    setDescription('');
    setPurchase_price(0);
    setSale_price(0);
    setCategory('');
    setUnity('');
    setProvider('');
    setLot(0);
    setValidity('');
    setQuantity(0);

    setCategories([]);
    setStores([]);
    setProviders([]);

    const resultCategories = await api.getRegisters('categories', Number(0));
    const resultStores = await api.getRegisters('stores', Number(0));
    const resultProviders = await api.getRegisters('providers', Number(0));

    if (resultCategories.categories) {
      resultCategories.categories.map((item: { title: string; id: string; }, index: any) => (
        setCategories(oldArray => [...oldArray,
        {
          name: item.title,
          value: item.id
        }
        ])
      ));
    }

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
      name !== '' &&
      description !== '' &&
      purchase_price > 0 &&
      sale_price > 0 &&
      category !== '' &&
      unity !== '' &&
      provider !== '' &&
      lot > 0 &&
      validity !== '' &&
      quantity > 0
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
          error: 'You must fill all fields above'
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, description, purchase_price, sale_price, category, unity, provider, lot, validity, quantity]);

  useEffect(() => {
    if (state.modalRegisters.editingRegister && state.modalRegisters.registerEditingId !== '') {
      (async () => {
        setCategories([]);
        setStores([]);
        setProviders([]);

        const resultCategories = await api.getRegisters('categories', Number(0));
        const resultStores = await api.getRegisters('stores', Number(0));
        const resultProviders = await api.getRegisters('providers', Number(0));

        if (resultCategories.categories) {
          resultCategories.categories.map((item: { title: string; id: string; }, index: any) => (
            setCategories(oldArray => [...oldArray,
            {
              name: item.title,
              value: item.id
            }
            ])
          ));
        }

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
      })();

      setName(state.register.props.name);
      setDescription(state.register.props.description);
      setPurchase_price(state.register.props.purchase_price);
      setSale_price(state.register.props.sale_price);
      setCategory(state.register.props.category_id);
      setUnity(state.register.props.unity_id);
      setProvider(state.register.props.provider_id);
      setLot(state.register.props.lot);
      setValidity(state.register.props.validity);
      setQuantity(state.register.props.quantity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.modalRegisters.editingRegister, state.modalRegisters.registerEditingId]);

  return (
    <>
      <CommonSections data={dataTable} handleNew={handleNewProduct} />

      {state.modalRegisters.openedModal && (
        <ModalRegisters
          endpoint="products"
          type={state.modalRegisters.editingRegister
            ? 'update'
            : state.modalRegisters.deletingRegister
              ? 'delete'
              : 'create'}
          dataKey="product"
          title={
            state.modalRegisters.editingRegister
              ? 'Edit Product'
              : state.modalRegisters.deletingRegister
                ? 'Delete Product'
                : 'Add New Product'
          }
        >
          {state.modalRegisters.deletingRegister ? (
            <p>This process is irreversible and will also delete other data related to this record. Do you wish to continue?</p>
          ) : (
            <>
              <Input
                label="Name"
                placeholder={
                  state.modalRegisters.editingRegister
                    ? 'Edit Product Name'
                    : 'Product Name'
                }
                value={name}
                onChange={(e: any) => setName(e.target.value)}
              />

              <Input
                label="Description"
                placeholder={
                  state.modalRegisters.editingRegister
                    ? 'Edit Product Description'
                    : 'Product Description'
                }
                textarea={true} // Use textarea
                rows={2}
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
              />

              <Select
                label="Category"
                dataOptions={categories}
                value={category}
                onChange={(e: any) => setCategory(e.target.value)}
              />

              <C.ButtonNewCategory
                onClick={(e: any) => {
                  e.preventDefault();
                  setIsNewCategory(!isNewCategory);
                }}
              >
                New Category
              </C.ButtonNewCategory>

              {isNewCategory && (
                <C.NewCategoryArea>
                  <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Input
                      label="Category Name"
                      placeholder="Drinks, Food.."
                      value={nameNewCategory}
                      onChange={(e: any) => setNameNewCategory(e.target.value)}
                    />
                    <C.ButtonAddNewCategory onClick={handleNewCategory}>
                      +
                    </C.ButtonAddNewCategory>
                  </div>
                  {hasError && <p>{error}</p>}
                </C.NewCategoryArea>
              )}

              <Select
                label="Unit"
                dataOptions={stores}
                value={unity}
                onChange={(e: any) => setUnity(e.target.value)}
              />

              <Input
                label="Purchase Price"
                placeholder="10"
                value={purchase_price > 0 ? purchase_price : ""}
                onChange={(e: any) =>
                  setPurchase_price(parseFloat(e.target.value))
                }
              />

              <Input
                label="Selling Price"
                placeholder="15"
                value={sale_price > 0 ? sale_price : ""}
                onChange={(e: any) => setSale_price(parseFloat(e.target.value))}
              />

              <Select
                label="Supplier"
                dataOptions={providers}
                value={provider}
                onChange={(e: any) => setProvider(e.target.value)}
              />

              <Input
                label="Batch Number"
                placeholder="123456"
                value={lot > 0 ? lot : ''}
                onChange={(e: any) => setLot(parseInt(e.target.value))}
              />

              <Input
                label="Expiry Date"
                placeholder="2022-05-10"
                type="date"
                value={validity}
                onChange={(e: any) => setValidity(e.target.value)}
              />

              <Input
                label="Quantity"
                placeholder="5"
                value={quantity > 0 ? quantity : ''}
                onChange={(e: any) => setQuantity(parseInt(e.target.value))}
              />
            </>
          )}
        </ModalRegisters>
      )}
    </>
  );

}

export default Products;
