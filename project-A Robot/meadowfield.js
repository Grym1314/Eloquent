//Readme: Our project in this chapter is to build an automaton, a small program that performs a task in a virtual world. 
//Our automaton will be a mail delivery robot that collects and leaves packages.

//Here we decide every possible route for this project
//Routes:
const roads = [
    "Casa de Leslie-Casa de Jesus","Casa de Leslie-Cabaña",
    "Casa de Leslie-Oficina de Correos","Casa de Jesus-Ayuntamiento",
    "Casa de Ariel-Casa de Javier","Casa de Ariel-Ayuntamiento",
    "Casa de Javier-Casa de Danie;a","Casa de Danie;a-Granja",
    "Casa de Danie;a-Tienda","Plaza de Mercado-Granja",
    "Plaza de Mercado-Oficina de Correos","Plaza de Mercado-Tienda",
    "Plaza de Mercado-Ayuntamiento","Tienda-Ayuntamiento"
  ];

  //We’re going to turn the road list into a data structure that, for each location, tells us what can be reached from there.
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

  // to calculate robot movements 
  class VillageState {
    constructor(place, parcels) {
      this.place = place;
      this.parcels = parcels;
    }
  
    move(destination) {
      if (!roadGraph[this.place].includes(destination)) {
        return this;
      } else {
        let parcels = this.parcels.map(p => {
          if (p.place != this.place) return p;
          return {place: destination, address: p.address};
        }).filter(p => p.place != p.address);
        return new VillageState(destination, parcels);
      }
    }
  }

  //Nothing for today