import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
// import profilePic from '../assets/styles/images/profile_pic.jpg'

export default function ImageAvatars({ img, avatarSource }) {

  return (
    <Stack direction="row" spacing={2}>
      <Avatar className= {avatarSource} alt="Profile Picture" src={img}/>
    </Stack>
  );
}