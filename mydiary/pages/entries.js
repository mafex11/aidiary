import { diaryEntries } from '../../data/diaryEntries';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { date, entry } = req.body;
    diaryEntries[date] = entry;
    res.status(200).json(diaryEntries);
  } else {
    res.status(200).json(diaryEntries);
  }
}