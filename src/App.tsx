import React from "react";
import "./styles.css";
import { Container, Typography } from "@material-ui/core";
import Countries from "./containers/Countries";

const App: React.FC = () => (
  <Container>
    <Typography variant="h2" component="h2">
      Tradesy Challenge
    </Typography>
    <Countries url="https://restcountries.eu/rest/v2/region/europe" />
  </Container>
);

export default App;
