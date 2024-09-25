//Este primer proyecto si corre como debe de ser
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
  //Let’s calculate a new state for the situation after the move.
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

  let first = new VillageState(
    "Oficina de Correos",
    [{place: "Oficina de Correos", address: "Casa de Alice"}]
  );
  let next = first.move("Casa de Alice");
  
  console.log(next.place);
  // → Casa de Alice
  console.log(next.parcels);
  // → []
  console.log(first.place);
  // → Oficina de Correos

  //n robot devuelve es un objeto que contiene tanto la dirección en la que quiere moverse 
  //como un valor de memoria que se le dará la próxima vez que se llame.

  function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {
      if (state.parcels.length == 0) {
        console.log(`Terminado en ${turn} turnos`);
        break;
      }
      let action = robot(state, memory);
      state = state.move(action.direction);
      memory = action.memory;
      console.log(`Movido a ${action.direction}`);
    }
  }

//RANDOM Pick up- this could be consider as the worst stupid option for the robot
function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state) {
  return {direction: randomPick(roadGraph[state.place])};
}
