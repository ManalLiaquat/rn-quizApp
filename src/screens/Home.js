/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  Picker,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Wrapper from '../components/Wrapper';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Axios from 'axios';
import {QUIZ} from '../constants/routeNames';
import {logout} from '../redux/actions/authActions';

const CATEGORY = [
  {
    value: 'any',
    name: 'Any Category',
  },
  {
    value: 9,
    name: 'General Knowledge',
  },
  {
    value: 10,
    name: 'Entertainment: Books',
  },
  {
    value: 11,
    name: 'Entertainment: Film',
  },
  {
    value: 12,
    name: 'Entertainment: Music',
  },
  {
    value: 13,
    name: 'Entertainment: Musicals',
  },
  {
    value: 14,
    name: 'Entertainment: Television',
  },
  {
    value: 15,
    name: 'Entertainment: Video Games',
  },
  {
    value: 16,
    name: 'Entertainment: Board Games',
  },
  {
    value: 17,
    name: 'Science and Nature',
  },
  {
    value: 18,
    name: 'Science: Computers',
  },
  {
    value: 19,
    name: 'Science: Mathematics',
  },
  {
    value: 20,
    name: 'Mythology',
  },
  {
    value: 21,
    name: 'Sports',
  },
  {
    value: 22,
    name: 'Geography',
  },
  {
    value: 23,
    name: 'History',
  },
  {
    value: 24,
    name: 'Politics',
  },
  {
    value: 25,
    name: 'Art',
  },
  {
    value: 26,
    name: 'Celebrities',
  },
  {
    value: 27,
    name: 'Animals',
  },
  {
    value: 28,
    name: 'Vehicles',
  },
  {
    value: 29,
    name: 'Entertainment: Comics',
  },
  {
    value: '30',
    name: 'Science: Gadgets',
  },
  {
    value: 31,
    name: 'Entertainment: Japanese Anime & Manga',
  },
  {
    value: 32,
    name: 'Entertainment: Cartoon & Animations',
  },
];

const DIFFICULTY = [
  {
    value: 'any',
    name: 'Any Difficulty',
  },
  {
    value: 'easy',
    name: 'Easy',
  },
  {
    value: 'medium',
    name: 'Medium',
  },
  {
    value: 'hard',
    name: 'Hard',
  },
];

const TYPE = [
  {
    value: 'any',
    name: 'Any Type',
  },
  {
    value: 'multiple',
    name: 'Multiple Choice',
  },
  {
    value: 'boolean',
    name: 'True / False',
  },
];

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noOfQues: '10',
      category: 'any',
      difficulty: 'any',
      type: 'any',
      loader: false,
    };
  }

  getQuiz = async () => {
    const {noOfQues, category, difficulty, type} = this.state;
    this.setState({loader: true});
    let api = `https://opentdb.com/api.php?amount=${noOfQues}`;
    if (category !== 'any') {
      api = `https://opentdb.com/api.php?amount=${noOfQues}&category=${category}`;
    }
    if (difficulty !== 'any') {
      api = `https://opentdb.com/api.php?amount=${noOfQues}&difficulty=${difficulty}`;
    }
    if (type !== 'any') {
      api = `https://opentdb.com/api.php?amount=${noOfQues}&type=${type}`;
    }

    if (category !== 'any' && difficulty !== 'any') {
      api = `https://opentdb.com/api.php?amount=${noOfQues}&category=${category}&difficulty=${difficulty}`;
    }
    if (category !== 'any' && type !== 'any') {
      api = `https://opentdb.com/api.php?amount=${noOfQues}&type=${type}&category=${category}`;
    }
    if (difficulty !== 'any' && type !== 'any') {
      api = `https://opentdb.com/api.php?amount=${noOfQues}&type=${type}&difficulty=${difficulty}`;
    }
    if (category !== 'any' && difficulty !== 'any' && type !== 'any') {
      api = `https://opentdb.com/api.php?amount=${noOfQues}&type=${type}&difficulty=${difficulty}&category=${category}`;
    }

    const res = await Axios.get(api);
    this.setState({loader: false});
    if (!res.data.results.length) {
      Alert.alert('No quiz found! Try selecting other options');
      return;
    }
    const quizData = res.data.results;
    let quizTime = noOfQues;
    quizTime =
      difficulty === 'easy'
        ? quizTime * 1
        : difficulty === 'medium'
        ? quizTime * 1.2
        : difficulty === 'hard'
        ? quizTime * 1.4
        : quizTime;
    quizTime = type === 'multiple' ? quizTime + 1 : quizTime;
    quizTime = Math.round(quizTime);

    console.log(quizTime);

    this.props.navigation.navigate(QUIZ, {quizData, quizTime});
  };

  picker_jsx = (data, key, value) => {
    return (
      <Picker
        selectedValue={value}
        style={styles.picker}
        onValueChange={itemValue => this.setState({[key]: itemValue})}>
        {data.map((item, index) => (
          <Picker.Item
            key={index.toString()}
            label={item.name}
            value={item.value}
          />
        ))}
      </Picker>
    );
  };

  render() {
    const {noOfQues, category, difficulty, type, loader} = this.state;
    return (
      <Wrapper>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Enter number of questions</Text>
          <TextInput
            value={noOfQues}
            style={styles.input}
            keyboardType="decimal-pad"
            placeholder={'Number of Questions'}
            onChangeText={text => {
              this.setState({noOfQues: text});
            }}
          />
        </View>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Select Category</Text>
          {this.picker_jsx(CATEGORY, 'category', category)}
        </View>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Select Difficulty</Text>
          {this.picker_jsx(DIFFICULTY, 'difficulty', difficulty)}
        </View>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Select Type</Text>
          {this.picker_jsx(TYPE, 'type', type)}
        </View>
        {loader ? (
          <ActivityIndicator size={wp(10)} />
        ) : (
          <>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={this.getQuiz}
              style={{
                ...styles.btn,
                // marginTop: wp(10),
                backgroundColor: '#22c1c3',
              }}>
              <Text style={styles.btnText}>Start Quiz!</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={logout}
              style={{
                ...styles.btn,
                marginTop: wp(10),
                backgroundColor: '#cbb4d4',
              }}>
              <Text style={styles.btnText}>Logout</Text>
            </TouchableOpacity>
          </>
        )}
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  picker: {
    height: wp(10),
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    fontSize: wp(4),
    fontFamily: 'courier',
  },
  pickerContainer: {marginBottom: wp(10)},
  input: {
    width: '100%',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 5,
    marginTop: wp(2),
  },
  btn: {
    marginVertical: wp(2),
    padding: wp(2),
    borderRadius: 2,
    elevation: 2,
  },
  btnText: {
    textAlign: 'center',
    fontSize: wp(4),
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
