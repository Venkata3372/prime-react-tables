import React from 'react';
import './Sidebar.css'; // Add this line to import styles

const Sidebar = ({ selectedTable, setSelectedTable }) => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li className={selectedTable === 'paginated' ? 'active' : ''} onClick={() => setSelectedTable('paginated')}>Paginated Table</li>
          <li className={selectedTable === 'responsive' ? 'active' : ''} onClick={() => setSelectedTable('responsive')}>Responsive Table</li>
          <li className={selectedTable === 'sorted' ? 'active' : ''} onClick={() => setSelectedTable('sorted')}>Sorted Table</li>
          <li className={selectedTable === 'editable' ? 'active' : ''} onClick={() => setSelectedTable('editable')}>Editable Table</li>
          <li className={selectedTable === 'filterable' ? 'active' : ''} onClick={() => setSelectedTable('filterable')}>Filterable Table</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
