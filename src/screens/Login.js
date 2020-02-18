import React, {Component} from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  Button,
  TextInput,
  StyleSheet,
} from 'react-native';
import Wrapper from '../components/Wrapper';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {login, checkUser} from '../redux/actions/authActions';
import {HOME} from '../constants/routeNames';

export class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    if (checkUser()) {
      this.props.navigation.navigate(HOME);
    }
  }

  handleLogin = () => {
    const {username, password} = this.state;
    if (!username.trim() && !password.trim()) {
      Alert.alert('Please enter fields');
      return;
    }
    login(username, password);
  };

  render() {
    const {username, password} = this.state;
    return (
      <Wrapper>
        <View style={styles.container}>
          <Text style={styles.heading}>Login</Text>
          <Image
            source={require('../assets/login.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <TextInput
            value={username}
            style={styles.input}
            placeholder={'Enter username'}
            onChangeText={text => {
              this.setState({username: text});
            }}
          />
          <TextInput
            secureTextEntry
            value={password}
            style={styles.input}
            placeholder={'Enter password'}
            onChangeText={text => {
              this.setState({password: text});
            }}
          />
          <Button title="Login to continue" onPress={this.handleLogin} />
        </View>
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {alignItems: 'center'},
  input: {width: '100%', borderWidth: 1, marginBottom: 5, borderRadius: 5},
  heading: {
    fontSize: wp(10),
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  image: {
    width: wp(50),
    height: wp(50),
    marginVertical: wp(10),
  },
});

export default LoginScreen;
