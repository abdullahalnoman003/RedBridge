import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../Components/Shared/Navbar';
import Footer from '../../Components/Shared/Footer';
import useDocumentTitle from '../../Hooks/useDocumentTitle';

const HomeLayout = () => {
    useDocumentTitle("RedBridge - Bridge for saving life!")
    return (
        <div>
            <nav><Navbar></Navbar> </nav>
            <main className='min-h-[70vh] mt-15'><Outlet></Outlet></main>
            <footer><Footer></Footer> </footer>
        </div>
    );
};

export default HomeLayout;