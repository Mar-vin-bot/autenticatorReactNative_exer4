import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { Buffer } from 'buffer';

const App = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const autenticar = () => {
    console.log('user', user);
    console.log('pass', pass);

    let encodedAuth = Buffer.from(user + ':' + pass).toString('base64');
    fetch('http://Pixel:8080/token', {
      method: 'POST',
      headers: new Headers({
        Authorization: 'Basic ' + encodedAuth,
        'Content-Type': 'application/json',
      }),
    })
      .then(response => {
        console.log('Resposta ', response);
        return response.text();
      })
      .then(result => {
        console.log('Resultado ', result);
      })
      .catch(error => console.log('error', error));
  };

  return (
    <View>
      <Text>Nome do usuário</Text>
      <TextInput style={styles.input} onChangeText={setUser} value={user} />
      <Text>Senha</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPass}
        value={pass}
        keyboardType="numeric"
        secureTextEntry={true}
      />
      <Button title="Entrar" onPress={autenticar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  input: {
    borderWidth: 1,
    marginBottom: 12,
  },
});

export default App;
