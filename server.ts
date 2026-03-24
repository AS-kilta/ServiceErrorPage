const htmlFile = Bun.file("dist/index.html");
const htmlTemplate = await htmlFile.text();

console.log("Error Page server listening on port 80");

Bun.serve({
  port: 80,
  async fetch(req) {
    const url = new URL(req.url);
    
    // Support ?code=503, /503, or /error/503
    const match = url.pathname.match(/\/(\d{3})$/);
    const code = match ? match[1] : (url.searchParams.get("code") || "500");
    
    // Inject the code into the pre-bundled HTML
    const body = htmlTemplate.replace('[[STATUS]]', code);
    
    return new Response(body, {
      headers: { 
        "Content-Type": "text/html",
        "X-Error-Code": code // Useful for debugging in network tab
      }
    });
  },
});
