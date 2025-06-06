export default async function handler(req, res) {
  try {
    const response = await fetch("http://54.163.36.46:8000/api/v1/process/process", {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error al hacer proxy:", error);
    res.status(500).json({ error: "Error al conectar con el servidor backend." });
  }
}
