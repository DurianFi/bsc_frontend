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
    href: 'https://pancakeswap.finance/swap?outputCurrency=0xF8789137EfDEA4359B148f59505C8a61Ce141BD7',
    icon: getIcon('fluent:people-swap-20-filled')
  },
  {
    title: 'LP Pool',
    path: '',
    href: 'https://pancakeswap.finance/add/BNB/0xF8789137EfDEA4359B148f59505C8a61Ce141BD7',
    icon: getIcon('grommet-icons:storage')
  },
  // {
  //   title: 'explorer',
  //   path: '',
  //   href: 'https://bscscan.com/token/0xf8789137efdea4359b148f59505c8a61ce141bd7',
  //   icon: getIcon('ant-design:file-search-outlined')
  // },


];

export default sidebarConfig;
