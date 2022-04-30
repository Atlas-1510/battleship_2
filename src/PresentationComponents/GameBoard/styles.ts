import styled from "styled-components";

export const BoardUI = styled.div`
  /* aspect-ratio: 1/1; */
  width: 50vw;
  height: 50vw;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat (10, 1fr);
  background-color: black;
  border: 1px solid black;
  gap: 1px;
`;
