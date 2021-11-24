import { Icon } from '@iconify/react';
import windowsFilled from '@iconify/icons-ant-design/windows-filled';
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
  color: theme.palette.warning.darker,
  backgroundColor: theme.palette.warning.lighter
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
  color: theme.palette.warning.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.warning.dark, 0)} 0%, ${alpha(
    theme.palette.warning.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 1723315;

export default function ({wallet}) {
  const TOTAL = needlogin(wallet)==false?parseFloat(wallet.view.getmystake)/1e18:0;

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon="grommet-icons:stakeholder" width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{needlogin(wallet)?<Skeleton  width={100} style={{margin:'auto'}}/>:fShortenNumber(TOTAL>0.00001?TOTAL:0)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Total Stake
      </Typography>
      <Typography style={{fontSize:12}} variant="p">($ {needlogin(wallet)==false?wallet.view.totalvaluestake:0})</Typography>
    </RootStyle>
  );
}
