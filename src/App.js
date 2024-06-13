import React, { useState } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';  // or any other theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import OrderTable from './components/OrderTable';

const App = () => {
  const [selectedTable, setSelectedTable] = useState('paginated');

  const renderTable = () => {
    switch (selectedTable) {
      case 'paginated':
        return <OrderTable tableType="paginated" />;
      case 'responsive':
        return <OrderTable tableType="responsive" />;
      case 'sorted':
        return <OrderTable tableType="sorted" />;
      case 'editable':
        return <OrderTable tableType="editable" />;
      case 'filterable':
        return <OrderTable tableType="filterable" />;
      default:
        return <OrderTable tableType="paginated" />;
    }
  };

  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <Sidebar selectedTable={selectedTable} setSelectedTable={setSelectedTable} />
        {renderTable()}
      </div>
      <Footer />
    </div>
  );
};

export default App;
