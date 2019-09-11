import React from 'react';
import { createSelector } from 'reselect'
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
} from 'react-admin';
import { Divider, Button, CardActions } from '@material-ui/core';


// import { useReactTable } from "react-table";
import ReactDOMServer from 'react-dom/server';


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
            {// check if type is sale before
            }
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
    <CardActions style={cardActionStyle} id="show-button-area">
        <EditButton basePath={basePath} record={data} />
        {/* Add your custom actions */}
        <Button
            style={{ backgroundColor: "orange", color: "white" }}
            onClick={() => printReceipt(data)}
        >
            Print
        </Button>
    </CardActions>
);

export const SaleShow = (props) => (
    <Show  name="divcontents" actions={<SaleShowActions />} {...props}>
        <SimpleShowLayout>
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
                    <FunctionField label="Total" render={record => `${record.quantity * record.sellingPricePerUnit}`}/>
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

// const Receipt = ({ record }, props) =>  <span>{JSON.stringify(record)}</span>;

const SaleFilter = (props) => (
    <Filter {...props}>
        <SelectInput label="type" source="type" choices={[
            { id: 'invoice', name: 'invoice' },
            { id: 'sale', name: 'sale' },
        ]} />
        <DateInput source="createdAt" />
    </Filter>
);



const printReceipt = (data) => {
    console.log(data);
    var content = document;
    content = content.getElementsByName("divcontents")[0];
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    // pri.document.write(content.innerHTML);
    // const showButtonArea = pri.document.getElementById('show-button-area');
    // showButtonArea.parentNode.removeChild(showButtonArea);
    

    const productsSelector = state => state.admin.resources.products.data;
    console.log(productsSelector);
    const htmlString = ReactDOMServer.renderToStaticMarkup(
        <ReceiptContent
            products={createSelector(
                productsSelector,
                items => items
            )}
            salesData={data}
        />
    );
    
    // pri.document.write(content.innerHTML);
    pri.document.write(htmlString);

    /*
    var label = pri.document.getElementsByTagName("span"), anotherIndex;
    for (anotherIndex = label.length - 1; anotherIndex >= 0; anotherIndex--) {
        label[anotherIndex].setAttribute("style", "margin-top: 50px !important, font-weight: bold !important");
    }

    var element = pri.document.getElementsByTagName("svg"), index;
    for (index = element.length - 1; index >= 0; index--) {
        element[index].parentNode.removeChild(element[index]);
    }

    var table = pri.document.getElementsByTagName('table'), anIndex;
    for (anIndex= table.length - 1; anIndex >= 0; anIndex--) {
        table[anIndex].setAttribute("style",
            "border: 1px solid #000 !important; border-collapse: collapse; margin-bottom: 80px, border-bottom: 150px !important"
        );
    }

    var td = pri.document.getElementsByTagName('td'), anotherIndex;
    for (anotherIndex= td.length - 1; anotherIndex >= 0; anotherIndex--) {
        td[anotherIndex].setAttribute("style",
            "border: 1px solid #000 !important; border-collapse: collapse;"
        );
    }

    var th = pri.document.getElementsByTagName('th'), aIndex;
    for (aIndex= th.length - 1; aIndex >= 0; aIndex--) {
        th[aIndex].setAttribute("style",
            "border: 1px solid #000 !important; border-collapse: collapse;"
        );
    }
    */
    
    console.log(pri.document);
    pri.document.close();
    pri.focus();
    pri.print();
}
const tableStyle = {
    fontFamily: 'Trebuchet MS, Arial, Helvetica, sans-serif',
    borderCollapse: 'collapse',
    width: '100%'
};

const thStyle = {
    paddingTop: '12px',
    paddingBottom: '12px',
    textAlign: 'left',
    backgroundColor: '#4CAF50',
    color: 'white'
};

const ReceiptContent = ({ customers, products, users, salesData}) =>
        <html>
            <head>
                <style>
                
                </style>
            </head>
            <body>
                <label>Type: {salesData.type}</label>
                <table style={tableStyle}>
                    <tr
                    style={{
                        border: '1px solid #ddd',
                        padding: '8px'
                    }}
                    >
                        <th style={thStyle}>Product</th>
                        <th style={thStyle}>Price</th>
                        <th style={thStyle}>Quantity</th>
                        <th style={thStyle}>Length</th>
                        <th style={thStyle}>Total</th>
                    </tr>
                    {
                        salesData.products.map((productEnt) => {
                            console.log("================");
                            console.log(productEnt);
                            console.log("================");
                            console.log(products);

                            const product = products.find(product => product.id === productEnt.id);
                            return <tr>
                                    <td>{product.name}</td>
                                    <td>{productEnt.sellingPricePerUnit}</td>
                                    <td>{productEnt.quantity}</td>
                                    <td>{productEnt.length || '---'}</td>
                                    <td>{productEnt.sellingPricePerUnit * productEnt.quantity}</td>
                                </tr>
                        })
                    }
                </table>
            </body>
        </html>
    ;