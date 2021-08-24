import React, {useState} from 'react';
import {NativeModules, Text, View, Image, TextInput, Button, FlatList, Pressable, Platform, ToastAndroid} from 'react-native';


// const {CalendarModule, BluetoothModule} = NativeModules;
// console.log("Calendar = ", CalendarModule);
// console.log("Bluetooth = ", BluetoothModule);

const HomeScreen = ({navigation}) => {

  const [userData, setUserData] = useState({});
  const [textData, setTextData] = useState("");
  const [data, setData] = useState([]);

  
  const callNative = () => {
    CalendarModule.createCalendarEvent('Mrityunjay Kumar says, ', 'React Native is Awesome!');
    
    BluetoothModule.printReciept("Phi Printer-3199", `Here is Print Data`,  (r) => {
      ToastAndroid.show("Trying to print\n\n " + r, ToastAndroid.SHORT);
    });
  }
  


  const add = () => {
    setTextData("");
    setData(prev => {
      const id = Math.ceil(Math.random()*1000).toString();
      return [...prev, {id, text: textData}] 
    });
  };

  const delete_text = (id) => {
    console.log(id);
    alert("text will be deleted with id = " + id);
  }

  return (
    <>
      <View style={{width: "100%", padding: 8}}>
      
        {Platform.OS == "android" ?  <Button title="Call Native Module - awesome" disabled onPress={callNative} /> : null }
        

        <Button title="Print Recipt" onPress={() => navigation.navigate("PrintScreen")} />
    

        <Image
          source={{uri: "https://mrityunjay-1.github.io/portfolio/static/media/my_profile_img.fdf6ddba.png"}}
          style={{width: '100%', height: 200, marginVertical: 15}}
          resizeMode="contain"
        />
      
        <TextInput
          value={textData}
          onChangeText={(v) => setTextData(v) }
          style={{borderColor: 'blue', borderWidth: 1, marginVertical: 15, paddingVertical: 3, borderRadius: 2}}
        />
        
        {/* <Text> Hello {userData.name}, You are {userData.gender}. </Text> */}
        <Button title="add" onPress={add} />

      </View>


      <FlatList  
        style={{margin: 8}}
        data={data}
        keyExtractor={item => item.id }
        renderItem={({item, index}) => {
          return (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5/*, marginRight: 30*/}}>
              <Text> {index+1} . {item.text} </Text>
              <Pressable onPress={() => delete_text(item.id)} >
                <Text style={{backgroundColor: 'cyan', padding: 8, borderRadius: 2, paddingHorizontal: 15}}> Delete </Text>
              </Pressable>
            </View>
          );
        }}
      />
    
    </>
  );
};

export default HomeScreen;