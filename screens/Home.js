/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Voice from '@react-native-voice/voice';
import Icon from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('window').width;

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Home = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newWord, setNewWord] = useState('');
  const [checkedWord, setCheckedWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [definitionTwo, setDefinitionTwo] = useState('');
  const [definitionThree, setDefinitionThree] = useState('');
  const [example, setExample] = useState('');
  const [exampleTwo, setExampleTwo] = useState('');
  const [exampleThree, setExampleThree] = useState('');
  const [speech, setSpeech] = useState('');
  const [phonetics, setPhonetics] = useState('');

  const searchWord = enteredWord => {
    setNewWord(enteredWord);
  };

  const getInfo = () => {
    var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + newWord;

    return fetch(url)
      .then(data => {
        return data.json();
      })
      .then(response => {
        var word = response[0].word;
        setCheckedWord(word);

        setLoading(false);
        var phonics = response[0].phonetic;
        setPhonetics(phonics);

        var def1 = response[0].meanings[0].definitions[0].definition;
        setDefinition(def1);

        var def2 = response[0].meanings[0].definitions[1].definition;
        setDefinitionTwo(def2);

        var def3 = response[0].meanings[0].definitions[2].definition;
        setDefinitionThree(def3);

        var eg1 = response[0].meanings[0].definitions[0].example;
        setExample(eg1);

        var eg2 = response[0].meanings[0].definitions[1].example;
        setExampleTwo(eg2);

        var eg2 = response[0].meanings[0].definitions[2].example;
        setExampleThree(eg2);

        var partSpeech = response[0].meanings[0].partOfSpeech;
        setSpeech(partSpeech);
      });
  };

  const speak = e => {
    Voice.start(checkedWord);
  };

  const clear = () => {
    setCheckedWord(''), setDefinition(''), setExample(''), setNewWord('');
  };
  // const handleSearch = async () => {
  //   try {
  //     const response = await axios.put(
  //       'https://api.dictionaryapi.dev/api/v2/entries/en/',
  //       {
  //         search: searchTerm,
  //       },
  //     );
  //     setSearchResults(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // async function getData() {
  //   return fetch(
  //     'https://api.dictionaryapi.dev/api/v2/entries/en/hello      ',
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //       },
  //     },
  //   )
  //     .then(response => response.json())
  //     .then(json => setData(json))
  //     .catch(error => console.error(error))
  //     .finally(() => setLoading(false));
  // }

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 20,
        height: '100%',
        flexGrow: 1,
      }}>
      {/* header section */}
      <View style={styles.header}>
        <Text style={{color: '#fff', fontSize: 24, fontWeight: '900'}}>
          Clintonary
        </Text>
      </View>
      {/* Search functionaity */}
      <View style={styles.search}>
        <TextInput
          placeholder="What are you looking for ?"
          clearButtonMode="always"
          placeholderTextColor="#000"
          onChangeText={searchWord}
          value={newWord}
          style={{color: '#000'}}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 20,
            width: '30%',
          }}>
          <TouchableOpacity
            onPress={getInfo}
            style={{backgroundColor: '#ee5067', padding: 5, borderRadius: 5}}>
            <Icon name="search" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={clear}
            style={{backgroundColor: 'red', padding: 5, borderRadius: 5}}>
            <Icon name="trash-sharp" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={speak}
            style={{backgroundColor: 'blue', padding: 5, borderRadius: 5}}>
            <Icon name="volume-high-sharp" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator color="#ee5067" size="large" visible={loading} />
      ) : (
        <ScrollView>
          <View
            style={{
              backgroundColor: '#fff',
              margin: 20,
              padding: 20,
              borderRadius: 10,
            }}>
            <Text style={{fontSize: 20, fontWeight: '600', color: '#000'}}>
              Phonetics:
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                color: '#000',
                opacity: 0.8,
              }}>
              {phonetics}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              marginTop: 0,
              marginLeft: 20,
              marginRight: 20,
              padding: 20,
              borderRadius: 10,
            }}>
            <Text style={{fontSize: 20, fontWeight: '600', color: '#000'}}>
              Part of Speech:
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                color: '#000',
                opacity: 0.8,
              }}>
              {speech}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20,
              padding: 20,
              borderRadius: 10,
            }}>
            <Text style={{fontSize: 20, fontWeight: '600', color: '#000'}}>
              Meaning:
            </Text>

            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                color: '#000',
                opacity: 0.8,
              }}>
              1: {definition}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                color: '#000',
                opacity: 0.8,
              }}>
              2: {definitionTwo}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                color: '#000',
                opacity: 0.8,
              }}>
              3: {definitionThree}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20,
              padding: 20,
              borderRadius: 10,
            }}>
            <Text style={{fontSize: 20, fontWeight: '600', color: '#000'}}>
              Examples:
            </Text>

            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                color: '#000',
                opacity: 0.8,
              }}>
              1: {example}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                color: '#000',
                opacity: 0.8,
              }}>
              2: {exampleTwo}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                color: '#000',
                opacity: 0.8,
              }}>
              3: {exampleThree}
            </Text>
          </View>
        </ScrollView>
      )}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ee5067',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  search: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    width: '100%',
  },
});
