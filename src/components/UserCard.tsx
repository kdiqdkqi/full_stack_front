import React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


const UserCard =(): JSX.Element => {

return(
    <Card
        variant="outlined"
        sx={{
            width: 275,
            borderColor: 'blueviolet',
        }}
    >
        <CardContent>
            <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{ width: 78, height: 78 }}
                >
                    A
                </Avatar>
                <Stack>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                role
                </Typography>
                <Typography variant="h5" component="div">
                Name
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                email
                </Typography>
                </Stack>
            </Stack>
        </CardContent>
    </Card>
);

};

export default UserCard;