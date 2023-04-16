import { Image, List, Text, Box, useMantineTheme, Flex, Button } from "@mantine/core"
import { IconTrashX } from "@tabler/icons"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import http from "../axios"

export default function Orders() {
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const theme = useMantineTheme()
    async function getOrders() {
        const val = localStorage.getItem('user')
        if (val == null) {
            navigate('/login')
        }
        const user = JSON.parse(val)
        const response = await http.get('/orders/getOrder/' + user._id)
        console.log(response)
        setOrders(response.data.orders)
    }
    async function deleteOrder(id) {
        const response = await http.get('/orders/deleteOrder/' + id)
        console.log(response)
        getOrders()
    }
    useEffect(() => {
        getOrders()
    }, [])
    return (
        <div style={{marginTop: 50}}>
      {
        orders.map(o => {
            return (
                <Box mb={10} sx={{ borderRadius: 15, padding: 16, boxShadow: "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;", width: 600,}} >
                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                        <Box mr={24}>
                            <Image src={o.carid.image} height={150} width={150} radius='lg' />
                        </Box>
                        <Box mt={15} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                            <Text sx={{color: theme.colors.blue[8], fontSize: 24, fontStyle: 'italic'}}>{o.carid.name}</Text>
                            <Flex><Text sx={{ fontSize: 20, fontStyle: 'italic'}} mr={4}>Quantity:</Text><Text sx={{ fontSize: 20, fontStyle: 'italic', color: theme.colors.blue[8]}}>{' x' + o.quantity}</Text></Flex>
                            <Text sx={{color: theme.colors.blue[8], fontSize: 24, fontStyle: 'italic'}}>Rs. {o.carid.price * o.quantity}</Text>
                        </Box>
                        <Box mt={15} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                            <Flex>
                                <Text sx={{ fontSize: 20, fontStyle: 'italic'}} mr={4}>Ordered By:</Text>
                                <Text sx={{color: theme.colors.blue[8], fontSize: 20, fontStyle: 'italic'}}>{o.name}</Text>
                                
                            </Flex>
                            <Flex>
                                <Text sx={{ fontSize: 20, fontStyle: 'italic'}} mr={4}>Ordered Date:</Text>
                                <Text sx={{color: theme.colors.blue[8], fontSize: 20, fontStyle: 'italic'}}>{o.createdAt.substring(0, 10)}</Text>
                            </Flex>
                            <Flex>
                                <Text sx={{ fontSize: 20, fontStyle: 'italic'}} mr={4}>Order Time:</Text>
                                <Text sx={{color: theme.colors.blue[8], fontSize: 20, fontStyle: 'italic'}}>{o.createdAt.substring(11, 19)}</Text>
                            </Flex>
                        </Box>
                    </Box>
                    <Flex justify={'center'} align={'center'} mt={8}>
                        <Button variant="gradient" gradient={{ from: 'red', to: 'red' }} onClick={() => deleteOrder(o._id)}><IconTrashX height={18} width={18}></IconTrashX><Text ml={4}>DELETE</Text></Button>
                    </Flex>
                    

                </Box>
            )
        })
      }
        </div>
    )
}