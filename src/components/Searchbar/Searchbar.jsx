import { Component } from 'react';
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

export class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  handleChange = e => {
    this.setState({ searchValue: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchValue);
  };

  searchInputReset = () => {
    this.setState({
      searchValue: '',
    });
  };
  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <CiSearch style={iconStyles} />
          </SearchButton>

          <SearchInput
            onChange={this.handleChange}
            name="query"
            value={this.state.searchValue}
            type="text"
            autoComplete="off" 
            placeholder="Search images and photos"
          />
        </Form>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
