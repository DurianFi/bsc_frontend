import { Icon } from '@iconify/react';
import androidFilled from '@iconify/icons-ant-design/android-filled';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
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
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------


export default function AppWeeklySales({wallet}) {

  const TOTAL = wallet.address?wallet.view.balanceOf/1e18:0;

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon="cib:azure-pipelines"  />

      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(TOTAL>0.00001?TOTAL:0)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        DurianFi
      </Typography>
    </RootStyle>
  );
}
