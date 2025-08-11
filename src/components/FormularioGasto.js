import React, {useState, useEffect} from "react";
import { Text, SafeAreaView, View, TextInput, StyleSheet, Pressable} from "react-native";
import { Picker } from "@react-native-picker/picker";
import globalStyles from "../styles";



const FormularioGasto = ({setModal, handleGasto, setGasto, gasto, eliminarGasto}) =>{
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [id, setId]=useState('');
    const [fecha, setFecha]=useState('');

    useEffect(()=>{
       if(gasto?.nombre){
        setNombre(gasto.nombre)
        setCantidad(gasto.cantidad)
        setCategoria(gasto.categoria)
        setId(gasto.id)
        setFecha(gasto.fecha)
       }
    },[gasto])

    return(
        <SafeAreaView style={styles.contenedor}>
       <View style={styles.contenedorbtn}>
        <Pressable 
        onLongPress={() =>  {setModal(false),  setGasto({})}}
        style={[styles.btn, styles.btnCancelar]}>
            <Text style={styles.btnTxt}>Cancelar</Text>
        </Pressable>

        {!!id &&(
       <Pressable 
        onPress={() => eliminarGasto(id)}
        style={[styles.btn, styles.btnEliminar]}>
            <Text style={styles.btnTxt}>Eliminar</Text>
        </Pressable>

        )}
        
       </View>

       <View style={styles.formulario}>
        <Text style={styles.titulo}>{gasto?.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</Text>
     

       <View style={styles.campo}>
        <Text style={styles.label}>Nombre Gasto</Text>
        <TextInput 
        placeholder="Nombre del gasto"
        style={styles.input} 
        onChangeText={setNombre}
        value={nombre}
        />
       </View>
       <View style={styles.campo}>
        <Text style={styles.label}>Cantidad Gasto</Text>
        <TextInput 
        placeholder="Cantidad del gasto"
        keyboardType="numeric"
        style={styles.input}
        onChangeText={setCantidad}
        value={cantidad}
        />
       </View>

       <View style={styles.campo}>
        <Text style={styles.label}>Categoria gasto</Text>
        <Picker
        selectedValue={categoria}
        onValueChange={(value)=>{
            setCategoria(value)
        }}>
            <Picker.Item label="--Seleccione--" value=""/>
            <Picker.Item label="Ahorro" value="ahorro"/>
            <Picker.Item label="Comida" value="comida"/>
            <Picker.Item label="Casa" value="casa"/>
            <Picker.Item label="Gastos varios" value="gastos"/>
            <Picker.Item label="Ocio" value="ocio"/>
            <Picker.Item label="Salud" value="salud"/>
            <Picker.Item label="Suscripciones" value="suscripciones"/>
        </Picker>
       </View>

       <Pressable 
       style={styles.submitbtn}
       onPress={() => handleGasto({nombre, cantidad, categoria, id, fecha})}
       >
        <Text style={styles.submitbtnTxt}>{gasto?.nombre ? 'Editar Gasto' : 'Agregar Gasto'}</Text>
       </Pressable>
       </View>
        </SafeAreaView>
    )
}

export default FormularioGasto

const styles = StyleSheet.create({
contenedor:{
backgroundColor:'#1e40af',
flex:1,
},
contenedorbtn:{
    flexDirection:'row',
    justifyContent:'space-between'
},
btn:{
    padding:10,
    marginTop:30,
    marginHorizontal:10,
    flex:1,
},
btnEliminar:{
 backgroundColor:'red'
},
btnCancelar:{
    backgroundColor:'#db2777',
   
},
btnTxt:{
    textAlign:'center',
    textTransform:'uppercase',
    fontWeight:'bold',
    color:'#fff',
},

titulo:{
    textAlign:'center',
    fontSize:28,
    marginBottom:30,
    color:'#64748b',
},
formulario:{...globalStyles.contenedor},
campo:{
    marginVertical:10,
},
label:{
    color:'#64748b',
    textTransform:'uppercase',
    fontSize:16,
    fontWeight:'bold'
},
input:{
    backgroundColor:'#f5f5f5',
    padding:10,
    borderRadius:10,
    marginTop:10,
},
submitbtn:{
backgroundColor:'#3b82f6',
padding:10,
marginTop:20,
},
submitbtnTxt:{
textAlign:'center',
color:'#fff',
fontWeight:'bold',
textTransform:'uppercase'
}
})