import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { ProgressBar, MD3Colors  } from 'react-native-paper'; // Asegúrate de tener react-native-paper
import globalStyles from '../styles';
import { formatearCantidad } from '../Helpers';

const ControlPresupuesto = ({ presupuesto, gastos, resetearApp }) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => Number(gasto.cantidad) + total,
      0
    );
    setGastado(totalGastado);

    const totalDisponible = presupuesto - totalGastado;
    setDisponible(totalDisponible);

    const porcentajeReal = ((presupuesto - totalGastado) / presupuesto) * 100;
    const nuevoPorcentaje = Math.min(Math.max(porcentajeReal, 0), 100);

    let start = 0;
    const end = nuevoPorcentaje;
    const duration = 1000;
    const increment = end / (duration / 10);

   const interval = setInterval(() => {
  start += increment;
  if (start >= end) {
    start = end;
    clearInterval(interval);
  }
  console.log('Progreso interno:', start); 
  setPorcentaje(start);
}, 10);
    return () => clearInterval(interval);
  }, [gastos, presupuesto]);

  return (
    <View style={styles.contenedor}>
      <View style={styles.centrarGrafica}>
        <Text style={styles.tituloGrafica}>
          {`Disponible: ${((disponible / presupuesto) * 100).toFixed(0)}%`}
        </Text>

        <ProgressBar
          progress={porcentaje / 100}
          color="#00BFFF" 
          style={styles.barraProgreso}
        />
      </View>
      <View style={styles.contenedorTexto}>
        <Text style={styles.valor}>
          <Text style={styles.label}>Presupuesto: </Text>
          {formatearCantidad(presupuesto)}
        </Text>
        <Text style={styles.valor}>
          <Text style={styles.label}>Disponible: </Text>
          {formatearCantidad(disponible)}
        </Text>
        <Text style={styles.valor}>
          <Text style={styles.label}>Gastado: </Text>
          {formatearCantidad(gastado)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
  },
  centrarGrafica: {
    alignItems: 'center',
    marginBottom: 20,
  },
  tituloGrafica: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#472B29',
    textAlign: 'center',
  },
 barraProgreso: {
  width: '80%',
  height: 12,
  borderRadius: 6,
  backgroundColor: '#EA5167',
},
  boton:{
   backgroundColor:'#db2777',
   padding:10,
   borderRadius:5,
  },
  txtBtn:{
  textAlign:'center',
color:'#fff',
fontWeight:'bold',
textTransform:'uppercase',
  },
  contenedorTexto: {
    marginTop: 50,
  },
  valor: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: '700',
    color: '#3b82f6',
  },
});

export default ControlPresupuesto;
