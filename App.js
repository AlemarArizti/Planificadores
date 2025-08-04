
import React, {useState} from "react";
import { StyleSheet,  View , Text, Alert, Pressable, Image, Modal, ScrollView} from 'react-native';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from "./src/components/ControlPresupuesto";
import FormularioGasto from "./src/components/FormularioGasto";
import ListadoGastos from "./src/components/ListadoGastos";
import { generarId } from "./src/Helpers";

function App() {

  const[isValidPresupuesto, setIsValidPresupuesto]= useState(false);
  const [presupuesto, setPresupuesto]=useState(0);
  const[gastos, setGastos]= useState([])
  const [modal, setModal] =useState(false);
  const [gasto, setGasto] =useState({})

const handleNuevoPresupuesto = (presupuesto) =>{
      if(Number(presupuesto) >0){
        setIsValidPresupuesto(true)
      }else{
        Alert.alert('Error', 'El presupuesto no puede ser 0 o menor', [{text:'OK'}])
      }
    }

    const handleGasto = (gasto) =>{
      if([gasto.nombre, gasto.categoria, gasto.cantidad].includes('')){
        Alert.alert('Error', 'Todos los campos son obligatorios')
        return
      }
      if(gasto.id){
       const gastosActualizados = gastos.map(gastoState => gastoState.id 
        === gasto.id ? gasto : gastoState)

        setGastos(gastosActualizados)
      }else{
        gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
      }
      setModal(!modal)
    }
  
    const eliminarGasto = id =>{
      Alert.alert(
        '¿Deseas eliminar este gasto?','No se puede recuperar',
        [
          {text:'No', style:'cancel'},
          {text:'Eliminar',
            onPress: () =>{
              const gastosActualizados = gastos.filter(gastoState => 
                gastoState.id !== id)
                setGastos(gastosActualizados)
                setModal(!modal)
                setGasto({})
            }
          }
        ]
      )
    }

  return ( 

    <View style={styles.container}>
      <ScrollView> 
    <View style={styles.header}>
      <Header/>
      {isValidPresupuesto ? (
        <ControlPresupuesto
        presupuesto={presupuesto}
        gastos={gastos}
        />) :( 

        <NuevoPresupuesto
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
      handleNuevoPresupuesto={handleNuevoPresupuesto}
      />)}
      </View>

     { isValidPresupuesto &&(
      <ListadoGastos
      gastos={gastos}
      setModal={setModal}
      setGasto={setGasto}
      />
     )}
</ScrollView>
{modal && (
<Modal
      animationType="slide"
      visible={modal}
      > 
      <FormularioGasto
        setModal={setModal}
        handleGasto ={handleGasto}
        gasto={gasto}
        setGasto={setGasto}  
        eliminarGasto={eliminarGasto}
        />
     
      </Modal>

)}
      
     {isValidPresupuesto && (
      <Pressable
      onPress={()=>setModal(!modal)}
      style={styles.presable}
      >
        <Image style={styles.imagen} source={require('/Users/alemararizti/Desktop/Planificadores/src/img/nuevo-gasto.png')}/>
      </Pressable>
     )}
    
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
  backgroundColor:'#f5f5f5',
  flex:1,
  },
  header:{
     backgroundColor:'#3b82f6'
    },
    presable:{
      height:60,
      width:60, 
      position:'absolute',
      bottom:30,
      right:40,
    },
    imagen:{
      height:60,
      width:60,
    }
});

export default App;
