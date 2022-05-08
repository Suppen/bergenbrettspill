import React, { StrictMode } from "react";
import { Router } from "./components/application/Router";
import { client as apolloClient } from "./apollo";
import { ApolloProvider } from "@apollo/client";

const App = (): JSX.Element => (
	<StrictMode>
		<ApolloProvider client={apolloClient}>
			<Router />
		</ApolloProvider>
	</StrictMode>
);

export default App;
