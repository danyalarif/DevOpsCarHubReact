import { AppShell, Box, Container, Divider, Text, useMantineTheme, Flex } from "@mantine/core";
import CustomHeader from "../commonComponents/customHeader";
import CarsList from "../commonComponents/carsList";
import { Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import http from "../axios";
import Banner from "../commonComponents/banner";

export default function Home() {
    const theme = useMantineTheme()
    const [cars, setCars] = useState([])
    const navigate = useNavigate()
    async function getCars() {
        try {
            const response = await http.get('/cars/getCars')
            console.log(response)
            setCars(response.data.cars)
        } catch(e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getCars()
    }, [])
    return (
        <>
        <Box mb={24}>
            {cars[0] && <Banner car={cars[0]} callback={() => navigate('/customer/orderNow', {state: {car: cars[0]}})} />}
        </Box>
        <Box ml={16} mr={16}>
            <Flex><span  style={{border: `5px solid ${theme.colors.blue[8]}`, marginRight: 12}}></span><Text fw='500' sx={{fontSize: 28, color: theme.colors.blue[8]}}>Popular Cars</Text></Flex>
            <Divider mt={4} size='xs' sx={{backgroundColor: theme.colors.blue[8]}} />
            <CarsList cars={cars} />
        </Box>
        </>
    )
}