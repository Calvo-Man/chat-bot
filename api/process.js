export default async function handler(req, res) {
  console.log("🔄 Proxy llamado");

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    console.log("🟡 OPTIONS request");
    return res.status(200).end();
  }

  try {
    console.log("📤 Enviando al backend:", req.body);

    const response = await fetch("http://54.163.36.46:8000/api/v1/process/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    console.log("✅ Respuesta del backend:", data);

    return res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error en el proxy:", err);
    res.status(500).json({ error: "Proxy error" });
  }
}
