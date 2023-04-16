import {
  AppShell,
  Box,
  Container,
  Divider,
  Text,
  useMantineTheme,
  TextInput,
  Flex,
} from "@mantine/core";
import CustomHeader from "../commonComponents/customHeader";
import CarsList from "../commonComponents/carsList";
import { Routes } from "react-router-dom";
import { IconSearch } from "@tabler/icons";
import { useState, useEffect } from "react";
import http from "../axios";

export default function Search() {
  const theme = useMantineTheme();
  const [search, setSearch] = useState("");
  const [cars, setCars] = useState([])
  const [originalCars, setOriginalCars] = useState([])
  async function getCars() {
    try {
        const response = await http.get('/cars/getCars')
        console.log(response)
        setOriginalCars(response.data.cars)
        setCars(response.data.cars)
    } catch(e) {
        console.log(e)
    }
}
useEffect(() => {
    getCars()
}, [])

useEffect(() => {
  if (search.length === 0) {
    setCars(originalCars)
    return
  }
  setCars(originalCars)
  setCars(cars.filter((car) => {
    return car.name.toLowerCase().includes(search.toLowerCase())
  }))
}, [search])

  return (
    <Box ml={16} mr={16}>
        <Flex mb={32} justify={'center'}>
      <TextInput
      sx={{width: '50%'}}
        label="Search"
        placeholder="Your keyterm"
        icon={<IconSearch size={14} />}
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      </Flex>
      <CarsList cars={cars} />
    </Box>
  );
}
