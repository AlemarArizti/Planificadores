import React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";

const Header = () =>{
    return(
        <SafeAreaView >
            <Text style={styles.texto}>Planificador de gastos</Text>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    texto:{
     textAlign:'center',
     fontSize:30,
     color:'#fff',
     textTransform:'uppercase',
     fontWeight:'bold',
     paddingVertical:20,
    }
})

export default Header