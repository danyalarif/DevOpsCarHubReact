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
    LoadingOverlay
  } from '@mantine/core';
import { useState } from 'react';
import { useMantineTheme } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import http from '../axios';
import {useNavigate} from 'react-router-dom'
  const useStyles = createStyles((theme) => ({
    wrapper: {
      backgroundSize: 'cover',
      minHeight: '100vh',
      backgroundImage:
        'url(https://carwow-uk-wp-3.imgix.net/18015-MC20BluInfinito-scaled-e1666008987698.jpg)',
    },
  
    form: {
      borderRight: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
      }`,
      minHeight: '100vh',
      maxWidth: 450,
      paddingTop: 80,
  
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
  
  export default function Register() {
    const { classes } = useStyles();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const theme = useMantineTheme()
    const navigate = useNavigate()
    const [isSubmitting, SetIsSubmitting] = useState(false)
    async function registerUser() {
        if (name.length < 5 || email.length < 5 || password.length < 5|| confirmPassword.length < 5 || password !== confirmPassword) {
            showNotification({
                title: 'Error',
                message: 'Invalid data',
              })
        }
        SetIsSubmitting(true)
        try {
          const response = await http.post('/register', {name: name, email: email, password: password})
          console.log(response)
          showNotification({
            title: 'Success',
            message: 'User Registered',
          })
          navigate('/login')
        } catch(e) {
          console.log(e)
        }
        SetIsSubmitting(false)
    }
    return (
      <div className={classes.wrapper}>
                  <LoadingOverlay visible={isSubmitting} overlayBlur={2} />
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
            Welcome to CarHub!
          </Title>
          <TextInput label="Name" placeholder="John Smith" size="md" value={name} onChange={(e) => setName(e.target.value)} />
          <TextInput label="Email address" placeholder="hello@gmail.com" size="md" mt='md' value={email} onChange={(e) => setEmail(e.target.value)} />
          <PasswordInput label="Password" placeholder="Create Password" mt="md" size="md" value={password} onChange={(e) => setPassword(e.target.value)} />
          <PasswordInput label="Password" placeholder="Re-enter Password" mt="md" size="md" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <Button onClick={() => registerUser()} fullWidth mt="xl" size="md" sx={{backgroundColor: theme.colors.blue[8]}}>
            Register
          </Button>
  
          <Text align="center" mt="md">
            Already have an account?{' '}
            <Anchor href="#" weight={700} onClick={(event) => {event.preventDefault()
            navigate('/')}}>
              Login
            </Anchor>
          </Text>
        </Paper>
      </div>
    );
  }
  