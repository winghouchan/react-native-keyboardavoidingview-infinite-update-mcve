import {useHeaderHeight} from '@react-navigation/elements';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import ReactNative, {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  Text,
  TextInputProps,
  View,
  ViewProps,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';

const theme = {
  spacing: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48] as const,
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContentContainer: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing[5],
    paddingBottom: theme.spacing[5],
  },
  footer: {
    paddingHorizontal: theme.spacing[5],
  },
});

function Layout({children, style, testID, ...props}: SafeAreaViewProps) {
  const headerHeight = useHeaderHeight();

  return (
    <SafeAreaView style={[styles.safeAreaView, style]} {...props}>
      <KeyboardAvoidingView
        testID={testID}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={headerHeight + theme.spacing[9]}
        style={styles.keyboardAvoidingView}>
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Main({children, style, ...props}: ScrollViewProps) {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContentContainer}
      keyboardShouldPersistTaps="handled"
      style={[styles.scrollView, style]}
      {...props}>
      {children}
    </ScrollView>
  );
}

function Footer({children, style, ...props}: ViewProps) {
  return (
    <View style={[styles.footer, style]} {...props}>
      {children}
    </View>
  );
}

function TextInput(props: TextInputProps) {
  return (
    <ReactNative.TextInput
      style={{
        borderColor: '#aaa',
        borderRadius: 12,
        borderWidth: 1,
        margin: 16,
        padding: 12,
        width: '100%',
      }}
      {...props}
    />
  );
}

function Screen1() {
  const navigation = useNavigation();
  const [value, setValue] = useState('');

  return (
    <Layout testID="screen1">
      <Main>
        <TextInput value={value} onChangeText={setValue} placeholder="Input" />
      </Main>
      <Footer>
        <Pressable onPress={() => navigation.navigate('2')}>
          <Text>Go to screen 2</Text>
        </Pressable>
      </Footer>
    </Layout>
  );
}

function Screen2() {
  const [value, setValue] = useState('');

  console.debug('Screen2');

  return (
    <Layout testID="screen2">
      <Main>
        <TextInput value={value} onChangeText={setValue} placeholder="Input" />
      </Main>
      <Footer>
        <Text>Footer</Text>
      </Footer>
    </Layout>
  );
}

const {Navigator, Screen} = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Navigator>
          <Screen name="1" component={Screen1} />
          <Screen name="2" component={Screen2} />
        </Navigator>
      </NavigationContainer>
      {/* <Screen1 /> */}
    </SafeAreaProvider>
  );
}
