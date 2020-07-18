import React from "react";
import CommaNumber from "comma-number";
import { Country } from "../types";
import slugify from "../utils/slugify";

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  CardActionArea,
  Link,
  Typography
} from "@material-ui/core";

export interface Props {
  name: Country["name"];
  flag: Country["flag"];
  subregion: Country["subregion"];
  capital: Country["capital"];
  population: Country["population"];
  languages: Country["languages"];
}

const CountryCard: React.FC<Props> = ({
  name,
  flag,
  subregion,
  capital,
  population,
  languages
}) => (
  <Card>
    <CardActionArea>
      <CardMedia component={`img`} image={flag} />
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography color="textSecondary">{subregion}</Typography>
        <Typography variant="body2" component="div">
          <b>Capital:</b> {capital}
        </Typography>
        <Typography variant="body2" component="div">
          <b>Total Population:</b> {CommaNumber(population)}
        </Typography>
        <Typography variant="body2" component="div">
          <b>Number of Languages:</b> {languages.length}
        </Typography>
        <Typography variant="body2" component="div">
          <b>Primary Language:</b> {languages[0].name}
        </Typography>
      </CardContent>
    </CardActionArea>

    <CardActions>
      <Link href={`https://www.lonelyplanet.com/${slugify(name)}`}>
        <Button size="small">Learn More</Button>
      </Link>
    </CardActions>
  </Card>
);

export default CountryCard;
