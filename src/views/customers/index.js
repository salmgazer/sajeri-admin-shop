import React from 'react';
import {
  List,
  Edit,
  Create,
  Show,
  Filter,
  SelectInput,
  SimpleForm,
  Datagrid,
  TextField,
  TextInput,
  ListButton,
  SimpleShowLayout,
  DateField,
  RichTextField,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';


export const CustomerList = (props) => (
    <List {...props} filters={<CustomerFilter />} bulkActionButtons={false}>
        <Datagrid expand={<CustomerEdit />} rowClick="show">
            <TextField source="firstName" />
            <TextField source="lastName" />
            <TextField source="credit" />
            <TextField source="gender" />
            <TextField source="phone" />
            <TextField source="company" />
            <TextField source="address" />
            <RichTextField source="about" />
        </Datagrid>
    </List>
);


const CustomerName = ({ record }) => {
    return <span>Customer: {record? `${record.firstName} ${record.lastName}` : ''}</span>;
};

export const CustomerEdit = (props) => (
    <Edit title={<CustomerName />} {...props}>
        <SimpleForm>
            <TextInput source="firstName" />
            <TextInput source="lastName" />
            <SelectInput label="Update gender" source="gender" choices={[
                { id: 'female', name: 'Female' },
                { id: 'male', name: 'Male' },
            ]} />
            <TextInput source="phone" />
            <TextInput source="company" />
            <TextInput source="address" />
            <RichTextInput source="about" resettable/>
        </SimpleForm>
    </Edit>
);

export const CustomerCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <ListButton/>
            <TextInput source="firstName" />
            <TextInput source="lastName" />
            <TextInput source="phone" />
            <SelectInput source="gender" choices={[
                { id: 'female', name: 'Female' },
                { id: 'male', name: 'Male' },
            ]} />
            <TextInput source="company" />
            <TextInput source="address" />
            <RichTextInput source="about" resettable/>
        </SimpleForm>
    </Create>
);

const CustomerFilter = (props) => (
    <Filter {...props}>
        <TextInput source="firstName" />
        <TextInput source="lastName" />
        <TextInput source="phone" />
        <SelectInput source="gender" choices={[
            { id: 'female', name: 'Female' },
            { id: 'male', name: 'Male' },
        ]} />
        <TextInput source="company" />
    </Filter>
);

export const CustomerShow = (props) => (
    <Show title={<CustomerName />} {...props}>
        <SimpleShowLayout>
            <TextField source="firstName" />
            <TextField source="lastName" />
            <TextField source="phone" />
            <TextField source="gender" />
            <TextField source="company" />
            <RichTextField source="address" />
            <RichTextField source="about" />
            <DateField label="Since" source="createdAt" />
            <DateField label="Last updated" source="createdAt" />
        </SimpleShowLayout>
    </Show>
);
