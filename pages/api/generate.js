import axios from 'axios';

const generateRandomColor = () => {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

const generateFallbackPalette = () => {
	return {
		data: [{
			palette: Array(4).fill().map(() => generateRandomColor())
		}]
	};
};

export default async function handler(req, res) {
	const options = {
		method: 'GET',
		url: 'https://random-palette-generator.p.rapidapi.com/palette/Monochromatic/1/4',
		headers: {
			'X-RapidAPI-Host': 'random-palette-generator.p.rapidapi.com',
			'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY
		}
	};

	try {
		if (!process.env.NEXT_PUBLIC_RAPIDAPI_KEY) {
			// If no API key is available, use fallback
			return res.status(200).json(generateFallbackPalette());
		}

		const response = await axios(options);
		res.status(200).json(response.data);
	} catch (error) {
		console.error('API Error:', error.message);
		// Return fallback palette on error
		res.status(200).json(generateFallbackPalette());
	}
}