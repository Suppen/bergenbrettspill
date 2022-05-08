import React, { useEffect, useMemo, useRef, useState } from "react";
import firstImage from "../../assets/img/carousel/first.jpg";
import { fetchMeetupPhotos, MeetupPhoto } from "../../models/MeetupPhoto";

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

interface CarouselProps {
	photos: MeetupPhoto[];
}

const Carousel = ({ photos }: CarouselProps): JSX.Element => {
	// Random ID for the carousel, to allow multiple carousels to exist
	const id = useRef(Math.random().toString());

	// Take 5 random images to show, plus the static first image
	const photoSamples = useMemo(() => {
		return [firstImage, ...shuffle(photos).slice(0, 5)];
	}, [photos]);

	const carouselHref = "#" + id.current;

	return (
		<div id={id.current} className="carousel slide" data-ride="carousel">
			<ol className="carousel-indicators">
				{photoSamples.map((src, i) => (
					<li key={src} className={i === 0 ? "active" : ""} data-slide-to={i} data-target={carouselHref} />
				))}
			</ol>
			<div className="carousel-inner">
				{photoSamples.map((src, i) => (
					<div key={src} className={`carousel-item ${i === 0 ? "active" : ""}`}>
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

const CarouselContainer = (): JSX.Element => {
	const [photos, setPhotos] = useState<string[] | null>(null);
	useEffect(() => {
		let mounted = true;

		void fetchMeetupPhotos().then(setPhotos);
		void (async () => {
			const photos = await fetchMeetupPhotos();
			if (!mounted) {
				return;
			}
			setPhotos(photos);
		});

		return () => {
			mounted = false;
		};
	}, []);

	return <Carousel photos={photos ?? []} />;
};

export default CarouselContainer;
export { Carousel, CarouselContainer };
