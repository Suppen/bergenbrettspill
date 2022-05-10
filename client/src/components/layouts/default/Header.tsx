import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faFacebook, faTwitter, faMeetup } from "@fortawesome/free-brands-svg-icons";
import bbkLogoWide from "../../../assets/img/logos/bbk/Bred.svg";

const Header = (): JSX.Element => (
	<header className="row">
		<Link className="col-12" to="/">
			<h1>
				<img className="logo" src={bbkLogoWide} alt="Bergen Brettspillklubb" />
			</h1>
		</Link>
		<nav className="navbar navbar-expand-sm navbar-light bg-faded col-12">
			<button
				className="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#nav-content"
				aria-controls="nav-content"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon" />
			</button>
			<div id="nav-content" className="collapse navbar-collapse">
				<ul className="navbar-nav me-auto">
					{/* Hvor er vi? */}
					<li className="nav-item">
						<NavLink to="/where" className="nav-link">
							Hvor er vi?
						</NavLink>
					</li>
					{/* Medlemskap */}
					<li className="nav-item">
						<NavLink to="/membership" className="nav-link">
							<strong>Bli medlem!</strong>
						</NavLink>
					</li>
					{/* Våre spill */}
					<li className="nav-item">
						<NavLink to="/games" className="nav-link">
							Våre spill
						</NavLink>
					</li>
					{/* Dokumenter */}
					<li className="nav-item dropdown">
						<a
							className="nav-link dropdown-toggle"
							data-bs-toggle="dropdown"
							href="#"
							role="button"
							aria-haspopup="true"
							aria-expanded="false"
						>
							Dokumenter
						</a>
						<ul className="dropdown-menu">
							<li>
								<a
									className="dropdown-item"
									href="https://drive.google.com/file/d/17Una-Lls0MiwKzll_558KXVc0XOe1rPB/view?usp=sharing"
									target="_blank"
									rel="noopener noreferrer"
								>
									Vedtekter
								</a>
							</li>
							<li>
								<a
									className="dropdown-item"
									href="https://docs.google.com/document/d/1ufidOpgZOzrPGWIltnCSklgxWnkEwNkwgtGwCK1pprc/edit?usp=sharing"
									target="_blank"
									rel="noopener noreferrer"
								>
									Trivselsregler
								</a>
							</li>
							<li>
								<a
									className="dropdown-item"
									href="https://docs.google.com/document/d/1NH2GJsy_u9PwbGvG8SDKeAVpy8l9ZxJxGbzUXbVNluc/edit?usp=sharing"
									target="_blank"
									rel="noopener noreferrer"
								>
									Retningslinjer for en trygg brettspillklubb
								</a>
							</li>
						</ul>
					</li>

					{/* Finn oss på... */}
					<li className="nav-item dropdown">
						<a
							className="nav-link dropdown-toggle"
							data-bs-toggle="dropdown"
							href="#"
							role="button"
							aria-haspopup="true"
							aria-expanded="false"
						>
							Finn oss på...
						</a>
						<ul className="dropdown-menu">
							<li>
								<a
									className="dropdown-item"
									href="https://discord.gg/BF5C9wz"
									target="_blank"
									rel="noopener noreferrer"
								>
									<FontAwesomeIcon icon={faDiscord} style={{ color: "#7289da" }} />{" "}
									<span>Discord</span>
								</a>
							</li>
							<li>
								<a
									className="dropdown-item"
									href="https://www.meetup.com/Bergen-Brettspillklubb/"
									target="_blank"
									rel="noopener noreferrer"
								>
									<FontAwesomeIcon icon={faMeetup} style={{ color: "#f64060" }} /> <span>Meetup</span>
								</a>
							</li>
							<li>
								<a
									className="dropdown-item"
									href="https://www.facebook.com/bergenbrettspill/"
									target="_blank"
									rel="noopener noreferrer"
								>
									<FontAwesomeIcon icon={faFacebook} style={{ color: "#3b5998" }} />{" "}
									<span>Facebook</span>
								</a>
							</li>
							<li>
								<a
									className="dropdown-item"
									href="https://twitter.com/bergenspill"
									target="_blank"
									rel="noopener noreferrer"
								>
									<FontAwesomeIcon icon={faTwitter} style={{ color: "#1da1f2" }} />{" "}
									<span>Twitter</span>
								</a>
							</li>
							<li>
								<a className="dropdown-item" href="mailto:bergenbrettspill@gmail.com">
									<FontAwesomeIcon icon={faEnvelope} /> <span>E-post</span>
								</a>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</nav>
	</header>
);

export default Header;
export { Header };
