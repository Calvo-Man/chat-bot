const apiBackend = import.meta.env.VITE_API_BACKEND;
export default async function handler(req, res) {
  try {
    const response = await fetch(`${apiBackend}/api/v1/process/process`, {
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
