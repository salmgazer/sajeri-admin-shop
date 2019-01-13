import React from 'react';
import {
    List,
    Edit,
    Create,
    Filter,
    ReferenceInput,
    ReferenceField,
    SelectInput,
    SimpleForm,
    Datagrid,
    TextField,
    TextInput,
    NumberInput,
    Show,
    SimpleShowLayout,
    CloneButton,
} from 'react-admin';

export const PriceList = (props) => (
    <List {...props} filters={<PriceFilter />} bulkActionButtons={false}>
        <Datagrid expand={props.permissions === 'admin' ? <PriceEdit/> : <PriceShow />} rowClick="show">
            <TextField label="Price" source="amount" />
            <ReferenceField label="Product" source="productId" reference="products">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="createdAt" />
            <TextField source="updatedAt" />
            <CloneButton />
        </Datagrid>
    </List>
);


export const PriceShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField label="price" source="amount" />
            <ReferenceField label="product" source="productId" reference="products">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="createdAt" />
            <TextField source="updatedAt" />
        </SimpleShowLayout>
    </Show>
);

const PriceName = ({ record }) => {
    return <span>Price {record? `"${record.name}"` : ''}</span>;
};

export const PriceEdit = (props) => (
    <Edit title={<PriceName />} {...props}>
        <SimpleForm>
            <TextInput source="amount" />
            <ReferenceInput label="product" source="productId" reference="products">
                <SelectInput source="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const PriceCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <NumberInput label="Price (GHS)" source="amount" step={2} />
            <ReferenceInput label="Product" source="productId" reference="products">
                <SelectInput source="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

const PriceFilter = (props) => (
    <Filter {...props}>
        <TextInput source="amount"/>
        <ReferenceInput label="product" source="productId" reference="products">
            <SelectInput source="name" />
        </ReferenceInput>
    </Filter>
);
