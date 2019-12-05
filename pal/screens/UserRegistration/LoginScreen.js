import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  LayoutAnimation,
  UIManager,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import { login } from '../../service/api_service';
import { Input, Button, Icon, Header} from 'react-native-elements';
import {  Tab, Text, Tabs, TabHeading } from 'native-base';
import { Container } from 'native-base';
import SignUpScreeen from './SignUpScreen';

import firebaseSDK from '../../service/firebaseSDK.js';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const SERVER_URL = 'http://10.182.140.14:5005/';


// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);



export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      isLoading: false,
      isEmailValid: true,
      isPasswordValid: true,
      isConfirmationValid: true,
    };

    this.logInAccount = this.logInAccount.bind(this);
    this.storeData = this.storeData.bind(this);
    //this.signUp = this.signUp.bind(this);
    //this.onPressLogin = this.onPressLogin.bind(this);
  }
  storeData = async() => {
    try {
      console.log(this.state.email);
      let result = await AsyncStorage.setItem("email",this.state.email);
      console.log(result);
    } catch (e) {
      alert(e);
    }
  }
  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }
  
  logInAccount = () => {
    const { email, password }  = this.state ;
    login(email, password)
    .then(response => {
      if(response.status === 400) {
        alert("Password And ID didn't matach");
      } else {
        alert("Logged In!");
        response.json().then(data=>{
          this.storeData();
          this.props.navigation.navigate("Home");
        });
      }}).catch(err=>console.log(err));
  }

  login() {
    const { email, password } = this.state;
    this.setState({ isLoading: true });
    // Simulate an API call
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      this.setState({
        isLoading: false,
        isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
        isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
      });
    }, 1500);
  }
  
  success = () => {
		alert('login success!');
  };
  
  fail = () => {
    this.emailInput.shake();
    this.passwordInput.shake();
	};

  render() {
    const {
      isLoading,
      isEmailValid,
      isPasswordValid,
      isConfirmationValid,
      email,
      password,
      passwordConfirmation,
    } = this.state;

    return (
      <Container>
        <Header 
          leftComponent={{ icon: 'home', color: '#fff' }}
          centerComponent={{ text: 'Pal', style: { color: '#fff' } }}
          title={"Login Page"} hasTabs/>
        <Tabs>
          <Tab heading={<TabHeading><Text>Login</Text></TabHeading>}>
            <ScrollView style={styles.container}>
                <View style={styles.formContainer}>
                  <Input
                    leftIcon={
                      <Icon
                        name="envelope-o"
                        type="font-awesome"
                        color="rgba(0, 0, 0, 0.38)"
                        size={25}
                        style={{ backgroundColor: 'transparent' }}
                      />
                    }
                    value={email}
                    keyboardAppearance="light"
                    autoFocus={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    returnKeyType="next"
                    inputStyle={{ marginLeft: 10 }}
                    placeholder={'Email'}
                    containerStyle={{
                      borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                    }}
                    ref={input => (this.emailInput = input)}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    onChangeText={email => this.setState({ email })}
                    errorMessage={
                      isEmailValid ? null : 'Please enter a valid email address'
                    }
                  />
                  <Input
                    leftIcon={
                      <Icon
                        name="lock"
                        type="simple-line-icon"
                        color="rgba(0, 0, 0, 0.38)"
                        size={25}
                        style={{ backgroundColor: 'transparent' }}
                      />
                    }
                    value={password}
                    keyboardAppearance="light"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    blurOnSubmit={true}
                    containerStyle={{
                      marginTop: 16,
                      borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                    }}
                    inputStyle={{ marginLeft: 10 }}
                    placeholder={'Password'}
                    ref={input => (this.passwordInput = input)}
                    onSubmitEditing={() => this.login()}
                    onChangeText={password => this.setState({ password })}
                    errorMessage={
                      isPasswordValid
                        ? null
                        : 'Please enter at least 8 characters'
                    }
                  />
                  <Button
                    buttonStyle={styles.loginButton}
                    containerStyle={{ marginTop: 32, flex: 0 }}
                    activeOpacity={0.8}
                    title={'LOGIN'}
                    onPress={()=>{this.logInAccount(); console.log("what the hecl");} }
                    titleStyle={styles.loginTextButton}
                    loading={isLoading}
                    disabled={isLoading}
                  />
                </View>
              </ScrollView>
          </Tab>
          <Tab heading={<TabHeading><Text>Signup</Text></TabHeading>}>
            <SignUpScreeen
              navigation = {this.props.navigation}
            />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf:'center',
    flex: 1,
  },
  rowSelector: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectorContainer: {
    flex: 1,
    alignItems: 'center',
  },
  selected: {
    position: 'absolute',
    borderRadius: 50,
    height: 0,
    width: 0,
    top: -5,
    borderRightWidth: 70,
    borderBottomWidth: 70,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginTextButton: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: 'rgba(20, 124, 235, 1)',
    borderRadius: 10,
    height: 50,
    width: 200,
  },
  titleContainer: {
    height: 150,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    fontFamily: 'light',
    backgroundColor: 'transparent',
    opacity: 0.54,
  },
  selectedCategoryText: {
    opacity: 1,
  },
  titleText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'regular',
  },
  helpContainer: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


LoginScreen.navigationOptions = {
  header: null,
};
