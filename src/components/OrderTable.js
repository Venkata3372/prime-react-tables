import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';

const OrderTable = ({ tableType }) => {
  const [orders, setOrders] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const [editDialogVisible, setEditDialogVisible] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users'); // Using placeholder data
    const data = await response.json();
    const ordersData = data.map(user => ({
      id: user.id,
      customerName: user.name,
      orderDate: new Date().toLocaleDateString(),
      status: 'Pending',
      amount: Math.floor(Math.random() * 1000)
    }));

    // Repeat the data until we have at least 100 rows
    const repeatedOrders = [];
    while (repeatedOrders.length < 100) {
      repeatedOrders.push(...ordersData);
    }
    setOrders(repeatedOrders.slice(0, 100));
  };

  const onGlobalFilterChange = (e) => {
    setGlobalFilter(e.target.value);
  };

  const onRowEditInit = (event) => {
    setEditingRow(event.data);
    setEditDialogVisible(true);
  };

  const onRowEditSave = () => {
    setEditDialogVisible(false);
  };

  const onRowEditCancel = () => {
    setEditDialogVisible(false);
  };

  const tableProps = {
    value: orders,
    paginator: true,
    rows: 10,
    globalFilter: globalFilter,
    responsiveLayout: tableType === 'responsive' || tableType === 'all' ? "scroll" : undefined,
    editable: tableType === 'editable' || tableType === 'all'
  };

  return (
    <div className="order-table">
      <Toolbar className="p-mb-4">
        <div className="p-toolbar-group-left">
          <InputText
            type="search"
            onInput={onGlobalFilterChange}
            placeholder="Global Search"
          />
        </div>
      </Toolbar>
      <DataTable {...tableProps}>
        <Column field="id" header="ID" sortable={tableType === 'sorted' || tableType === 'all'} filter={tableType === 'filterable' || tableType === 'all'} />
        <Column field="customerName" header="Customer Name" sortable={tableType === 'sorted' || tableType === 'all'} filter={tableType === 'filterable' || tableType === 'all'} />
        <Column field="orderDate" header="Order Date" sortable={tableType === 'sorted' || tableType === 'all'} filter={tableType === 'filterable' || tableType === 'all'} />
        <Column field="status" header="Status" sortable={tableType === 'sorted' || tableType === 'all'} filter={tableType === 'filterable' || tableType === 'all'} />
        <Column
          field="amount"
          header="Amount"
          sortable={tableType === 'sorted' || tableType === 'all'}
          filter={tableType === 'filterable' || tableType === 'all'}
          editor={tableType === 'editable' || tableType === 'all' ? (options) => (
            <InputNumber
              value={options.value}
              onValueChange={(e) => options.editorCallback(e.value)}
            />
          ) : null}
        />
        {(tableType === 'editable' || tableType === 'all') && (
          <Column
            rowEditor
            headerStyle={{ width: '7rem' }}
            bodyStyle={{ textAlign: 'center' }}
            onRowEditInit={onRowEditInit}
          />
        )}
      </DataTable>
      {tableType === 'editable' && (
        <Dialog
          visible={editDialogVisible}
          style={{ width: '450px' }}
          header="Edit Order"
          modal
          footer={
            <div>
              <Button label="Cancel" icon="pi pi-times" onClick={onRowEditCancel} />
              <Button label="Save" icon="pi pi-check" onClick={onRowEditSave} />
            </div>
          }
          onHide={() => setEditDialogVisible(false)}
        >
          <div className="p-grid p-fluid">
            <div className="p-col-4">
              <label htmlFor="amount">Amount</label>
            </div>
            <div className="p-col-8">
              <InputNumber
                id="amount"
                value={editingRow ? editingRow.amount : ''}
                onValueChange={(e) =>
                  setEditingRow({ ...editingRow, amount: e.value })
                }
              />
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default OrderTable;
