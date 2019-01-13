import React from 'react';
import { Admin, Resource } from 'react-admin';

import Dashboard from './views/dashboard';
import { CategoryList, CategoryShow, CategoryEdit, CategoryCreate } from './views/categories';
import { ProductList, ProductShow, ProductEdit, ProductCreate } from './views/products';
import { PriceList, PriceEdit, PriceCreate, PriceShow } from './views/prices';
import { UserList, UserShow, UserEdit, UserCreate } from './views/users';
import { CustomerList, CustomerShow, CustomerEdit, CustomerCreate } from './views/customers';
import {SaleList, SaleShow, SaleEdit, SaleCreate } from './views/sales';
import {BrandList, BrandShow, BrandEdit, BrandCreate} from './views/brands';
import feathersClient from './feathersClient';
import { restClient, authClient } from 'ra-data-feathers';

import UsersIcon from '@material-ui/icons/GroupAdd';
import CategoryIcon from '@material-ui/icons/NaturePeople';
import SaleIcon from '@material-ui/icons/AddShoppingCart';
import CurrencyIcon from '@material-ui/icons/AttachMoney';
import CountriesIcon from '@material-ui/icons/Map';
import CommunitiesIcon from '@material-ui/icons/Place';
import ProductsIcon from '@material-ui/icons/PlaylistAdd';
import OrgnizationsIcon from '@material-ui/icons/Store';


const restClientOptions = {
  'users': { id: 'id' }
};

const authClientOptions = {
  storageKey: 'feathers-jwt',
  authenticate: { strategy: 'local' },
};

const App = () => (
  <Admin
    dashboard={Dashboard}
    dataProvider={restClient(feathersClient, restClientOptions)}
    authProvider={authClient(feathersClient, authClientOptions)}
    >
    { permissions => [
      <Resource name="sales" list={SaleList} show={SaleShow} edit={SaleEdit} create={SaleCreate} icon={SaleIcon} />,
      <Resource name="categories" list={CategoryList} show={CategoryShow} edit={CategoryEdit} create={CategoryCreate} icon={CategoryIcon} />,
      <Resource name="products" list={ProductList} show={ProductShow} edit={ProductEdit} create={ProductCreate} icon={ProductsIcon} />,
      <Resource name="prices" list={PriceList} show={PriceShow} edit={ permissions === 'admin' ? PriceEdit: '' } create={PriceCreate} icon={ProductsIcon} />,
      <Resource name="brands" list={BrandList} show={BrandShow} edit={BrandEdit} create={BrandCreate} icon={ProductsIcon} />,
      <Resource name="customers" list={CustomerList} show={CustomerShow} edit={CustomerEdit} create={CustomerCreate} icon={UsersIcon} />,
      permissions === 'admin' ?
      <Resource name="users" list={UserList} show={UserShow} create={UserCreate} edit={UserEdit} icon={UsersIcon} /> : null,
      ]
    }
  </Admin>
);

export default App;
