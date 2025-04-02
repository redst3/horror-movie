import './css/HomePage.css';
import { useEffect, useState } from 'react';
import puppetImage from '../assets/hero2.png';
import MovieCard from '../components/MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { loadMovies, searchMovies, sortMovies } from '../redux/movieSlice';
import Movie from '../interfaces/Movie';
import ModalWindow from '../components/ModalWindow';

function HomePage() {
	const [searchBar, setSearchBar] = useState('');
	const [active, setActive] = useState(false);
	const [filter, setFilter] = useState('');

	const dispatch = useDispatch<AppDispatch>();
	const { movies, filteredMovies, loading, error } = useSelector(
		(state: RootState) => state.movies
	);

	useEffect(() => {
		dispatch(loadMovies());
	}, [dispatch]);

	useEffect(() => {
		dispatch(searchMovies(searchBar));
	}, [searchBar, dispatch]);

	useEffect(() => {
		dispatch(sortMovies(filter));
	}, [filter, dispatch]);

	function handleScroll() {
		const offset = document.getElementById('movies');
		window.scrollTo({ top: offset?.offsetTop, behavior: 'smooth' });
	}
	useEffect(() => {
		const scrollToSection = () => {
			const hash = window.location.hash;
			if (hash) {
				const section = document.getElementById(hash.substring(1));
				if (section) {
					section.scrollIntoView({
						behavior: 'smooth',
						block: 'start',
					});
				}
			}
		};
		scrollToSection();
		window.addEventListener('hashchange', scrollToSection);
		return () => {
			window.removeEventListener('hashchange', scrollToSection);
		};
	}, []);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
	function openModal(movie: Movie) {
		setSelectedMovie(movie);
		setIsModalOpen(true);
	}
	function closeModal() {
		setSelectedMovie(null);
		setIsModalOpen(false);
	}

	return (
		<>
			<div className='homepage'>
				<div className='home-hero'>
					<div className='home-figure'>
						<img src={puppetImage} alt='puppet image' />
					</div>
					<div className='home-text'>
						<div className='home-title'>
							<h1>Welcome to Dreadflix</h1>
						</div>
						<div className='home-description'>
							<p>
								Where every night is a fright night. From shadowy slashers to
								mind-bending horrors, our collection is packed with nightmares
								waiting to be unleashed. Dim the lights, press play… and don’t
								look behind you. Ready to face your fears?
							</p>
						</div>
						<button className='button' onClick={handleScroll}>
							Ready!
						</button>
					</div>
					<div className='home-background-photo'></div>
				</div>
				<div className='home-movies' id='movies'>
					<div className='movies-title'>
						<h1>Movies</h1>
						<input
							className='search-input'
							type='text'
							placeholder='Search for a movie....'
							value={searchBar}
							onChange={(e) => setSearchBar(e.target.value)}
						/>
						<div className='movies-sort'>
							<div
								className='sort-button'
								onClick={() => (active ? setActive(false) : setActive(true))}
							>
								Sort by ▽
							</div>
							{active && (
								<div className='sort-box'>
									<p
										onClick={() => {
											setActive(false);
											setFilter('title');
										}}
									>
										Title {filter === 'title' ? '✓' : ''}
									</p>
									<p
										onClick={() => {
											setActive(false);
											setFilter('year');
										}}
									>
										Year {filter === 'year' ? '✓' : ''}
									</p>
									<p
										onClick={() => {
											setActive(false);
											setFilter('rating');
										}}
									>
										Rating {filter === 'rating' ? '✓' : ''}
									</p>
								</div>
							)}
						</div>
					</div>
					{!loading ? (
						!error ? (
							<div className='movies-grid'>
								{searchBar.length === 0 ? (
									movies.map((movie: Movie) => (
										<MovieCard
											movie={movie}
											key={movie.id}
											openModal={() => openModal(movie)}
										/>
									))
								) : filteredMovies.length > 0 ? (
									filteredMovies.map((movie: Movie) => (
										<MovieCard
											movie={movie}
											key={movie.id}
											openModal={() => openModal(movie)}
										/>
									))
								) : (
									<h1 className='movies-grid-text'>
										No movies were found, try something else...
									</h1>
								)}
							</div>
						) : (
							<h1 className='movies-grid-text'>Something went wrong.....</h1>
						)
					) : (
						<h1 className='movies-grid-text'>Getting movies.....</h1>
					)}
					<ModalWindow
						isModalOpen={isModalOpen}
						closeModal={closeModal}
						movie={selectedMovie}
					/>
				</div>
			</div>
		</>
	);
}

export default HomePage;
