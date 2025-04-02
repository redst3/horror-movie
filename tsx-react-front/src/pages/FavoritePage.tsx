import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { Link, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { loadMovies } from '../redux/movieSlice';
import './css/FavoritePage.css';
import MovieCard from '../components/MovieCard';
import Movie from '../interfaces/Movie';
import ModalWindow from '../components/ModalWindow';

function FavoritePage() {
	const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useSelector((state: RootState) => state.user);
	const { movies, loading, error } = useSelector(
		(state: RootState) => state.movies
	);
	const navigate = useNavigate();

	function openModal(movie: Movie) {
		setSelectedMovie(movie);
		setIsModalOpen(true);
	}
	function closeModal() {
		setSelectedMovie(null);
		setIsModalOpen(false);
	}

	useEffect(() => {
		if (user && user.accessToken) {
			const tokenInfo = jwtDecode(user.accessToken);
			if (tokenInfo.exp) {
				const isValid = tokenInfo.exp * 1000 > Date.now();
				if (!isValid) navigate('/login');
			}
			dispatch(loadMovies());
			setFavoriteIds(user.favoriteMovies);
		} else {
			navigate('/login');
			toast.error('You cant access that!', {
				theme: 'dark',
				position: 'bottom-center',
				autoClose: 3000,
			});
		}
	}, [user, navigate, dispatch]);
	return (
		<>
			<div className='favorites'>
				<div className='favorites-title'>
					<h1>Favorite Movies</h1>
				</div>
				{!loading ? (
					!error ? (
						<div className='movies-grid'>
							{favoriteIds.length !== 0 &&
								movies
									.filter((movie: Movie) => favoriteIds.includes(movie.id))
									.map((movie: Movie) => (
										<MovieCard
											key={movie.id}
											movie={movie}
											openModal={() => openModal(movie)}
										/>
									))}
						</div>
					) : (
						<h1 className='movies-grid-text'>Something went wrong.....</h1>
					)
				) : (
					<h1 className='movies-grid-text'>Getting movies.....</h1>
				)}
				{favoriteIds.length === 0 && !loading && (
					<div className='movies-grid-redirect'>
						<h1 className='movies-grid-text'>
							No movies were found in the favorites list!
						</h1>
						<Link to='/#movies' className='link-button'>
							{' '}
							Find movies
						</Link>
					</div>
				)}
				<ModalWindow
					isModalOpen={isModalOpen}
					closeModal={closeModal}
					movie={selectedMovie}
				/>
			</div>
		</>
	);
}

export default FavoritePage;
