import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body className="bg-[#ececec] dark:bg-[#222222] overflow-y-scroll">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
