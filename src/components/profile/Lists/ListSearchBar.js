import React, { useState, useRef } from 'react';
import FontAwesome from 'react-fontawesome';

import {
  StyledListSearchBar,
  StyledListSearchBarContent,
} from '../../styles/StyledListSearchBar';

const ListSearchBar = ({ callback }) => {
  const [state, setState] = useState('');

  const timeOut = useRef(null);

  const doSearch = (event) => {
    const { value } = event.target;

    clearTimeout(timeOut.current);
    setState(value);

    timeOut.current = setTimeout(() => {
      callback(value);
    }, 500);
  };

  return (
    <StyledListSearchBar>
      <StyledListSearchBarContent>
        <FontAwesome className="fa-search" name="search" size="2x" />
        <input
          type="text"
          placeholder="Eklemek istediğiniz filmi arayın"
          onChange={doSearch}
          value={state}
        />
      </StyledListSearchBarContent>
    </StyledListSearchBar>
  );
};

export default ListSearchBar;
