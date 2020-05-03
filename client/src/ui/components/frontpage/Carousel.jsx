/**************************
 * Import important stuff *
 **************************/

import React, { useRef } from "react";
import PropTypes from "prop-types";
import * as R from "ramda";
import firstImage from "../../../img/carousel/first.jpg";

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

const Carousel = ({ imageSrcs }) => {
	// Random ID for the carousel, to allow multiple carousels to exist
	const id = useRef(generateId(10));

	// Clone the image sources to not work on the original
	const clone = R.clone(imageSrcs);
	const imgs = R.compose(
		// Add the first image
		R.prepend(firstImage),
		// Take a sample of 5 images
		R.map(() => {
			const i = Math.floor(Math.random() * clone.length);
			return R.head(clone.splice(i, 1));
		})
	)(R.range(0, 5));

	const carouselHref = "#" + id;

	return (
		<div id={id} className="carousel slide" data-ride="carousel">
			<ol className="carousel-indicators">
				{imgs.map((_src, i) => (
					<li key={i} className={i === 0 ? "active" : null} data-slide-to={i} data-target={carouselHref} />
				))}
			</ol>
			<div className="carousel-inner">
				{imgs.map((src, i) => (
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
};

Carousel.propTypes = {
	imageSrcs: PropTypes.arrayOf(PropTypes.string).isRequired
};

/*************
 * Export it *
 *************/

export { Carousel };
