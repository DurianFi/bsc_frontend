import { Icon } from '@iconify/react';
import appleFilled from '@iconify/icons-ant-design/apple-filled';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import {needlogin} from '../../../App.js'
import Skeleton from '@mui/material/Skeleton';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
    theme.palette.info.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------


export default function AppNewUsers({wallet}) {

  const TOTAL = needlogin(wallet)==false?wallet.view.mintamount/1e18:0;
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon="si-glyph:shovel" />
      </IconWrapperStyle>
      <Typography variant="h3">{needlogin(wallet)?<Skeleton  width={100} style={{margin:'auto'}}/>:fShortenNumber(TOTAL>0.00001?TOTAL:0)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Harvest Amount
      </Typography>
      <Typography style={{fontSize:12}} variant="p">($ {needlogin(wallet)==false?wallet.view.totalvalueharvest:0})</Typography>
    </RootStyle>
  );
}
