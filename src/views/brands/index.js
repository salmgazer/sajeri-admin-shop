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
  Show,
  SimpleShowLayout,
  DateField,
  CloneButton,
  RichTextField,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

export const BrandList = (props) => (
    <List {...props} filters={<BrandFilter />}  bulkActionButtons={false}>
        <Datagrid expand={<BrandEdit />} rowClick="show">
            <TextField source="name" />
            <CloneButton />
        </Datagrid>
    </List>
);


const BrandName = ({ record }) => {
    return <span>Brand: {record? `"${record.name}"` : ''}</span>;
};

export const BrandEdit = (props) => (
    <Edit title={<BrandName />} {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <RichTextInput source="notes" />
        </SimpleForm>
    </Edit>
);

export const BrandCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
          <TextInput source="name" />
          <RichTextInput source="notes" />
        </SimpleForm>
    </Create>
);


export const BrandShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="name" />
            <RichTextField source="notes" />
            <DateField label="Since" source="createdAt" />
            <DateField label="Last updated" source="createdAt" />
        </SimpleShowLayout>
    </Show>
);

const BrandFilter = (props) => (
    <Filter {...props}>
      <TextInput source="name" />
    </Filter>
);
