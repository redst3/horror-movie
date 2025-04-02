import Modal from 'react-modal';
import Movie from '../interfaces/Movie';
import './css/ModalWindow.css';
import { useEffect, useState } from 'react';

Modal.setAppElement('#root');

function ModalWindow({
	isModalOpen,
	closeModal,
	movie,
}: {
	isModalOpen: boolean;
	closeModal: () => void;
	movie: Movie | null;
}) {
	const [color, setColor] = useState('');
	useEffect(() => {
		if (!movie) return;
		if (movie.rating >= 7.5) {
			setColor('green');
		} else if (movie.rating >= 5) {
			setColor('orange');
		} else {
			setColor('red');
		}
	}, [movie]);
	return (
		<>
			<div>
				<Modal
					isOpen={isModalOpen}
					onRequestClose={closeModal}
					contentLabel='Movie details'
					className='modal-window'
					overlayClassName='modal-overlay'
				>
					<button className='modal-close' onClick={closeModal}>
						←
					</button>
					{movie && (
						<div className='modal-content'>
							<h1>{movie.title}</h1>
							<div className='modal-info'>
								<div className='modal-left'>
									<div className='movie-img'>
										<img
											src={`https://image.tmdb.org/t/p/w500/${movie.photo_url}`}
											alt='movie poster'
										/>
									</div>
								</div>
								<div className='modal-right'>
									<p>{movie.description}</p>
									<div className='release-rating'>
										<p className='release-date'>{movie.release_date}</p>
										<p className='rating' style={{ color: color }}>
											{movie.rating} / 10
										</p>
									</div>
								</div>
							</div>
						</div>
					)}
				</Modal>
			</div>
		</>
	);
}
export default ModalWindow;
