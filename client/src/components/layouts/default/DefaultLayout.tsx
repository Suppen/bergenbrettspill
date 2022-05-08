import React from "react";
import { Header } from "./Header.jsx";
import { Footer } from "./Footer.jsx";

interface DefaultLayoutProps {
	children: React.ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps): JSX.Element => (
	<div className="container default-layout">
		<Header />
		<main>{children}</main>
		<Footer />
	</div>
);

export default DefaultLayout;
export { DefaultLayout };
