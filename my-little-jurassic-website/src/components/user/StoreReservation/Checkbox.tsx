import React from "react";
import styled from "styled-components";

interface IProps {
  checked: boolean;
}

const Checkbox = (props: IProps) => (
  <CheckboxContainer>
    <HiddenCheckbox checked={props.checked} readOnly />
    <StyledCheckbox checked={props.checked}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
);

export default Checkbox;

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const Icon = styled.svg`
  fill: none;
  stroke: ${(props) => props.theme.colors.secondaryBg};
  stroke-width: 4px;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${(props) =>
    props.checked ? props.theme.colors.primaryText : props.theme.colors.secondaryBg};
  border-radius: 3px;
  border: 1px solid ${(props) => props.theme.colors.primaryText};
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }

  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;
