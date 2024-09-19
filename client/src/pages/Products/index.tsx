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
import { AuthContext } from '../../contexts/auth/AuthContext';

type Options = {
  name: string;
  value: string;
}

const Products = () => {
  const api = useApi();
  const auth = useContext(AuthContext);
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

  const canViewProductsRoles = ['Administration', 'Deposit'];
  const canAddProductsRoles = ['Administration'];
  const canEditProductsRoles = ['Administration'];
  const canDeleteProductsRoles = ['Administration'];

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
    endpoint: 'products',
    key: 'products',
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

  const handleNewCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await api.createRegister('categories', { title: nameNewCategory });

    if (result.category) {
      setCategories(oldArray => [...oldArray, { name: result.category.title, value: result.category.id }]);
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

    const resultCategories = await api.getRegisters('categories', 0);
    const resultStores = await api.getRegisters('stores', 0);
    const resultProviders = await api.getRegisters('providers', 0);

    if (resultCategories.categories) {
      setCategories(resultCategories.categories.map(item => ({
        name: item.title,
        value: item.id
      })));
    }

    if (resultStores.stores) {
      setStores(resultStores.stores.map(item => ({
        name: item.name,
        value: item.id
      })));
    }

    if (resultProviders.providers) {
      setProviders(resultProviders.providers.map(item => ({
        name: item.name,
        value: item.id
      })));
    }

    dispatch({
      type: 'MODALREGISTERS_SET_LOADINGREGISTER',
      payload: { loadingRegister: false }
    });
    dispatch({
      type: 'MODALREGISTERS_SET_OPENEDMODAL',
      payload: { openedModal: true }
    });
  }

  useEffect(() => {
    dispatch({
      type: 'REGISTER_CHANGE_HASERROR',
      payload: { hasError: false }
    });
    dispatch({
      type: 'REGISTER_CHANGE_PROPS',
      payload: { props: { ...dataProps } }
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
        payload: { isReady: true }
      });
    } else {
      dispatch({
        type: 'REGISTER_CHANGE_ISREADY',
        payload: { isReady: false }
      });
      dispatch({
        type: 'REGISTER_CHANGE_ERROR',
        payload: { error: 'You must fill all fields above' }
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

        const resultCategories = await api.getRegisters('categories', 0);
        const resultStores = await api.getRegisters('stores', 0);
        const resultProviders = await api.getRegisters('providers', 0);

        if (resultCategories.categories) {
          setCategories(resultCategories.categories.map(item => ({
            name: item.title,
            value: item.id
          })));
        }

        if (resultStores.stores) {
          setStores(resultStores.stores.map(item => ({
            name: item.name,
            value: item.id
          })));
        }

        if (resultProviders.providers) {
          setProviders(resultProviders.providers.map(item => ({
            name: item.name,
            value: item.id
          })));
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

      {canViewProductsRoles.includes(auth.user?.position ?? '') && (
        <>
          {state.modalRegisters.openedModal && (
            <>
              {canAddProductsRoles.includes(auth.user?.position ?? '') && (
                <ModalRegisters
                  endpoint="products"
                  type={state.modalRegisters.editingRegister
                    ? 'update'
                    : state.modalRegisters.deletingRegister
                      ? 'delete'
                      : 'create'}
                  dataKey="product"
                  title={state.modalRegisters.editingRegister
                    ? 'Edit Product'
                    : state.modalRegisters.deletingRegister
                      ? 'Delete Product'
                      : 'Add New Product'}
                >
                  {state.modalRegisters.deletingRegister ? (
                    <p>This process is irreversible and will also delete other data related to this record. Do you wish to continue?</p>
                  ) : (
                    <>
                      <Input
                        label="Name"
                        placeholder={state.modalRegisters.editingRegister
                          ? 'Edit Product Name'
                          : 'Product Name'}
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} disabled={false} />

                      <Input
                        label="Description"
                        placeholder={state.modalRegisters.editingRegister
                          ? 'Edit Product Description'
                          : 'Product Description'}
                        textarea={true} // Use textarea
                        rows={2}
                        value={description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} disabled={false} />

                      <Select
                        label="Category"
                        dataOptions={categories}
                        value={category}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
                      />

                      <C.ButtonNewCategory
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.preventDefault();
                          setIsNewCategory(!isNewCategory);
                        }}
                      >
                        Add New Category
                      </C.ButtonNewCategory>

                      {isNewCategory && (
                        <form onSubmit={handleNewCategory}>
                          <Input
                            label="New Category Name"
                            value={nameNewCategory}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameNewCategory(e.target.value)} placeholder={''} disabled={false} />
                          <C.ButtonAddNewCategory type="submit">Add Category</C.ButtonAddNewCategory>
                        </form>
                      )}

                      <Input
                        label="Purchase Price"
                        type="number"
                        placeholder={state.modalRegisters.editingRegister
                          ? 'Edit Purchase Price'
                          : 'Purchase Price'}
                        value={purchase_price}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPurchase_price(Number(e.target.value))} disabled={false} />

                      <Input
                        label="Sale Price"
                        type="number"
                        placeholder={state.modalRegisters.editingRegister
                          ? 'Edit Sale Price'
                          : 'Sale Price'}
                        value={sale_price}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSale_price(Number(e.target.value))} disabled={false} />

                      <Select
                        label="Store"
                        dataOptions={stores}
                        value={unity}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setUnity(e.target.value)}
                      />

                      <Select
                        label="Provider"
                        dataOptions={providers}
                        value={provider}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setProvider(e.target.value)}
                      />

                      <Input
                        label="Lot"
                        type="number"
                        placeholder={state.modalRegisters.editingRegister
                          ? 'Edit Lot Number'
                          : 'Lot Number'}
                        value={lot}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLot(Number(e.target.value))} disabled={false} />

                      <Input
                        label="Validity"
                        placeholder={state.modalRegisters.editingRegister
                          ? 'Edit Validity Date'
                          : 'Validity Date'}
                        type="date"
                        value={validity}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValidity(e.target.value)} disabled={false} />

                      <Input
                        label="Quantity"
                        type="number"
                        placeholder={state.modalRegisters.editingRegister
                          ? 'Edit Quantity'
                          : 'Quantity'}
                        value={quantity}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(Number(e.target.value))} disabled={false} />
                    </>
                  )}
                </ModalRegisters>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default Products;