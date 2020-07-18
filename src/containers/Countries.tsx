import React, { useState, useEffect } from "react";
import axios from "axios";
import { Country } from "../types";
import { CircularProgress } from "@material-ui/core";
import CountryList from "../components/CountryList";

export interface Props {
  url: string;
}

const Countries: React.FC<Props> = ({ url }) => {
  const [countries, setCountries] = useState([] as Country[]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded && !loading) {
      axios
        .get(url)
        .then(({ data }: { data: Country[] }) => {
          setCountries(data);
          setLoading(false);
          setLoaded(true);
        })
        .catch(() => {
          setLoading(false);
          setLoaded(false);
        });
    }
  }, [loaded, loading, url]);

  useEffect(() => {
    if (!loaded && !loading) {
      setLoading(true);
    }
  }, [loaded, loading]);

  return loading ? (
    <>
      Loading... <CircularProgress />
    </>
  ) : (
    <CountryList countries={countries} />
  );
};

export default Countries;
