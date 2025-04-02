import './css/MovieCard.css';
import Movie from '../interfaces/Movie';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { addFavoriteMovie, removeFavoriteMovie } from '../redux/userSlice';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
function MovieCard({
	movie,
	openModal,
}: {
	movie: Movie;
	openModal: () => void;
}) {
	const { user } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const [active, setActive] = useState(false);
	const [color, setColor] = useState('');

	useEffect(() => {
		if (user) {
			if (user.favoriteMovies.includes(movie.id)) {
				setActive(true);
			}
		}
		if (movie.rating >= 7.5) {
			setColor('green');
		} else if (movie.rating >= 5) {
			setColor('orange');
		} else {
			setColor('red');
		}
	}, [user, movie.id, movie.rating]);

	const handleFavoriteButton = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.stopPropagation();
		if (user) {
			const details = {
				movieId: movie.id,
				accessToken: user.accessToken,
			};
			if (!active) {
				await dispatch(addFavoriteMovie(details));
				setActive(true);
				toast.success('Movie added to favorites!', {
					autoClose: 1000,
					theme: 'dark',
				});
			} else {
				await dispatch(removeFavoriteMovie(details));
				setActive(false);
				toast.error('Movie removed from favorites!', {
					autoClose: 1000,
					theme: 'dark',
				});
			}
		} else {
			navigate('/login');
			toast.error('You need to login to do that!', {
				theme: 'dark',
				position: 'bottom-center',
				autoClose: 1000,
			});
		}
	};

	return (
		<>
			<div className='movie-card' onClick={openModal}>
				<div className='movie-poster'>
					{!movie.photo_url ? (
						<p>Loading...</p>
					) : (
						<img
							src={`https://image.tmdb.org/t/p/w500/${movie.photo_url}`}
							alt={movie.title}
						/>
					)}
					<div className='movie-overlay'>
						<button
							className={!active ? 'favorite-btn' : 'favorite-btn active'}
							onClick={handleFavoriteButton}
						>
							❤
						</button>
					</div>
				</div>
				<div className='movie-info'>
					<h3>{movie.title}</h3>
					<div className='date-rating'>
						<p>{movie.release_date}</p>
						<p style={{ color: color, fontWeight: 'bold' }}>
							{movie.rating} / 10
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default MovieCard;
