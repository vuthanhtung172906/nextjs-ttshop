import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Copyright from "../configs/mui/Copyright";
import Link from "../configs/mui/Link";
import ProTip from "../configs/mui/ProTip";

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js v5-beta with TypeScript example
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
