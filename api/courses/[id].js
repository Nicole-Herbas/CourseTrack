export default async function handler(req, res) {
  try {
    const { id } = req.query;
    
    // Fetch from Stepik
    const response = await fetch(`https://stepik.org/api/courses/${id}`);
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Error fetching from Stepik' });
    }
    
    const data = await response.json();
    
    // Allow CORS if needed
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
