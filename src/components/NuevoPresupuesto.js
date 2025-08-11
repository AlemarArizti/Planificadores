import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet, SafeAreaView, Pressable, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import globalStyles from "../styles";

const NuevoPresupuesto = ({handleNuevoPresupuesto, presupuesto, setPresupuesto}) =>{


    return(
        <View style={styles.contenedor}>
            <Text style={styles.label}>Definir presupuesto</Text>
            <TextInput
            keyboardType="numeric"
            placeholder="Agrega tu presupuesto: Ej.300 "
            style={styles.input}
            value={presupuesto.toString()}
            onChangeText={(text) => setPresupuesto(Number(text))}
            />
            <Pressable 
            style={styles.boton}
            onPress={() => handleNuevoPresupuesto(presupuesto)}>
                <Text
                style={styles.botonText}
                >Agregar Presupuesto</Text>
            </Pressable>
        </View>
        
    )
}
const styles = StyleSheet.create({
    contenedor:{
      ...globalStyles.contenedor
    },
    label:{
     textAlign:'center',
     fontSize:24,
     color:"#3b82f6",
     marginBottom:10,
    },
    input:{
    backgroundColor:'#f5f5f5',
    padding:10,
    borderRadius:10,
    textAlign:'center',
    marginTop:30,
    },
    boton:{
    marginTop:30,
    backgroundColor:'#10484a',
    padding:10,
    borderRadius:10,
    },
    botonText:{
    color:'#fff',
    textAlign:'center',
    textTransform:'uppercase',
    fontWeight:'bold',
    }
})

export default NuevoPresupuesto