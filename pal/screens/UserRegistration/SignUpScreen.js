import React, { Component } from 'react';
import * as ImagePicker from 'expo-image-picker';

import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {
  StyleSheet,
  Dimensions,
  LayoutAnimation,
  Image,
  UIManager,
  ScrollView,
  Text,
  View,
  Alert,
} from 'react-native';
import firebaseSDK from '../../service/firebaseSDK.js';
import { Container } from 'native-base';
import { Avatar, Icon, Input, Button } from 'react-native-elements';
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
      photo: "",
      isLoading: false,
      isEmailValid: true,
      isPasswordValid: true,
      isConfirmationValid: true,
      image: null,
      uploading: true,
    };
    this.getPermissionAsync = this.getPermissionAsync.bind(this);
    // this.onPressCreate = this.onPressCreate.bind(this);
  }


  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
  signUpAccount = () => {
    const { name, email, password }  = this.state ;
    fetch(SERVER_URL + 'signUp', {
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
      method: 'POST'
    }).then(res=>{
      if(res.status === 200) {
        console.log(res.json());
        console.log(res.status);
        alert("Sign Up Success!");
      } else {
        alert("Address Has Been Used");
      }
    })
  }

  componentDidMount() {
    this.getPermissionAsync();
  }
  
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }
// {
//   _takePhoto = async () => {
//     let pickerResult = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//     });

//     this._handleImagePicked(pickerResult);
//   };

//   _pickImage = async () => {
//     let pickerResult = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//     });
//     if (!pickerResult.cancelled) {
//       this.setState({ photo: pickerResult.uri });
//     }
//     this._handleImagePicked(pickerResult);
//   };

//   _handleImagePicked = async pickerResult => {
//     try {
//       this.setState({ uploading: true });

//       if (!pickerResult.cancelled) {
//         uploadUrl = await firebaseSDK.uploadImageAsync(pickerResult.uri);
//         this.setState({ photo: uploadUrl });
//       }
//     } catch (e) {
//       alert('Upload failed, sorry :(');
//       console.log(e);s
//     } finally {
//       this.setState({ uploading: false });
//     }
//   };
// }
  
  render() {
    const {
      isLoading,
      isEmailValid,
      isPasswordValid,
      email,
      name,
      password,
      photo
    } = this.state;

    return (
      <Container>
            <ScrollView style={styles.container}>
              <View style={styles.formContainer}>
                <Avatar
                  rounded
                  size="xlarge"
                  source={{
                    uri:
                      photo===""? null : photo
                  }}
                  showEditButton
                  onEditPress={()=>{this._pickImage()}}
                />
                <Input
                    leftIcon={
                      <Icon
                        name="people"
                        type="MaterialIcons"
                        color="rgba(0, 0, 0, 0.38)"
                        size={25}
                        style={{ backgroundColor: 'transparent' }}
                      />
                    }
                    value={name}
                    keyboardAppearance="light"
                    autoFocus={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="name-phone-pad"
                    returnKeyType="next"
                    inputStyle={{ marginLeft: 10 ,}}
                    placeholder={'Name'}
                    containerStyle={{
                      marginTop: 16,
                      borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                    }}
                    onChangeText={name => this.setState({ name })}
                  />
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
                      marginTop: 16,
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

                    keyboardType="visible-password"
                    value={password}
                    keyboardAppearance="light"
                    autoCapitalize="none"
                    autoCorrect={false}
                    blurOnSubmit={true}
                    containerStyle={{
                      marginTop: 16,
                      borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                    }}
                    inputStyle={{ marginLeft: 10 }}
                    placeholder={'Password'}
                    ref={input => (this.passwordInput = input)}
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
                    title={ 'SIGN UP'}
                    onPress={this.signUpAccount }
                    titleStyle={styles.loginTextButton}
                    loading={isLoading}
                    disabled={isLoading}
                  />
                </View>
              </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  avatar:{
    alignItems:'center',
    marginTop: 16,
  },
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
