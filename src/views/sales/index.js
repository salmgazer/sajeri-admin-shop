import React from 'react';
import {
  List,
  Edit,
  Filter,
  Create,
  SimpleForm,
  Datagrid,
  TextField,
  EditButton,
  SelectInput,
  ArrayInput,
  NumberInput,
  Show,
  SimpleFormIterator,
  SimpleShowLayout,
  DateInput,
  DateField,
  ReferenceInput,
  ArrayField,
  ReferenceField,
  SaveButton,
  Toolbar,
  FunctionField,
  EmailField,
  FormDataConsumer,
} from 'react-admin';
import PhoneIcon from '@material-ui/icons/Phone';
import { Divider, Button, CardActions } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

export const SaleList = (props) => (
    <List {...props} filters={<SaleFilter />} bulkActionButtons={false}>
        <Datagrid expand={<SaleEdit />} rowClick="show">
            <TextField source="type" />
            <EmailField source="salesPerson" />
            <DateField label="Created" source="createdAt" />
            <DateField label="Updated" source="createdAt" />
            <ReferenceField label="Customer" source="customerId" reference="customers">
                <FullNameField />
            </ReferenceField>
            <ReferenceField label="Phone" source="customerId" reference="customers">
                <TextField source="phone"/>
            </ReferenceField>
            <TextField label="Total Cost Price (GHS)" source="totalCostPrice" />
            <TextField label="Total Selling Price (GHS)" source="totalSellingPrice" />
            <TextField label="Profit (GHS)" source="profit" />
        </Datagrid>
    </List>
);


const SaleId = ({ record }) => {
    return <span>Sale: {record? `${record.id}"` : ''}</span>;
};

const SaleEditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
    </Toolbar>
);

const FullNameField = ({ record }) => <span>{record.firstName} {record.lastName}</span>;
const FullNamePhoneField = ({ record }) => 
    <span>{record.firstName} {record.lastName} - {record.phone}</span>;

export const SaleEdit = (props) => (
    <Edit title={<SaleId />} {...props}>
        <SimpleForm toolbar={<SaleEditToolbar />}>
            <SelectInput source="type" choices={[
                { id: 'sale', name: 'Sale' },
                { id: 'invoice', name: 'Invoice' },
            ]} />
            <ReferenceInput label="Customer" reference="customers" source="customerId">
                <SelectInput optionText={<FullNamePhoneField />} />
            </ReferenceInput>
            <h3 style={{color: "green", width: '100%'}}>Purchased Products</h3>
            <hr style={{width: '100%'}} />
            <ArrayInput source="products" reference="products" choices="products">
                <SimpleFormIterator>
                    <ReferenceInput label="Product" reference="products" source="products.id">
                        <SelectInput optionText={<ProductNamePrice />} />
                    </ReferenceInput>
                    <NumberInput source="quantity" />
                    <NumberInput source="length" step={2} />
                </SimpleFormIterator>
            </ArrayInput>
            <h3 style={{color: "red", width: "100%"}}>Returned Products</h3>
            <hr style={{width: "100%"}}/>
            <ArrayInput label="Product" source="returnedProducts" reference="returnedProducts" choices="returnedProducts">
                <SimpleFormIterator>
                    <ReferenceInput reference="products" label="" source="products.id" label="Product">
                        <SelectInput optionText={<ProductNamePrice/>} />
                    </ReferenceInput>
                    <NumberInput source="quantity" />
                    <NumberInput source="length" step={2} />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);

const ProductNamePrice = ({ record }) => <span>{record.name} (CP: GHS{record.costPricePerUnit}&nbsp;&nbsp; - &nbsp;&nbsp;SP: GHS{record.sellingPricePerUnit })</span>;

export const SaleCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <SelectInput source="type" choices={[
                { id: 'sale', name: 'Sale' },
                { id: 'invoice', name: 'Invoice' },
            ]} />
            <ReferenceInput label="Customer" reference="customers" source="customerId">
                <SelectInput optionText={<FullNamePhoneField />} />
            </ReferenceInput>
            <ArrayInput source="products" reference="products" choices="products">
                <SimpleFormIterator>
                    <ReferenceInput label="Product" reference="products" source="products.id">
                        <SelectInput optionText={<ProductNamePrice />} />
                    </ReferenceInput>
                    <NumberInput source="quantity" />
                    <NumberInput source="length" step={2} />
                    <Divider component='li' style={{ width: '100%' }}/>
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);


const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const SaleShowActions = ({ basePath, data, resource }) => (
    <CardActions style={cardActionStyle}>
        <EditButton basePath={basePath} record={data} />
        {/* Add your custom actions */}
        <Button
            style={{ backgroundColor: "orange", color: "white" }}
            onClick={printReceipt}
        >
            Print
        </Button>
    </CardActions>
);

const printReceipt = () => {
    const content = document.getElementById("receipt-area");
    console.log(content);
    content.print();
}

export const SaleShow = (props) => (
    <Show actions={<SaleShowActions />} {...props}>
        <SimpleShowLayout id="receipt-area">
            <TextField source="type" />
            <ArrayField source="products">
                <Datagrid>
                    <ReferenceField label="Product" source="products.id" reference="products">
                        <TextField source="name" />
                    </ReferenceField>
                    <ReferenceField label="Price" source="products.id" reference="products">
                        <TextField source="sellingPricePerUnit" />
                    </ReferenceField>
                    <TextField source="quantity" />
                    <TextField source="length" />
                    <FunctionField label="Total" render={record => `${record.quantity * record.sellingPricePerUnit}`} />
                </Datagrid>
            </ArrayField>
            <OrderTotal style={{marginTop: '15px'}} />
            <DateField label="Since" source="createdAt" />
            <DateField label="Last updated" source="createdAt" />
        </SimpleShowLayout>
    </Show>
);


const totalPerProduct = ({ record }, props) => <span>{record.sellingPricePerUnit * props.quantity}</span>
const OrderTotal = ({ record }) => <span>Total: GHS {record.totalSellingPrice}</span>


const SaleFilter = (props) => (
    <Filter {...props}>
        <SelectInput label="type" source="type" choices={[
            { id: 'invoice', name: 'invoice' },
            { id: 'sale', name: 'sale' },
        ]} />
        <DateInput source="createdAt" />
    </Filter>
);
