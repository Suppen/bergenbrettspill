import React, { StrictMode } from "react";
import { Router } from "./components/application/Router";
import { env } from "./env";

console.log(env);

const App = (): JSX.Element => (
	<StrictMode>
		<Router />
	</StrictMode>
);

export default App;
