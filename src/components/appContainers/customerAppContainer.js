import { AppShell, Box, Container, Divider, Text, useMantineTheme } from "@mantine/core";
import CustomHeader from "../commonComponents/customHeader";
import CarsList from "../commonComponents/carsList";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "../main/home";
import Search from "../main/search";
import OrderForm from "../main/orderForm";
import Orders from "../main/orders";
import { useEffect } from "react";
import Footer from "../main/footer";
function Logout() {
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.removeItem('user')
        navigate('/login')
    }, [])
    return (
        <></>
    )
}
const navLinks = [
    {
      label: 'Home',
      link: '/customer'
    },
    {
      label: 'Cars',
      link: '/customer/cars'
    },
    {
      label: 'Orders',
      link: '/customer/orders'
    },
    {
      label: 'Logout',
      link: '/customer/logout'
    }
  ]
export default function CustomerAppContainer() {
    const theme = useMantineTheme()
    return (
        <AppShell  header={<CustomHeader />} footer={<Footer links={navLinks} />} >
            <Routes sx={{minHeight: '90vh'}}>
                <Route path='/' element={<Home />}></Route>
                <Route path='/cars' element={<Search />}></Route>
                <Route path='/orderNow' element={<OrderForm />}></Route>
                <Route path='/orders' element={<Orders />}></Route>
                <Route path='/logout' element={<Logout />}></Route>

            </Routes>
        </AppShell>
    )
}