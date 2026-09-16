import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, PermissionsAndroid, Platform, } from 'react-native';
import * as Speech from 'expo-speech';
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from 'expo-speech-recognition';

export default function App() {
  const [text, setText] = useState('你好，你好吗？');
  const [transcript, setTranscript] = useState('');
  const [recognizing, setRecognizing] = useState(false);

  useSpeechRecognitionEvent('start', () => {
    setRecognizing(true);
  });

  useSpeechRecognitionEvent('end', () => {
    setRecognizing(false);
  });

  useSpeechRecognitionEvent('result', (event) => {
    setTranscript(event.results[0]?.transcript ?? '');
  });

  useSpeechRecognitionEvent('error', (event) => {
    console.log('STT error:', event.error, event.message);
    setRecognizing(false);
  });

  const speak = () => {
    Speech.stop();

    Speech.speak(text, {
      language: 'zh-CN',
      rate: 0.8,
    });
  };
async function startRecognition() {
  if (Platform.OS === 'android') {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
    );

    console.log('ANDROID PERMISSION:', result);
  }

  const permission =
    await ExpoSpeechRecognitionModule.requestPermissionsAsync();

  console.log('STT PERMISSION:', permission);

  if (permission.granted) {
    setTranscript('');

    ExpoSpeechRecognitionModule.start({
      lang: 'zh-CN',
      interimResults: true,
      continuous: false,
    });
  }
}

  const stopRecognition = () => {
    ExpoSpeechRecognitionModule.stop();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mandarin Voice</Text>

      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="输入中文"
      />

      <Button title="🔊 Écouter" onPress={speak} />

      <View style={styles.space} />

      {!recognizing ? (
        <Button title="🎤 Parler" onPress={startRecognition} />
      ) : (
        <Button title="⏹ Arrêter" onPress={stopRecognition} />
      )}

      <Text style={styles.label}>Reconnu :</Text>

      <Text style={styles.transcript}>
        {transcript || '...'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 15,
    fontSize: 22,
    marginBottom: 20,
  },
  space: {
    height: 20,
  },
  label: {
    fontSize: 18,
    marginTop: 30,
    marginBottom: 10,
  },
  transcript: {
    fontSize: 24,
    minHeight: 50,
  },
});