const roads = [
    "Casa de Leslie-Casa de Jesus","Casa de Leslie-Cabaña",
    "Casa de Leslie-Oficina de Correos","Casa de Jesus-Ayuntamiento",
    "Casa de Ariel-Casa de Javier","Casa de Ariel-Ayuntamiento",
    "Casa de Javier-Casa de Danie;a","Casa de Danie;a-Granja",
    "Casa de Danie;a-Tienda","Plaza de Mercado-Granja",
    "Plaza de Mercado-Oficina de Correos","Plaza de Mercado-Tienda",
    "Plaza de Mercado-Ayuntamiento","Tienda-Ayuntamiento"
  ];

  function buildGraph(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
      if (from in graph) {
        graph[from].push(to);
      } else {
        graph[from] = [to];
      }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
      addEdge(from, to);
      addEdge(to, from);
    }
    return graph;
  }
  
  const roadGraph = buildGraph(roads);