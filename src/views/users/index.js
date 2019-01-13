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
  EditButton,
  Show,
  SimpleShowLayout,
  DateField,
  ShowButton,
  SelectInput,
} from 'react-admin';

export const UserList = (props) => (
    <List {...props} filters={<UserFilter />} bulkActionButtons={false}>
        <Datagrid>
            <TextField source="firstName" />
            <TextField source="lastName" />
            <TextField source="otherNames" />
            <TextField source="phone" />
            <TextField source="email" />
            <TextField source="status" />
            <TextField source="roles" />
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
);


const UserRecord = ({ record }) => {
    return <span>User {record? `"${record.firstName} ${record.lastName}"` : ''}</span>;
};

export const UserEdit = (props) => (
    <Edit title={<UserRecord />} {...props}>
        <SimpleForm>
            <TextInput source="firstName" />
            <TextInput source="lastName" />
            <TextInput source="otherNames" />
            <TextInput source="phone" />
            <TextInput source="email" />
            <SelectInput label="Update status" source="status" choices={[
                { id: 'active', name: 'active' },
                { id: 'inactive', name: 'inactive' },
                { id: 'blocked', name: 'blocked' },
                { id: 'frozen', name: 'frozen' },
            ]} />
            <SelectInput label="Update roles" source="roles" choices={[
                { id: 'employee', name: 'employee' },
                { id: 'admin', name: 'admin' },
            ]} />
        </SimpleForm>
    </Edit>
);

export const UserCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
          <TextInput source="firstName" />
          <TextInput source="lastName" />
          <TextInput source="otherNames" />
          <TextInput source="phone" />
          <TextInput source="password" />
          <TextInput source="email" />
          <SelectInput label="Status" source="status" choices={[
              { id: 'active', name: 'active' },
              { id: 'inactive', name: 'inactive' },
              { id: 'blocked', name: 'blocked' },
              { id: 'frozen', name: 'frozen' },
          ]} />
          <SelectInput label="Roles" source="roles" choices={[
              { id: 'employee', name: 'employee' },
              { id: 'admin', name: 'admin' },
          ]} />
        </SimpleForm>
    </Create>
);

export const UserShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="firstName" />
            <TextField source="lastName" />
            <TextField source="otherNames" />
            <TextField source="phone" />
            <TextField source="email" />
            <TextField source="status" />
            <TextField source="roles" />
            <DateField label="Since" source="createdAt" />
            <DateField label="Last updated" source="createdAt" />
        </SimpleShowLayout>
    </Show>
);

const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput source="firstName" />
        <TextInput source="lastName" />
        <TextInput source="email" />
        <TextInput source="roles" />
    </Filter>
);
