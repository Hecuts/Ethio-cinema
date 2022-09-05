import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Rows from "../components/Rows";
import { Movie } from "../typings";
import requests from "../utils/requests";

interface Props {
	netflixOriginals: Movie[];
	actionMovies: Movie[];
	comedyMovies: Movie[];
	documentaries: Movie[];
	horrorMovies: Movie[];
	romanceMovies: Movie[];
	topRated: Movie[];
	trendingNow: Movie[];
}

const Home = ({
	netflixOriginals,
	actionMovies,
	comedyMovies,
	documentaries,
	horrorMovies,
	romanceMovies,
	topRated,
	trendingNow,
}: Props) => {
	return (
		<div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
				<Banner netflixOriginals={netflixOriginals} />
				<section className="md:space-y-24">
					<Rows title="Top Rated" movies={topRated} />
					<Rows title="Trending Now" movies={trendingNow} />
					<Rows title="Action Trillers" movies={actionMovies} />
					<Rows title="Comedies" movies={comedyMovies} />
					<Rows title="Scary Movies" movies={horrorMovies} />
					<Rows title="Romance Movies" movies={romanceMovies} />
					<Rows title="Documentaries" movies={documentaries} />
				</section>
			</main>
			{/* Modal */}
		</div>
	);
};

export default Home;

export const getServerSideProps = async () => {
	const [
		netflixOriginals,
		trendingNow,
		topRated,
		actionMovies,
		comedyMovies,
		horrorMovies,
		romanceMovies,
		documentaries,
	] = await Promise.all([
		fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
		fetch(requests.fetchTrending).then((res) => res.json()),
		fetch(requests.fetchTopRated).then((res) => res.json()),
		fetch(requests.fetchActionMovies).then((res) => res.json()),
		fetch(requests.fetchComedyMovies).then((res) => res.json()),
		fetch(requests.fetchHorrorMovies).then((res) => res.json()),
		fetch(requests.fetchRomanceMovies).then((res) => res.json()),
		fetch(requests.fetchDocumentaries).then((res) => res.json()),
	]);
	return {
		props: {
			netflixOriginals: netflixOriginals.results,
			trendingNow: trendingNow.results,
			topRated: topRated.results,
			actionMovies: actionMovies.results,
			comedyMovies: comedyMovies.results,
			horrorMovies: horrorMovies.results,
			romanceMovies: romanceMovies.results,
			documentaries: documentaries.results,
		},
	};
};