import React, { useState } from "react";
import pick from "lodash.pick";
import uniqBy from "lodash.uniqby";
import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  Input,
  FormHelperText,
  Select,
  MenuItem,
  Checkbox
} from "@material-ui/core";
import { Country } from "../types";
import CountryCard from "./CountryCard";

export interface Props {
  countries: Country[];
}

const CountryList: React.FC<Props> = ({ countries }) => {
  const sortableFields = ["name", "population"];
  const [search, setSearch] = useState("");
  const [selectedSubregion, setSelectedSubregion] = useState("");
  const [selectedMinLangs, setSelectedMinLangs] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [sortReverse, setSortReverse] = useState(false);

  const handleSearch = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(value);
  };

  const handleSubregion = ({
    target: { value }
  }: React.ChangeEvent<{
    name?: string | undefined;
    value: unknown;
  }>) => {
    setSelectedSubregion(String(value));
  };

  const handleMinLangs = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMinLangs(Number(value));
  };

  const handleSortBy = ({
    target: { value }
  }: React.ChangeEvent<{
    name?: string | undefined;
    value: unknown;
  }>) => {
    setSortBy(String(value));
  };

  const handleSortReverse = ({
    target: { checked }
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSortReverse(!!checked);
  };

  const subregions: Array<Country["subregion"]> = uniqBy(
    countries,
    "subregion"
  ).map((country: Country) => country.subregion);

  const searchMatch = (value: string) =>
    value.toLowerCase().includes(search.toLowerCase());

  const subregionMatch = (value: string) => {
    if (!selectedSubregion.length) {
      return true;
    }
    return value === selectedSubregion;
  };

  const minLangMatch = (value: number) => value >= selectedMinLangs;

  const display = countries
    .filter(country => searchMatch(country.name))
    .filter(country => subregionMatch(country.subregion))
    .filter(country => minLangMatch(country.languages.length))
    .sort((a: any, b: any) => {
      if (!sortBy) return 0;
      if (a[sortBy] < b[sortBy]) {
        return sortReverse ? 1 : -1;
      }
      if (a[sortBy] > b[sortBy]) {
        return sortReverse ? -1 : 1;
      }
      return 0;
    });

  return (
    <Container>
      <Box>
        <FormControl fullWidth>
          <InputLabel htmlFor="search">Search</InputLabel>
          <Input
            id="search"
            aria-describedby="search-helper"
            value={search}
            onChange={handleSearch}
          />
          <FormHelperText id="search-helper">
            search by country name.
          </FormHelperText>
        </FormControl>
      </Box>
      <Box>
        <FormControl fullWidth>
          <InputLabel htmlFor="subregion">Sub-Region</InputLabel>
          <Select
            id="subregion"
            value={selectedSubregion}
            onChange={handleSubregion}
            aria-describedby="subregion-helper"
          >
            <MenuItem value={""}>All Sub-Regions</MenuItem>
            {subregions.map(subregion => (
              <MenuItem key={subregion} value={subregion}>
                {subregion}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText id="subregion-helper">
            select a sub-region.
          </FormHelperText>
        </FormControl>
      </Box>
      <Box>
        <FormControl fullWidth>
          <InputLabel htmlFor="minLangs">Minimum Languages</InputLabel>
          <Input
            id="minlangs"
            type="number"
            inputProps={{ min: 1 }}
            aria-describedby="minlangs-helper"
            value={selectedMinLangs}
            onChange={handleMinLangs}
          />
          <FormHelperText id="minlangs-helper">
            select minimum number of languages.
          </FormHelperText>
        </FormControl>
      </Box>
      <Box>
        <FormControl fullWidth>
          <InputLabel htmlFor="sortby">Sort By</InputLabel>
          <Select
            id="sortby"
            value={sortBy}
            onChange={handleSortBy}
            aria-describedby="sortby-helper"
          >
            <MenuItem key={"unsorted"} value={""}>
              unsorted
            </MenuItem>
            {sortableFields.map(field => (
              <MenuItem key={field} value={field}>
                {field}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText id="sortby-helper">
            select a field to sort by.
          </FormHelperText>
        </FormControl>
      </Box>
      {sortBy.length ? (
        <Box>
          <FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  id="sort-reverse"
                  checked={sortReverse}
                  onChange={handleSortReverse}
                  inputProps={{ "aria-label": "reverse sort" }}
                />
              }
              label="Reverse Sorting"
            />
          </FormControl>
        </Box>
      ) : null}
      <Box
        display="flex"
        flexWrap="wrap"
        style={{ background: "grey", width: "100%" }}
      >
        {display.map(country => (
          <Box key={country.alpha3Code}>
            <CountryCard
              {...pick(country, [
                "name",
                "flag",
                "subregion",
                "capital",
                "population",
                "languages"
              ])}
            />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default CountryList;
