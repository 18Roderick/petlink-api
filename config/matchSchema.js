const Match = Object.freeze({
  usuario: Object, // id del usuario
  match: [
    {
      perro: Object, // id de los perros que hacen match
      solictud: String, // contara con opciones prestablecidas ['enviada', 'aceptada', 'rechazada']
      permisos: Boolean // se marcara true cuando el solicitante acepte y asi permitir ver informacion detallada
    }
  ]
});

module.exports = Match;
