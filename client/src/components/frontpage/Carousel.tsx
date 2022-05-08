import React, { useMemo, useRef } from "react";
import { gql, useQuery } from "@apollo/client";
import firstImage from "../../assets/img/carousel/first.jpg";
import { MeetupPhoto, meetupPhotoSchema } from "../../models/MeetupPhoto";
import * as yup from "yup";

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
	const id = "carousel";

	// Take 5 random images to show, plus the static first image
	const photoSamples = useMemo(() => [firstImage, ...shuffle(photos).slice(0, 5)], [photos]);

	return (
		<div id={id} className="carousel slide" data-bs-ride="carousel">
			<div className="carousel-indicators">
				{photoSamples.map((src, i) => (
					<button
						key={src}
						type="button"
						className={i === 0 ? "active" : ""}
						data-bs-slide-to={i.toString()}
						data-bs-target={`#${id}`}
					></button>
				))}
			</div>
			<div className="carousel-inner">
				{photoSamples.map((src, i) => (
					<div key={src} className={`carousel-item ${i === 0 ? "active" : ""}`}>
						<img className="w-100" src={src} alt="" />
					</div>
				))}
			</div>
			<button className="carousel-control-prev" type="button" data-bs-target={`#${id}`} data-bs-slide="prev">
				<span className="carousel-control-prev-icon" aria-hidden="true"></span>
				<span className="visually-hidden">Forrige</span>
			</button>
			<button className="carousel-control-next" type="button" data-bs-target={`#${id}`} data-bs-slide="next">
				<span className="carousel-control-next-icon" aria-hidden="true"></span>
				<span className="visually-hidden">Neste</span>
			</button>
		</div>
	);
};

const CarouselContainer = (): JSX.Element => {
	const { data } = useQuery<{ photos: unknown }>(gql`
		{
			photos
		}
	`);

	const photos =
		data?.photos === undefined ? [] : yup.array(meetupPhotoSchema.required()).required().validateSync(data.photos);

	return <Carousel photos={photos ?? []} />;
};

export default CarouselContainer;
export { Carousel, CarouselContainer };
