import { BrowserRouter as ReactRouter, Route, Routes } from "react-router-dom";
import { Frontpage } from "../frontpage";
import { Games } from "../games";
import { Directions } from "../directions";
import { Membership } from "../membership";

const Router = (): JSX.Element => (
	<ReactRouter>
		<Routes>
			<Route path="/" element={<Frontpage />} />
			<Route path="/games" element={<Games />} />
			<Route path="/where" element={<Directions />} />
			<Route path="/membership" element={<Membership />} />
		</Routes>
	</ReactRouter>
);

export default Router;
export { Router };
