import React, { useMemo, useRef, useState } from "react";
import firstImage from "../../assets/img/carousel/first.jpg";

function shuffle<T>(arr: T[]): T[] {
	const cloned = [...arr];
	const shuffled = [];
	while (cloned.length > 0) {
		const i = Math.floor(Math.random() * cloned.length);
		shuffled.push(cloned[i]);
		cloned.splice(i, 1);
	}

	return shuffled;
}

const Carousel = (): JSX.Element => {
	const [photoUrls, setPhotoUrls] = useState<string[] | null>(null);
	// TODO Fetch URLs

	// Random ID for the carousel, to allow multiple carousels to exist
	const id = useRef(Math.random().toString());

	// Take 5 random images to show, plus the static first image
	const imgs = useMemo(() => {
		if (photoUrls === null) {
			return [firstImage];
		}

		return [firstImage, ...shuffle(photoUrls).slice(0, 5)];
	}, [photoUrls]);

	const carouselHref = "#" + id.current;

	return (
		<div id={id.current} className="carousel slide" data-ride="carousel">
			<ol className="carousel-indicators">
				{imgs.map((_src, i) => (
					<li key={i} className={i === 0 ? "active" : ""} data-slide-to={i} data-target={carouselHref} />
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

export { Carousel };
