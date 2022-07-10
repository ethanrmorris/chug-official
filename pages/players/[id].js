import Image from 'next/image';
import { nflTeams } from '@/utils/nflTeams';
import { supabase } from '@/utils/supabaseClient';
import { leagueID } from '@/utils/chugLeague';
import React from 'react';
import Table from '@/components/CareerTable';

export default function Player({ player }) {
	const columns = React.useMemo(
		() => [
			{
				Header: 'FP',
				accessor: 'fantasy_points',
				width: 50,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-right">{e.value.toFixed(2)}</p>
					</>
				),
			},
			{
				Header: 'Average Season FP',
				accessor: 'average_fp',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-right">{e.value.toFixed(2)}</p>
					</>
				),
			},
			{
				Header: 'Average Season Rank',
				accessor: 'season_average_rank',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-right">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Average Game FP',
				accessor: 'average_fp_game',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-right">{e.value.toFixed(2)}</p>
					</>
				),
			},
			{
				Header: 'Average Season FP',
				accessor: 'game_average_rank',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-right">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Yards',
				accessor: 'pass_yards',
				width: 70,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-right">{e.value}</p>
					</>
				),
			},
			{
				Header: 'TDs',
				accessor: 'pass_td',
				width: 70,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-right">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Int',
				accessor: 'pass_int',
				width: 70,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-right">{e.value}</p>
					</>
				),
			},
			{
				Header: '2 Pt',
				accessor: 'pass_2pt',
				width: 70,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-right">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Yards',
				accessor: 'rush_yards',
				width: 70,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-right">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Tds',
				accessor: 'rush_td',
				width: 70,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-right">{e.value}</p>
					</>
				),
			},
			{
				Header: '2 Pt',
				accessor: 'rush_2pt',
				width: 70,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-right">{e.value}</p>
					</>
				),
			},
		],
		[]
	);

	const data = React.useMemo(() => player.career, [player.career]);
	return (
		<div className="bg-white dark:bg-[#333333] shadow-md">
			<div
				style={{ backgroundImage: `url(/player-header-${player.owner}.jpg)` }}
				className={`w-full h-[175px] md:h-[225px] lg:h-[275px] bg-no-repeat bg-cover bg-right shadow-md mt-[-1rem]`}
			></div>
			<div className="relative h-24 w-24 md:h-36 md:w-36 bg-white dark:bg-[#333333] rounded-full mt-[-4rem] md:mt-[-6rem] mx-auto border-2 border-purple-900">
				{player.years_exp >= 1 ? (
					<Image
						src={`https://sleepercdn.com/content/nfl/players/${player.player_id}.jpg`}
						alt={player.full_name}
						layout="fill"
						objectFit="cover"
						className="rounded-full"
					></Image>
				) : (
					<Image
						src={`https://sleepercdn.com/images/v2/icons/player_default.webp`}
						alt={player.full_name}
						layout="fill"
						objectFit="cover"
						className="rounded-full"
					></Image>
				)}{' '}
			</div>
			<div className="flex items-center justify-center py-4 text-xl font-semibold">
				<h1 className="">{player.full_name}</h1>
				<span className="px-2">|</span>
				<span className="">#{player.number}</span>
			</div>
			<div className="flex items-center justify-center pb-4 text-md">
				<p>{player.fantasy_positions[0]}</p>
				<span className="px-2">|</span>
				<p>
					{Math.floor(player.height / 12)}&apos;
					{player.height - Math.floor(player.height / 12) * 12}&quot;
				</p>
				<span className="px-2">|</span>
				<p>{player.weight} lb</p>
				<span className="px-2">|</span>
				<p>Age: {player.age}</p>
				<span className="px-2">|</span>
				<p>{player.college}</p>
				<span className="px-2">|</span>
				<div className="flex items-center">
					<div className="relative h-7 w-7">
						<Image
							src={
								player.team
									? `https://sleepercdn.com/images/team_logos/nfl/${player.team.toLowerCase()}.png`
									: `/logo.webp`
							}
							alt="Team Logo"
							layout="fill"
							objectFit="contain"
						></Image>
					</div>
					<p className="pl-2">
						{nflTeams[player.team] ? nflTeams[player.team] : 'Free Agent'}
					</p>
				</div>
			</div>
			<div className="p-4">
				<div>
					<h3 className="text-2xl">Career</h3>
					{player.games ? (
						<Table columns={columns} data={data} />
					) : (
						'No Stats Accrued'
					)}
				</div>
			</div>
		</div>
	);
}

