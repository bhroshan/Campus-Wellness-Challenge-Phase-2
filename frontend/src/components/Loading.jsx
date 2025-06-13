import React from 'react'
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';

function Loading() {
    return (
        <div>
            <Grid container display={'flex'} alignItems={'center'} justifyContent={'center'}>
                <Button loading variant="outlined">
                    Loading
                </Button>
            </Grid>
        </div>
    )
}

export default Loading;