import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Wrapper from '../components/Wrapper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class QuizScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizData: props.navigation.state.params.quizData,
      options: [], // multiple choice options
      correct: 0,
      sec: 0,
      min: props.navigation.state.params.quizTime,
      showQuiz: true,
      index: 0, //current index of question
    };
  }

  componentDidMount() {
    this.timer();
    this.setOptions();
  }

  timer = () => {
    this.myInterval = setInterval(() => {
      const {sec, min} = this.state;

      if (sec > 0) {
        this.setState(({sec}) => ({
          sec: sec - 1,
        }));
      }
      if (sec === 0) {
        if (min === 0) {
          this.endQuiz();
        } else {
          this.setState(({min}) => ({
            min: min - 1,
            sec: 59,
          }));
        }
      }
    }, 1000);
  };

  setOptions = () => {
    const {quizData, index, options} = this.state;
    const item = quizData[index];

    options.push(item.correct_answer);
    item.incorrect_answers.map(value => {
      options.push(value);
    });

    this.setState({options: this.shuffle(options)});
  };

  shuffle = array => {
    return array.sort(() => Math.random() - 0.5);
  };

  endQuiz = () => {
    clearInterval(this.myInterval);
    this.setState({showQuiz: false});
  };

  next = optionItem => {
    const {quizData, index} = this.state;
    if (optionItem === quizData[index].correct_answer) {
      this.setState(({correct}) => ({correct: correct + 1}));
    }
    if (quizData.length - 1 === index) {
      this.endQuiz();
    } else {
      this.setState(({index, options}) => ({index: index + 1, options: []}));
    }
    console.log(index);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.index !== this.state.index) {
      this.setOptions();
    }
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    const {quizData, index, options, showQuiz, correct, min, sec} = this.state;
    const item = quizData[index];

    return (
      <Wrapper>
        {showQuiz ? (
          <View>
            <Text style={styles.question}>
              Q#{index + 1}: {item.question}
            </Text>
            {options.map(optionItem => {
              return (
                <TouchableOpacity
                  key={optionItem}
                  style={styles.option}
                  activeOpacity={0.7}
                  onPress={() => this.next(optionItem)}>
                  <Text style={styles.optionText}>{optionItem}</Text>
                </TouchableOpacity>
              );
            })}
            <Text style={styles.timer}>
              Time left:{' '}
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  color: min <= 0 && sec <= 10 ? 'red' : 'green',
                  fontWeight: 'bold',
                }}>
                {min < 10
                  ? '0' + min + ':'
                  : min > 60
                  ? parseInt(min / 60) + ':' + (min % 60) + ':'
                  : min + ':'}
                {sec < 10 ? '0' + sec : sec + ''}
              </Text>
            </Text>
          </View>
        ) : (
          <View>
            <Text>Total Questions: {quizData.length}</Text>
            <Text>Correct: {correct}</Text>
            <Text>In-Correct: {quizData.length - correct}</Text>
            <Text>
              You scored: {((correct * 100) / quizData.length).toFixed(2)}%
            </Text>
          </View>
        )}
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  question: {
    fontSize: wp(5),
    fontWeight: 'bold',
    marginBottom: wp(10),
    height: wp(25),
  },
  option: {
    margin: wp(2),
    padding: wp(2),
    height: hp(10),
    borderRadius: wp(5),
    backgroundColor: '#48c6ef',
  },
  optionText: {
    fontSize: wp(5),
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  timer: {
    textAlign: 'center',
    fontSize: wp(4),
  },
});

export default QuizScreen;
