import React from 'react';
import {
  List,
  Edit,
  Create,
  Filter,
  SimpleForm,
  Datagrid,
  TextField,
  TextInput,
  ReferenceInput,
  SelectInput,
  ImageInput,
  ImageField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  DateField,
  CloneButton,
} from 'react-admin';



export const ProductList = (props) => (
    <List {...props} filters={<ProductFilter />} bulkActionButtons={false}>
        <Datagrid expand={<ProductEdit />} rowClick="show">
            <TextField source="name"/>
            <ImageField source="image"/>
            { props.permissions === 'admin' ?
                <TextField label="Cost Price per unit (GHS)" source="costPricePerUnit" />
                : ''
            }
            <TextField label="Selling price per unit (GHS)" source="sellingPricePerUnit" />
            <TextField source="quantity"/>
            <TextField source="length" />
            <TextField source="unitOfMeasurement" />
            <ReferenceField label="Category" source="categoryId" reference="categories">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField label="Brand" source="brandId" reference="brands">
                <TextField source="name" />
            </ReferenceField>
            <CloneButton />
        </Datagrid>
    </List>
);


const ProductName = ({ record }) => {
    return <span>Product {record? `"${record.name}"` : ''}</span>;
};

export const ProductEdit = (props) => (
    <Edit title={<ProductName />} {...props}>
        <SimpleForm>
            <TextInput source="name" label="name *"/>
            <TextInput source="quantity" label="Quantity (optional)" />
            <TextInput source="length" />
            <TextInput source="unitOfMeasurement" label="Unit of measure (eg inch, cm)" />
            <TextInput source="description"/>
            <TextInput label="Cost price per unit (GHS)" source="costPricePerUnit" />
            <ReferenceInput label="Category *" source="categoryId" reference="categories">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput label="Brand" source="brandId" reference="brands">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ImageInput source="image" label="Related image">
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Edit>
);


export const ProductShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="name"/>
            <ImageField source="image"/>
            <TextField label="Cost Price per unit (GHS)" source="costPricePerUnit" />
            <TextField label="Selling price per unit" source="sellingPricePerUnit" />
            <TextField source="quantity"/>
            <TextField source="length" />
            <TextField source="unitOfMeasurement" />
            <ReferenceField label="Category" source="categoryId" reference="categories">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField label="Brand" source="brandId" reference="brands">
                <TextField source="name" />
            </ReferenceField>
            <DateField label="Since" source="createdAt" />
            <DateField label="Last updated" source="createdAt" />
        </SimpleShowLayout>
    </Show>
);

export const ProductCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" label="name *"/>
            <TextInput source="quantity" label="Quantity (optional)" />
            <TextInput source="length" />
            <TextInput source="unitOfMeasure" label="Unit of measure (eg inch, cm)" />
            <TextInput label="Cost Price per unit (GHS)" source="costPricePerUnit" />
            <TextInput source="description"/>
            <ReferenceInput label="Category *" source="categoryId" reference="categories">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput label="Brand" source="brandId" reference="brands">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ImageInput source="image" label="Related image">
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Create>
);

const ProductFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Name" source="name"/>
        <ReferenceInput label="Category *" source="categoryId" reference="categories">
            <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput label="Brand" source="brandId" reference="brands">
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);
