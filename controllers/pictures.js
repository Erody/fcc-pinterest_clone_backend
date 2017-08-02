import mockData from '../MOCK_DATA.json';

export function getImages (req, res) {
	res.json(mockData);
}