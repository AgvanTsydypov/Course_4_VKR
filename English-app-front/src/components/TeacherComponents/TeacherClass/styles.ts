import styled from "styled-components";
import {Card} from "@mantine/core";


export const MantineCard = styled(Card)<any>`
    width: 50%;
    @media only screen and (max-width: 768px) {
        width: 80%;
  }
`;