import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    width: '100%'
      },

    titulo:{
    fontSize:20,
  },
  input:{
    color :"white",
    backgroundColor:"gray",
    padding:2,
    height: 20,
    width: 300,
    marginTop: 20,
    

  },
  inputcontainer:{
    height: 180,
    marginBottom:"50%"
  },
  form:{
    flex:1,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center',
    
    
  },
  botaoLog:{
    alignItems:"center",
    justifyContent:"center",   
    backgroundColor:"#5792EB",
    pisition:'absoulute',
    fontSize:30,
    borderRadius:15,
    padding:5,
    marginTop:10,
    width:"60%",
    height:"5%",
  },
    botaoCad:{
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#5792EB",
    position:'absoulute',
    fontSize:30,
    borderRadius:15,
    padding:5,

    width:"60%",
    height:"5%",

  },
  botaoOp:{
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"white",
    borderColor:"#007BFF",
    borderWidth:2,
    borderRadius:15,
    position:'absoulute',
    fontSize:30,
    borderRadius:15,
    padding:5,
    marginTop:10,
    width:"60%",
    height:"5%"
  },
  text:{
    color:"white",
    
  },
    textOp:{
    color:"#007BFF",
    marigin:10,
    
  },
  imagem:{
    height:200

  },
  logo: {
    justifyContent:"space-evenly",
    alignItems:"flex-start"
  },
  inputPicker:{
    backgroundColor:"gray" ,
    color:"white",
    marginTop: 20,
    paddingLeft:8,
    marginBottom:20,
    borderRadius:2
  },
  textPicker:{
    color:"white"
  }
})