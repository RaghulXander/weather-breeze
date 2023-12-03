import React, { Suspense, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { GoogleMap, useJsApiLoader, useGoogleMap } from '@react-google-maps/api';
// atoms
import { Loader } from '../atoms/Loader/Loader';
import { Header } from '../templates/Header/Header';

// Lazy load application chunks
const DashboardView = React.lazy(async () => await import('./Dashboard/Dashboard'));


const Root: React.FC = () => {
  const [loading, setLoading] = useState(true);
  //const location = useLocation();
  //const navigate = useNavigate();
  //const dispatch = useDispatch();

  console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? ""
  })

  //const [loading] = useGoogleMapsApi({ library: "places" });

  if (!isLoaded) return <Loader />;

	return (
	  <Suspense fallback={<Loader />}>
			<Header />
			<main>
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
	  </Suspense>

  );
};

export default Root;
