import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import dummyData from './DummyData/dummyData.json';
import NavigationTab from './components/NavigationTab';
import ItemCard from './components/ItemCard';
// import BrandContainer from './components/BrandContainer';
import Header from './components/Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Header />
        <NavigationTab data={dummyData}/>
        {/* container */}
        {/* pagination */}

        {/* footer */}
        {/* <BrandContainer /> */}
    </React.StrictMode>
);

