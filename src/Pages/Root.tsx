import React, { Suspense, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// atoms
import { Loader } from '../atoms/Loader/Loader';

// Lazy load application chunks
const DashboardView = React.lazy(async () => await import('./Dashboard/Dashboard'));


const Root: React.FC = () => {
  const [loading, setLoading] = useState(true);
  //const location = useLocation();
  //const navigate = useNavigate();
  //const dispatch = useDispatch();

  if (loading) return <div className="h-full sm:px-8 md:px-10 lg:px-16 xl:px-24 2xl:px-32 overflow-auto"><Loader /></div>;

  if (window.location.pathname === '/') return <DashboardView />;

	return (
	  <Suspense fallback={<Loader />}>
			<div className="h-full sm:px-8 md:px-10 lg:px-16 xl:px-24 2xl:px-32 overflow-auto">
			{/*<Header />*/}
			<main className="flex basis-1/2 justify-center align-center pb-4 pt-12">
				<Routes>
				<Route path="/" element={<DashboardView />} />
				</Routes>
			</main>
			{/*<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>*/}
			</div>
	  </Suspense>

  );
};

export default Root;
