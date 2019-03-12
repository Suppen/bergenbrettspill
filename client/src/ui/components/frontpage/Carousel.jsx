/**************************
 * Import important stuff *
 **************************/

import React from "react";
import PropTypes from "prop-types";

import img1 from "../../../img/carousel/20181114_183057.jpg";
import img2 from "../../../img/carousel/20181114_183104.jpg";
import img3 from "../../../img/carousel/20181114_214150.jpg";
import img4 from "../../../img/carousel/20190130_201708.jpg";
import img5 from "../../../img/carousel/20190130_215929.jpg";

/***********
 * Helpers *
 ***********/

/**
 * The alphabet to use to generate random IDs
 *
 * @type {String}
 *
 * @private
 */
const alphabet = [..."abcdefghijklmnopqrstuvwxyz"];

/**
 * Generate a random ID of given length
 *
 * @param {Integer} length	Length of ID to generate
 *
 * @returns {String}	Randomly generated ID
 *
 * @private
 */
function generateId(length) {
	const chars = [];
	for (let i = 0; i < length; i++) {
		chars.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
	}
	return chars.join("");
}

/**************************
 * The Carousel component *
 **************************/

class Carousel extends React.Component {
	static get propTypes() {
		return {
			imageSrcs: PropTypes.arrayOf(PropTypes.string).isRequired
		};
	}

	static get defaultProps() {
		return {
			imageSrcs: [img4, img3, img2, img5, img1]
		};
	}

	constructor(props) {
		super(props);

		/**
		 * A random ID to use for this carousel, to allow multiple carousels to coexist
		 *
		 * @type {String}
		 *
		 * @private
		 */
		this._id = generateId(10);
	}

	render() {
		const carouselHref = `#${this._id}`;

		return (
			<div id={this._id} className="carousel slide" data-ride="carousel">
				<ol className="carousel-indicators">
					{this.props.imageSrcs.map((src, i) => (
						<li key={i} className={i === 0 ? "active" : null} data-slide-to={i} data-target={carouselHref} />
					))}
				</ol>
				<div className="carousel-inner">
					{this.props.imageSrcs.map((src, i) => (
						<div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
							<img className="w-100" src={src} alt="" />
						</div>
					))}
				</div>
				<a className="carousel-control-prev" href={carouselHref} role="button" data-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true" />
				</a>
				<a className="carousel-control-next" href={carouselHref} role="button" data-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true" />
				</a>
			</div>
		);
	}
}

/*************
 * Export it *
 *************/

export { Carousel };
