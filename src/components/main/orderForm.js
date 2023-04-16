import {
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Title,
    Text,
    Anchor,
    Image,
    Select,
    Flex,
    LoadingOverlay
  } from '@mantine/core';
import { useState } from 'react';
import { useMantineTheme } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useLocation, useNavigate } from 'react-router-dom';
import http from '../axios';
  const useStyles = createStyles((theme) => ({
    form: {
      [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
        maxWidth: '100%',
      },
    },
  
    title: {
      color: theme.colors.blue[8],
    },
  
    logo: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      width: 120,
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }));
  
  export default function OrderForm() {
    const { classes } = useStyles();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [quantity, setQuantity] = useState('')
    const theme = useMantineTheme()
    const [isSubmitting, SetIsSubmitting] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const car = location.state.car
    async function createOrder() {
        if (name.length < 3 || email.length < 5 || address.length < 3 || phoneNo.length < 5 || quantity.length === 0) {
            showNotification({
                title: 'Error',
                message: 'Invalid data',
              })
        }
        SetIsSubmitting(true)
        const val = localStorage.getItem('user')
        if (val == null) {
          navigate('/login')
        }
        const user = JSON.parse(val)
        const response = await http.post('/orders/addOrder', {userid: user._id, name: name, email: email, address: address, phoneNo: phoneNo, quantity: quantity, carid: car._id})
        console.log(response)
        SetIsSubmitting(false)
    }
    return (
        <Paper className={classes.form} radius={0}>
                    <LoadingOverlay visible={isSubmitting} overlayBlur={2} />
          <Title order={2} className={classes.title} align="center" mt="md" mb={32}>
            Order Now!
          </Title>
          <Flex justify={'center'}>
            <Image src={car.image} mb={24} radius={'md'} width={280} height={200} />
          </Flex>
          <TextInput label="Name" placeholder="John Smith" size="md" value={name} onChange={(e) => setName(e.target.value)} />
          <TextInput label="Email address" placeholder="hello@gmail.com" size="md" mt='md' value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextInput label="Address" placeholder="Dina, Jhelum" size="md" mt='md' value={address} onChange={(e) => setAddress(e.target.value)} />
          <TextInput label="Phone Number" placeholder="03405053118" size="md" mt='md' value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
          <Select
          mt={'md'}
            label="Quantity"
            placeholder="Pick one"
            nothingFound="No options"
            data={['1', '2', '3', '4', '5']}
            value={quantity}
            onChange={setQuantity}
            />
          <Button onClick={() => createOrder()} fullWidth mt="xl" size="md" sx={{backgroundColor: theme.colors.blue[8]}}>
            Order Now
          </Button>
                  </Paper>
    );
  }
  