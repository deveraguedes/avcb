import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useCreateUser, useUsers } from '../services/api';

export const HomeScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { data: users, isLoading: usersLoading } = useUsers();
  const createUserMutation = useCreateUser();

  const handleCreateUser = async () => {
    if (!name || !email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      await createUserMutation.mutateAsync({
        name,
        email,
        password,
      });
      
      Alert.alert('Sucesso', 'Usuário criado com sucesso!');
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao criar usuário');
      console.error('Error creating user:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teste de Integração</Text>
      
      <Text style={styles.sectionTitle}>Criar Usuário</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity
        style={[styles.button, createUserMutation.isPending && styles.buttonDisabled]}
        onPress={handleCreateUser}
        disabled={createUserMutation.isPending}
      >
        {createUserMutation.isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Criar Usuário</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Usuários Cadastrados</Text>
      
      {usersLoading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <View style={styles.usersList}>
          {users?.map((user: any) => (
            <View key={user.id} style={styles.userItem}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
          ))}
          {(!users || users.length === 0) && (
            <Text style={styles.noUsers}>Nenhum usuário cadastrado</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 15,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  usersList: {
    flex: 1,
  },
  userItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  noUsers: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    marginTop: 20,
  },
});
