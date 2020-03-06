import React from 'react';
import styled from 'styled-components';

const Icon = styled.span`
  width: 1em;
  height: 1em;
  font-size: 1.5rem;
  line-height: 1;
`;

export const MDIcon = (props: any) => {
  const { color, margin, className = '', style = {}, onClick, icon } = props;

  if (color) style.color = color;
  if (margin) style.margin = '0 5px';

  return (
    <Icon
      onClick={onClick}
      style={style}
      className={`${className} mdi mdi-${icon}`}
    />
  );
};

export default MDIcon;