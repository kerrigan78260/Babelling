import { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import * as Speech from 'expo-speech';
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from 'expo-speech-recognition';

import { hsk1 } from './data/hsk1';

export default function App() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [recognizing, setRecognizing] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  const phrase = hsk1[phraseIndex];

  useSpeechRecognitionEvent('start', () => {
    setRecognizing(true);
  });

  useSpeechRecognitionEvent('end', () => {
    setRecognizing(false);
  });

  useSpeechRecognitionEvent('result', (event) => {
    const recognizedText = event.results[0]?.transcript ?? '';
    setTranscript(recognizedText);
  });

  useSpeechRecognitionEvent('error', (event) => {
    console.log('STT error:', event.error, event.message);
    setRecognizing(false);
  });

  const speak = () => {
    Speech.stop();

    Speech.speak(phrase.hanzi, {
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

  const normalize = (value: string) => {
    return value
      .trim()
      .replace(/[。，！？；：,.!?;:]/g, '');
  };

  const normalizedTarget = normalize(phrase.hanzi);
  const normalizedTranscript = normalize(transcript);

  const hasResult = transcript.trim().length > 0;
  const isCorrect =
    hasResult && normalizedTarget === normalizedTranscript;

  const nextPhrase = () => {
    setTranscript('');
    setPhraseIndex((current) => (current + 1) % hsk1.length);
  };

  const previousPhrase = () => {
    setTranscript('');
    setPhraseIndex(
      (current) => (current - 1 + hsk1.length) % hsk1.length
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Babelling</Text>

      <Text style={styles.counter}>
        Phrase {phraseIndex + 1} / {hsk1.length}
      </Text>

      <Text style={styles.sectionTitle}>Phrase cible</Text>

      <Text style={styles.hanzi}>{phrase.hanzi}</Text>

      {showDetails && (
        <>
          <Text style={styles.pinyin}>{phrase.pinyin}</Text>
          <Text style={styles.translation}>
            {phrase.translation}
          </Text>
        </>
      )}

      <View style={styles.buttonSpacing} />

      <Button title="🔊 Écouter" onPress={speak} />

      <View style={styles.buttonSpacing} />

      {!recognizing ? (
        <Button title="🎤 Parler" onPress={startRecognition} />
      ) : (
        <Button title="⏹ Arrêter" onPress={stopRecognition} />
      )}

      <Text style={styles.label}>Reconnu :</Text>

      <Text style={styles.transcript}>
        {transcript || '...'}
      </Text>

      {hasResult && (
        <Text
          style={[
            styles.result,
            isCorrect ? styles.success : styles.warning,
          ]}
        >
          {isCorrect
            ? '✅ Correspondance correcte'
            : '⚠️ Phrase différente'}
        </Text>
      )}

      <View style={styles.navigation}>
        <Button title="← Précédente" onPress={previousPhrase} />

        <Button title="Suivante →" onPress={nextPhrase} />
      </View>

      <View style={styles.buttonSpacing} />

      <Button
        title={showDetails ? '🙈 Masquer aide' : '👀 Afficher aide'}
        onPress={() => setShowDetails((current) => !current)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  counter: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  hanzi: {
    fontSize: 34,
    textAlign: 'center',
    marginBottom: 12,
  },
  pinyin: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 8,
  },
  translation: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
  },
  buttonSpacing: {
    height: 15,
  },
  label: {
    fontSize: 18,
    marginTop: 25,
    marginBottom: 8,
  },
  transcript: {
    fontSize: 24,
    minHeight: 45,
  },
  result: {
    fontSize: 18,
    marginTop: 15,
    fontWeight: 'bold',
  },
  success: {
    color: 'green',
  },
  warning: {
    color: 'orange',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
});