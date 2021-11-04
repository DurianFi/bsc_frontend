// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';

import scene from '../asset/scene.jpg';



// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid>
        </Grid>
        <br/>
        <br/>
        <h1>123</h1>
        <br/>
        <p>You can broaden the appeal of your SharePoint Framework client-side web part by localizing it for different languages spoken by SharePoint users all over the world. In this article, you'll localize a web part to the Dutch (Netherlands) locale, and verify that the localized values are displayed correctly.</p>

        <br/>
        <br/>
        <img src={scene} style={{borderRadius:15}}/>

        <br/>
        <br/>
        <h1>123</h1>
        <br/>
        <p>You can broaden the appeal of your SharePoint Framework client-side web part by localizing it for different languages spoken by SharePoint users all over the world. In this article, you'll localize a web part to the Dutch (Netherlands) locale, and verify that the localized values are displayed correctly.</p>
        <br/>


        <br/>
        <br/>
        <h1>123</h1>
        <br/>
        <p>You can broaden the appeal of your SharePoint Framework client-side web part by localizing it for different languages spoken by SharePoint users all over the world. In this article, you'll localize a web part to the Dutch (Netherlands) locale, and verify that the localized values are displayed correctly.</p>
        <br/>


        <br/>
        <br/>
        <h1>123</h1>
        <br/>
        <p>You can broaden the appeal of your SharePoint Framework client-side web part by localizing it for different languages spoken by SharePoint users all over the world. In this article, you'll localize a web part to the Dutch (Netherlands) locale, and verify that the localized values are displayed correctly.</p>
        <br/>




      </Container>
    </Page>
  );
}
