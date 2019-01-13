import React from 'react';
import {
  List,
  Edit,
  Filter,
  Create,
  SimpleForm,
  Datagrid,
  TextField,
  TextInput,
  ImageInput,
  ImageField,
  Show,
  SimpleShowLayout,
  DateField,
} from 'react-admin';

export const CategoryList = (props) => (
    <List {...props} filters={<CategoryFilter />} bulkActionButtons={false}>
        <Datagrid expand={<CategoryEdit />} rowClick="show">
            <TextField source="name" />
            <ImageField source="image" />
        </Datagrid>
    </List>
);


const CategoryName = ({ record }) => {
    return <span>Category {record? `"${record.name}"` : ''}</span>;
};

export const CategoryEdit = (props) => (
    <Edit title={<CategoryName />} {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <ImageInput source="image" label="Related image" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Edit>
);

export const CategoryCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
          <TextInput source="name" />
          <ImageInput source="image" label="Related image" accept="image/*">
            <ImageField source="src" title="title" />
          </ImageInput>
        </SimpleForm>
    </Create>
);


export const CategoryShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="name" />
            <ImageField source="image" />
            <DateField label="Since" source="createdAt" />
            <DateField label="Last updated" source="createdAt" />
        </SimpleShowLayout>
    </Show>
);

const CategoryFilter = (props) => (
    <Filter {...props}>
      <TextInput source="name" />
    </Filter>
);
