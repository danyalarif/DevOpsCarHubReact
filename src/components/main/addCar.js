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
    FileInput,
    LoadingOverlay
  } from '@mantine/core';
import { useState } from 'react';
import { useMantineTheme } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconUpload } from '@tabler/icons';
import {storage} from "../../firebase"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import http from '../axios';
import { useNavigate } from 'react-router-dom';
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
  
  export default function AddCar() {
    const { classes } = useStyles();
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [files, setFiles] = useState(undefined)
    const theme = useMantineTheme()
    const [isSubmitting, SetIsSubmitting] = useState(false)
    const navigate = useNavigate()
    async function uploadImage(f) {
        const imageupload = f.name
        const storageRef = ref(storage, `${imageupload}`);
        const uploadTask = await uploadBytesResumable(storageRef, f);
        console.log(uploadTask)
        const downloadURL = await getDownloadURL(uploadTask.ref)
        return downloadURL
    }
    async function addCar() {
        if (name.length < 3 || description.length < 5 || price.length === 0) {
            showNotification({
                title: 'Error',
                message: 'Invalid data',
              })
        }
        SetIsSubmitting(true)
        let uri = await uploadImage(files)
        console.log(uri)
        const response = await http.post('/cars/addCar', {name: name, description: description, price: parseInt(price), image: uri})
        console.log(response)
        SetIsSubmitting(false)
        showNotification({
            title: 'Success',
            message: 'Car added!',
          })
    }
    return (
      
        <Paper className={classes.form} radius={0} mr={16} ml={16}>
          <LoadingOverlay visible={isSubmitting} overlayBlur={2} />
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Title order={2} className={classes.title} align="center" mt="md" mb={32}>
            Add Now!
          </Title>
          <Button onClick={() => navigate('/login')}  mt="xl" size="md" sx={{backgroundColor: theme.colors.blue[8]}}>
            Logout
          </Button>
          </div>
          <FileInput label="Car Image" value={files} onChange={setFiles} placeholder="Car Image" accept="image/png,image/jpeg" icon={ <IconUpload size={14} />} />
          <TextInput label="Name" placeholder="Mclarne P1" size="md" mt="md" value={name} onChange={(e) => setName(e.target.value)} />
          <TextInput label="Description" placeholder="Awesome car" size="md" mt='md' value={description} onChange={(e) => setDescription(e.target.value)} />
          <TextInput label="Price" placeholder="100" size="md" mt='md' value={price} onChange={(e) => setPrice(e.target.value)} />
          <Button onClick={() => addCar()} fullWidth mt="xl" size="md" sx={{backgroundColor: theme.colors.blue[8]}}>
            Add Car
          </Button>
                  </Paper>
    );
  }
  