import React, { createContext, useState, useEffect } from "react";

import { useSelector } from "react-redux";

export const DataContext = createContext();

export const DataProvider = (props) => {
	const [productos, setProductos] = useState([]);
	const [menu, setMenu] = useState(false);
	const [favs, setFavs] = useState(false);
	const [favorites, setFavorites] = useState([]);
	const [carrito, setCarrito] =useState([]);
	const [total, setTotal] = useState(0);
	const {productsCart} = useSelector(selector => selector.cart);
	

  useEffect(() => {
		const producto = productsCart;
		if(producto){
			setProductos(producto)
		}else{
			setProductos([])
		}
	}, []);

	useEffect(() =>{
		 const getTotal = () =>{
		 	const res = carrito?.reduce((prev, item) =>{
		 		return prev + (item.price * item.cantidad)
		 	},0)
		 	setTotal(res)
		 }
		 getTotal()
	},[carrito])
	
	const value = {
		productos : [productos],
		menu: [menu, setMenu],
		favs: [favs, setFavs],
		carrito: [carrito, setCarrito],
		total: [total, setTotal],
		favorites: [favorites, setFavorites]
	}
	return (
		<DataContext.Provider value={value}>
			{props.children}
		</DataContext.Provider>
	)
};
