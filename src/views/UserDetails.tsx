import React, {useCallback, useEffect, useState} from 'react';
import DashboardLayout from '../layouts/Dashboard';
import Box from "@mui/material/Box";
import { useParams,useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import {User} from '../types/User';
import {usersApi} from '../api/users-api';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { Error } from '../types/Error';

const UserDetails = (): JSX.Element => {

  let { id } = useParams();
  let navigate = useNavigate();

  const[isEditUser,setIsEditUser] = useState<boolean>(false)

  const[errorObject,setErrorObject] = useState<Error>({
    error:false,
    message:'',
  })

  const [user, setUser] = useState<User>({
    avatar: '',
    email: '',
    id: 0,
    name: '',
    role: ''
  });

  const handleEditUser = async () => {
    setIsEditUser(!isEditUser)
    
    if (isEditUser && user.id){

      try{
        const userResponse = await usersApi.updateUser(user.id,user)
        if('error' in userResponse && userResponse.error){
            setErrorObject({
              error: userResponse.error,
              message: userResponse.message
            })
        }
      } catch (e){
        console.log(e)
      }

    }
    ;
  }
  async function  handleDeleteUser() {
    await usersApi.deleteUser(user.id as number),
    navigate('/users');
  }

  const getUser = useCallback(async () => {
    if (id) {
      const userResponse = await usersApi.getUserById(id);
      setUser(userResponse);

    }
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <DashboardLayout>
      <Box
        display="flex"
        justifyContent="center"
      >
        <Stack spacing={2}>

          {
            errorObject.error &&
            <Alert severity="error">{errorObject.message}</Alert>
          }
        <Card
          variant="outlined"
          sx={{
            width: 500,
            borderColor: 'blue',
            textAlign: 'center'
          }}
        >
          <Avatar alt={user.name}
            src={user.avatar}
            sx={{
              width:'80px',
              height:'80px',
              display:'flex',
              margin:'auto'
            }}/>

            

          <Typography variant='h6'gutterBottom>
            <strong>User Id: </strong>  {user.id}
          </Typography>

          <Typography variant='h6'gutterBottom>
            <strong>UserName:{' '}</strong>
            {
              isEditUser ? (
              <TextField
                 variant='outlined' 
                 size="small" 
                 value={user.name}
                 onChange={(event: React.ChangeEvent<HTMLInputElement>) =>{
                  setUser({...user,name:event.target.value})
                  }
                 }
                 />): user.name
                  
            }
          </Typography>

          
          
          <Typography variant='h6'gutterBottom>
            <strong>Email:</strong> {user.email}
          </Typography>

          <Typography variant='h6'gutterBottom>
            <strong>Role:</strong> {user.role}
          </Typography>

        </Card>
        <Stack spacing={2}
        direction="row"
        justifyContent="center">

        <Button variant="contained" onClick={handleEditUser}>{isEditUser ? 'Save' : 'Edit'}</Button>
        <Button variant="contained"onClick={handleDeleteUser} >DELETE</Button> 
        </Stack>
 
        </Stack>
      </Box>
    </DashboardLayout>
  );
};

export default UserDetails;
