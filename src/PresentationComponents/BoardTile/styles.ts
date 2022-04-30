import styled from "styled-components";

export const TileContainer = styled.div`
  aspect-ratio: 1/1;
  background-color: white;
`;

export const OccupiedTileContainer = styled(TileContainer)`
  background-color: red;
`;

export const HighlightTileContainer = styled(TileContainer)`
  background-color: yellow;
`;
