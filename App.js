import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const futbol = [
  {pregunta: '¿Cuándo se dio el primer mundial?',
    opciones: ['1930', '1970', '2002', '2022'], correcta: 0},
    { pregunta: '¿Qué Futbolista ganó el balón de oro en el 2010?',
      opciones: ['W. Sneijder', 'L. Messi', 'A. Iniesta', 'D. Villa'], correcta: 1 },
    { pregunta: '¿En qué año la selección mayor española ganó su primer mundial?',
      opciones: ['2026', '1982', '2010', '2006'], correcta: 2 },
    { pregunta: '¿Qué club ganó tres champions seguidas?',
      opciones: ['Barcelona', 'Arsenal', 'PSG', 'Real Madrid'], correcta: 3 },
    { pregunta: '¿Quién es el máximo goleador de la historia?',
      opciones: ['C. Ronaldo', 'F. Púskas', 'L. Messi', 'Alexander Arnold'], correcta: 0 },
]
const Metal = [
  { pregunta: '¿Quién fue vocalista de Black Sabbath?',
    opciones: ['Serj Tankian', 'Ozzy Osbourne', 'Akira Toriyama', 'Juanes'], correcta: 1 },
  { pregunta: '¿Quién es el baterista de Metallica?',
    opciones: ['Dave Grol', 'John Dolmayan', 'Lars Ulrich', 'Joey Jordyson'], correcta: 2 },
  { pregunta: '¿Qué banda ganó el grammy a la mejor interpretación de metal en 2003?',
    opciones: ['Nirvana', 'Cannibal Corpse', 'Messugah', 'Korn'], correcta: 3 },
  { pregunta: '¿Qué album Metallica lanzó en 2003?',
    opciones: ['St. Anger', 'Ride the lightning', 'Kill em all', 'Lulu'], correcta: 0 },
  { pregunta: '¿Quién es el fundador de Megadeth?',
    opciones: ['Leo Messi', 'Dave Mustaine', 'James Hettfield', 'Mikasa'], correcta: 1 },
];
export default function App() {
  const [pantalla, setPantalla] = useState(1);      // pantalla visible (1 a 5)
  const [tema, setTema] = useState(null);           // 'Fútbol' o 'Metal'
  const [indice, setIndice] = useState(0);          // pregunta actual (0 a 4)
  const [seleccion, setSeleccion] = useState(null); // opción tocada (null = sin responder)
  const [correctas, setCorrectas] = useState(0);    // aciertos = puntaje
  const [incorrectas, setIncorrectas] = useState(0);

  // Elegimos el arreglo de preguntas según el tema (condicional)
  let preguntas = [];
  if (tema === 'futbol') {
    preguntas = futbol;
  } else if (tema === 'Metal') {
    preguntas = Metal;
  }
  const actual = preguntas[indice]; 


  function elegirTema(t) {
    setTema(t);
    setIndice(0);
    setSeleccion(null);
    setCorrectas(0);
    setIncorrectas(0);
    if (t === 'futbol') {
      setPantalla(3);
    } else {
      setPantalla(4);
    }
  }

  function responder(i) {
    setSeleccion(i); 
    if (i === actual.correcta) {
      setCorrectas(correctas + 1);
    } else {
      setIncorrectas(incorrectas + 1);
    }
  }

  function siguiente() {
    if (indice < preguntas.length - 1) {
      setIndice(indice + 1);
      setSeleccion(null);
    } else {
      setPantalla(5);
    }
  }

  function volverAJugar() {
    setTema(null);
    setIndice(0);
    setSeleccion(null);
    setCorrectas(0);
    setIncorrectas(0);
    setPantalla(2);
  }
  if (pantalla === 1) {
    return (
      <View style={styles.contenedor}>
        <Text style={styles.logo}>🎮</Text>
        <Text style={styles.titulo}>QuizZone</Text>
        <Text style={styles.subtitulo}>¡Demuestra cuánto sabes!</Text>
        <Button title="Comenzar" onPress={() => setPantalla(2)} />
      </View>
    );
  }

  if (pantalla === 2) {
    return (
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Selecciona un tema</Text>
        <View style={styles.espacio}>
          <Button title="⚽ Fútbol" onPress={() => elegirTema('futbol')} />
        </View>
        <View style={styles.espacio}>
          <Button title="🛹 Metal" onPress={() => elegirTema('Metal')} />
        </View>
        <View style={styles.espacio}>
          <Button title="Atrás" color="#7a869a" onPress={() => setPantalla(1)} />
        </View>
      </View>
    );
  }
  if (pantalla === 3 || pantalla === 4) {
    let mensaje = '';
    if (seleccion !== null) {
      if (seleccion === actual.correcta) {
        mensaje = '¡Correcto! 🎉';
      } else {
        mensaje = 'Incorrecto. La respuesta era: ' + actual.opciones[actual.correcta];
      }
    }

    return (
      <View style={styles.contenedor}>
        <Text style={styles.tema}>
          {tema === 'futbol' ? '⚽ futbol' : '🛹 Metal'}
        </Text>
        <Text style={styles.contador}>
          Pregunta {indice + 1} de {preguntas.length} · Puntaje: {correctas}
        </Text>

        <View style={styles.tarjeta}>
          <Text style={styles.pregunta}>{actual.pregunta}</Text>
        </View>

        <View style={styles.espacio}>
          <Button title={'A. ' + actual.opciones[0]}
            onPress={() => responder(0)} disabled={seleccion !== null} />
        </View>
        <View style={styles.espacio}>
          <Button title={'B. ' + actual.opciones[1]}
            onPress={() => responder(1)} disabled={seleccion !== null} />
        </View>
        <View style={styles.espacio}>
          <Button title={'C. ' + actual.opciones[2]}
            onPress={() => responder(2)} disabled={seleccion !== null} />
        </View>
        <View style={styles.espacio}>
          <Button title={'D. ' + actual.opciones[3]}
            onPress={() => responder(3)} disabled={seleccion !== null} />
        </View>

        {seleccion !== null && (
          <View>
            <Text style={seleccion === actual.correcta ? styles.bien : styles.mal}>
              {mensaje}
            </Text>
            <Button
              title={indice < preguntas.length - 1 ? 'Siguiente' : 'Ver resultados'}
              color="#239455"
              onPress={siguiente}
            />
          </View>
        )}
      </View>
    );
  }
  let mensajeFinal = '';
  if (correctas >= 4) {
    mensajeFinal = '¡Excelente! Tienes grandes conocimientos 🏆';
  } else if (correctas >= 3) {
    mensajeFinal = '¡Muy bien! Casi lo logras 👏';
  } else {
    mensajeFinal = '¡Sigue practicando! 💪';
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.logo}>🏆</Text>
      <Text style={styles.titulo}>¡Juego terminado!</Text>

      <View style={styles.tarjeta}>
        <Text style={styles.etiqueta}>Tu puntaje</Text>
        <Text style={styles.puntaje}>{correctas} / {preguntas.length}</Text>
      </View>

      <View style={styles.fila}>
        <View style={styles.mini}>
          <Text style={styles.etiqueta}>Correctas</Text>
          <Text style={styles.miniValor}>{correctas}</Text>
        </View>
        <View style={styles.mini}>
          <Text style={styles.etiqueta}>Incorrectas</Text>
          <Text style={styles.miniValor}>{incorrectas}</Text>
        </View>
      </View>

      <Text style={styles.final}>{mensajeFinal}</Text>
      <Button title="Volver a jugar" onPress={volverAJugar} />
    </View>
  );
}   // ← llave que cierra la función App()

const styles = StyleSheet.create({
  contenedor: { flex: 1, justifyContent: 'center', padding: 25, backgroundColor: '#eef4ff' },
  logo: { fontSize: 64, textAlign: 'center' },
  titulo: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#173b83', marginBottom: 10 },
  subtitulo: { fontSize: 16, textAlign: 'center', color: '#596579', marginBottom: 25 },
  espacio: { marginBottom: 12 },
  tema: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#2457c5' },
  contador: { fontSize: 14, textAlign: 'center', color: '#596579', marginVertical: 8 },
  tarjeta: { backgroundColor: '#ffffff', padding: 18, borderRadius: 12, marginBottom: 16 },
  pregunta: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#202b3c' },
  bien: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#239455', marginVertical: 10 },
  mal: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#c33c3c', marginVertical: 10 },
  etiqueta: { fontSize: 14, textAlign: 'center', color: '#596579' },
  puntaje: { fontSize: 42, fontWeight: 'bold', textAlign: 'center', color: '#2457c5' },
  fila: { flexDirection: 'row', justifyContent: 'space-between' },
  mini: { width: '48%', backgroundColor: '#ffffff', padding: 14, borderRadius: 12 },
  miniValor: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#202b3c' },
  final: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginVertical: 18 },
});
