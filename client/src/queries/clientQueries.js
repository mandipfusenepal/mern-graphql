import { gql } from "@apollo/client";

export const GET_CLIENTS = gql`
  query {
	clients {
		id
		name
		email
		phone
	  }
  }
`;