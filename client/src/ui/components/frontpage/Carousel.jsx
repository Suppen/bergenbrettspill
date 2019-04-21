/**************************
 * Import important stuff *
 **************************/

import React from "react";
import PropTypes from "prop-types";
import * as R from "ramda";

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

	static getSamples(elements) {
		// Make a clone to not operate on the originals
		const clone = R.clone(elements);

		// Take the samples
		return R.range(0, 5).map(() => {
			const i = Math.floor(Math.random() * clone.length);
			return R.head(clone.splice(i, 1));
		});
	}

	render() {
		const carouselHref = `#${this._id}`;

		// Take a sample of the pictures to show in the carousel
		const samples = Carousel.getSamples(this.props.imageSrcs);

		return (
			<div id={this._id} className="carousel slide" data-ride="carousel">
				<ol className="carousel-indicators">
					{samples.map((src, i) => (
						<li key={i} className={i === 0 ? "active" : null} data-slide-to={i} data-target={carouselHref} />
					))}
				</ol>
				<div className="carousel-inner">
					{samples.map((src, i) => (
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
