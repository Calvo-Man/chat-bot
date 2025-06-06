// api/process.js
const apiUrl = import.meta.env.VITE_API_BACKEND;
export default async function handler(req, res) {
  // Habilitar CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Manejar preflight (verificación CORS del navegador)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const backendRes = await fetch(apiUrl+"/api/v1/process/process", {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await backendRes.json();
    return res.status(backendRes.status).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).json({ error: "Proxy failed" });
  }
}
