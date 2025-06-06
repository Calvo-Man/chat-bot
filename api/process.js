// api/process.js
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Responde a preflight
  }

  try {
    const response = await fetch("http://54.163.36.46:8000/api/v1/process/process", {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: req.method === "POST" ? JSON.stringify(req.body) : null,
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error("Error en el proxy:", error);
    return res.status(500).json({ error: "Error en el servidor proxy." });
  }
}
