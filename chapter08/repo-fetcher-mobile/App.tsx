import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
} from 'react-native';

interface Repository {
  id: number;
  name: string;
}

const App = () => {
  const [githubUser, setGitHubUser] = useState<string>('');
  const [repos, setRepos] = useState<Repository[]>([]);

  const fetchRepos = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${githubUser}/repos`
      );
      const data: Repository[] = await response.json();
      setRepos(data);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setRepos([]);
    }
  };

  const handleSubmit = () => {
    fetchRepos();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>GitHub Repository Fetcher</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setGitHubUser}
          value={githubUser}
          placeholder="GitHub Username"
        />
        <Button onPress={handleSubmit} title="Get Repositories" />
      </View>

      <FlatList
        data={repos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
  },
});

export default App;
