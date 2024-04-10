import React from 'react'
import { Grid, IconButton, InputAdornment, TextField } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const Input = ({name, handleChange, half, label, autoFocus, type, handleShowPassword}) => {
  return (
    <Grid item xs={half? 6:12} sm={ half ? 6:12}>
        <TextField
            name={name}
            label={label}
            onChange={handleChange}
            variant='outlined'
            required
            fullWidth
            autoFocus={autoFocus}
            type={type}
            InputProps={name === 'password'  ? {
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton onClick={handleShowPassword}>
                            {type === 'password' ? <Visibility/> :<VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                )
            }: null}
        />
    </Grid>
  )
}

export default Input