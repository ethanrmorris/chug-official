import Image from 'next/image';
import Link from 'next/link';

export default function PlayerCard({ id }) {
	return (
		<>
			<Link href={`/players/${id.player_id}`}>
				<a>
					<div className="flex flex-col items-center bg-white dark:bg-dark-surface w-full p-4 rounded-md shadow-md hover:shadow-xl dark:hover:bg-dark-hover">
						<div className="relative h-60 w-60">
							<span
								style={{ backgroundImage: `url('/logo-${id.owner}.webp')` }}
								className={`block absolute inset-0 bg-contain opacity-20`}
							></span>
							<Image
								src={`https://sleepercdn.com/content/nfl/players/${id.player_id}.jpg`}
								alt={id.full_name}
								layout="fill"
								objectFit="cover"
								className="z-0"
							></Image>
						</div>
						<div className="text-center">
							<h3 className="text-lg pt-4">{id.full_name}</h3>
							<h5 className="text-sm">
								{id.fantasy_positions[0]}
								{' - '}
								{id.number}
							</h5>
							<div className="relative h-8 w-8 m-2 mx-auto">
								<Image
									src={
										id.team
											? `https://sleepercdn.com/images/team_logos/nfl/${id.team.toLowerCase()}.png`
											: `/logo.webp`
									}
									alt={id.full_name}
									layout="fill"
									objectFit="cover"
									className=""
								></Image>
							</div>
						</div>
					</div>
				</a>
			</Link>
		</>
	);
}