export async function getStaticPaths() {
	const res = await fetch('https://ethanrmorris.github.io/v1/players.json');
	const players = await res.json();
	const playersArray = Object.values(players);

	// Get the paths we want to pre-render based on posts
	const paths = playersArray.map((player) => ({
		params: { id: player.player_id },
	}));

	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
	try {
		const { data: playerRes } = await supabase
			.from('players')
			.select('*')
			.eq('player_id', params.id);

		const playerObj = playerRes[0];

		const rosterRes = await fetch(
			`https://api.sleeper.app/v1/league/${leagueID}/rosters/`
		);
		const rosters = await rosterRes.json();
		const { roster_id } = rosters.find((team) =>
			team.players.includes(playerObj.player_id.toString())
		);

		const { data: career } = await supabase
			.from('players_career')
			.select('*')
			.eq('player_id', params.id);

		const { data: games } = await supabase
			.from('players_games')
			.select('*, owner_id (team)')
			.eq('player_id', params.id)
			.lt('week', 15);

		const { data: owner } = await supabase
			.from('owners')
			.select('slug, team')
			.eq('id', roster_id);

		const player = {
			...playerObj,
			games: games,
			career: career,
			owner: owner[0].slug,
			asmc: owner[0].team,
		};

		return {
			props: { player },
		};
	} catch (err) {
		console.error(err);
	}
}

// export async function getStaticProps({ params }) {
// 	try {
// 		const [
// 			playersRes,
// 			ownersRes,
// 			rostersRes,
// 			careerRes,
// 			seasonsRes,
// 			detailsRes,
// 		] = await Promise.all([
// 			fetch('https://ethanrmorris.github.io/v1/players.json'),
// 			fetch('https://ethanrmorris.github.io/v1/owners.json'),
// 			fetch('https://api.sleeper.app/v1/league/784462448236363776/rosters/'),
// 			fetch('https://ethanrmorris.github.io/v1/stats/players/career.json'),
// 			fetch(`https://ethanrmorris.github.io/v1/stats/players/seasons.json`),
// 			fetch('https://ethanrmorris.github.io/v1/stats/players/details.json'),
// 		]);
// 		const [players, owners, rosters, career, seasons, details] =
// 			await Promise.all([
// 				playersRes.json(),
// 				ownersRes.json(),
// 				rostersRes.json(),
// 				careerRes.json(),
// 				seasonsRes.json(),
// 				detailsRes.json(),
// 			]);

// 		const idsFromRosters = rosters.map((obj) => obj.players).flat();
// 		const idsFromStats = career.map((obj) => obj.player_id).flat();
// 		const idsFromCurrentPlayers = [...idsFromRosters, ...idsFromStats];

// 		const newResults = Object.values(players);

// 		const newerResults = newResults.filter((x) =>
// 			idsFromCurrentPlayers.includes(x.player_id)
// 		);

// 		const [lastResults] = newerResults.filter((obj) => {
// 			return obj.player_id === params.id;
// 		});

// 		const playerId = lastResults.player_id;

// 		const currentTeam = rosters.find((team) => team.players.includes(playerId));

// 		const currentOwner = currentTeam?.roster_id;

// 		const cleanOwner = owners.find((owner) => owner.id?.includes(currentOwner));

// 		const ownerName = cleanOwner?.slug;

// 		const careerResults = Object.values(career);

// 		const [careerSingle] = careerResults.filter((obj) => {
// 			return obj.player_id === params.id;
// 		});

// 		console.log(careerSingle);

// 		// const cleanSingle = [];
// 		// cleanSingle.push(careerSingle);

// 		const results = {
// 			...lastResults,
// 			asmc: ownerName ? ownerName : null,
// 		};

// 		return {
// 			props: { results },
// 		};
// 	} catch (err) {
// 		console.error(err);
// 		return {
// 			notFound: true,
// 		};
// 	}
// }
