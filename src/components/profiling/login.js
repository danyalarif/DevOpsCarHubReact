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
import { useNavigate } from 'react-router-dom';
import http from '../axios';
import { showNotification } from '@mantine/notifications';
  const useStyles = createStyles((theme) => ({
    wrapper: {
      backgroundSize: 'cover',
      minHeight: '100vh',
      backgroundImage:
        'url(https://www.topgear.com/sites/default/files/2022/07/6_0.jpg)',
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
  
  export default function Login() {
    const { classes } = useStyles();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSubmitting, SetIsSubmitting] = useState(false)
    const theme = useMantineTheme()
    const navigate = useNavigate()
    async function getUser() {
      SetIsSubmitting(true)
      try {
        const response = await http.post('/login', {email: email, password: password})
        console.log(response)
              SetIsSubmitting(false)

        if (!response.data.success) {
          showNotification({
            title: 'Error',
            message: 'Invalid email or password',
          })
          return
        }
        if (response.data.role === 'user') {
          localStorage.setItem('user', JSON.stringify(response.data.user))
          navigate('/customer')
        }
        if (response.data.role === 'admin') {
          navigate('/admin')
        }
      } catch(e) {
        console.log(e)

      }
    }
    return (
      <div className={classes.wrapper}>
                  <LoadingOverlay visible={isSubmitting} overlayBlur={2} />

        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
            Welcome back to CarHub!
          </Title>
          <TextInput label="Email address" placeholder="hello@gmail.com" size="md" value={email} onChange={(e) => setEmail(e.target.value)} />
          <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Checkbox label="Keep me logged in" mt="xl" size="md" />
          <Button fullWidth mt="xl" size="md" sx={{backgroundColor: theme.colors.blue[8]}} onClick={() => getUser()}>
            Login
          </Button>
  
          <Text align="center" mt="md">
            Don&apos;t have an account?{' '}
            <Anchor href="#" weight={700} onClick={(event) => {event.preventDefault()
            navigate('/register')}}>
              Register
            </Anchor>
          </Text>
        </Paper>
      </div>
    );
  }
  