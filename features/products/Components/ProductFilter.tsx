import { Search } from '@mui/icons-material';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React, { useRef } from 'react';
import { ICategory, IProductParams } from '../../../types';

export interface ProductFilterProps {
  onSearchChange: (newFilter: IProductParams) => void;
  filterParams: IProductParams;
  categorylist: ICategory[];
  onChangeSort: (newFilter: IProductParams) => void;
}

export default function ProductFilter({
  onSearchChange,
  filterParams,
  categorylist,
  onChangeSort,
}: ProductFilterProps) {
  const searchRef = useRef<HTMLInputElement>();
  const handleOnChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter: IProductParams = {
      ...filterParams,
      page: 1,
      'title[regex]': event.target.value,
    };
    onSearchChange(newFilter);
  };
  const handleChangecategory = (event: SelectChangeEvent<any>) => {
    console.log(event.target.value);
    const newFilter: IProductParams = {
      ...filterParams,
      page: 1,
      'category[regex]': event.target.value,
    };
    onChangeSort(newFilter);
  };
  const clearFilter = () => {
    const newFilter: IProductParams = {
      page: 1,
      limit: 10,
      sort: '-createdAt',
    };
    onChangeSort(newFilter);
  };
  const handleChangeSort = (event: SelectChangeEvent<any>) => {
    const newFilter: IProductParams = {
      ...filterParams,
      page: 1,
      sort: event.target.value,
    };
    onChangeSort(newFilter);
  };
  return (
    <Grid container marginBottom="20px" justifyContent="flex-end">
      <Grid item xs={12} md={6}>
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel htmlFor="Search Title">Search Title</InputLabel>
          <OutlinedInput
            inputRef={searchRef}
            id="Search Title"
            endAdornment={<Search />}
            label="Search Title"
            onChange={handleOnChangeSearch}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={3}>
        <FormControl variant="outlined" size="small" fullWidth>
          <InputLabel id="search-by-category">Filter by category</InputLabel>
          <Select
            labelId="search-by-category"
            onChange={handleChangecategory}
            label="Filter by category"
            value={filterParams?.['category[regex]'] || ''}
          >
            <MenuItem value="">--all--</MenuItem>
            {categorylist.map((category, idx) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={3}>
        <FormControl variant="outlined" size="small" fullWidth>
          <InputLabel id="Sort">Sort</InputLabel>
          <Select labelId="Sort" onChange={handleChangeSort} label="Sort" value={filterParams.sort || '-createdAt'}>
            <MenuItem value="-createdAt">Gần đây</MenuItem>
            <MenuItem value="createdAt">Cũ nhất</MenuItem>
            <MenuItem value="-sold">Bán chạy nhất</MenuItem>
            <MenuItem value="-price">Giá giảm dần</MenuItem>
            <MenuItem value="price">Giá tăng dần</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6} md={2} sx={{ margin: '10px', display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="info" onClick={clearFilter}>
          Clear
        </Button>
      </Grid>
    </Grid>
  );
}
