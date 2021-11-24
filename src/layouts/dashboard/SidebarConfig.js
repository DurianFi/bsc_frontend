import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'swap & stake',
    path: '/swapandstake',
    icon: getIcon('eva:swap-outline')
  },
  {
    title: 'stake',
    path: '/stake',
    icon: getIcon('grommet-icons:stakeholder')
  },
  {
    title: 'trade',
    path: '',
    href: 'https://quickswap.exchange/#/swap?outputCurrency=0x8035647FEdc2636e543c098e83A5D3490caC180b',
    icon: getIcon('fluent:people-swap-20-filled')
  },
  {
    title: 'LP Pool',
    path: '',
    href: 'https://quickswap.exchange/#/add/ETH/0x8035647FEdc2636e543c098e83A5D3490caC180b',
    icon: getIcon('grommet-icons:storage')
  },
  {
    title: 'explorer',
    path: '',
    href: 'https://polygonscan.com/token/0x8035647FEdc2636e543c098e83A5D3490caC180b',
    icon: getIcon('ant-design:file-search-outlined')
  },
  {
    title: 'reddit',
    path: '',
    href: 'https://www.reddit.com/r/DurianFi/',
    icon: getIcon('akar-icons:reddit-fill')
  },


];

export default sidebarConfig;
