import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Header,
  SearchButton,
  SearchInput
} from './Searchbar.styled';

import { CiSearch } from 'react-icons/ci';

const iconStyles = {
  color: 'blue',
  fontSize: '24px',
  marginRight: '8px',
};

export const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(searchValue);
  };


  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <CiSearch style={iconStyles} />
        </SearchButton>

        <SearchInput
          onChange={handleChange}
          name="query"
          value={searchValue}
          type="text"
          autoComplete="off"
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};


